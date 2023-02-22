CURRENT_DIR=$(shell pwd)
CURRENT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
BUILD_BRANCH=$(shell docker images --filter=reference='*/*/*/onbrand-images/build:$(CURRENT_BRANCH)' --format "{{.Tag}}" | grep $(CURRENT_BRANCH) || echo latest)
RUN_BUILD_CONTAINER=docker container run \
											--name onbrand-build-image \
											--rm \
											-i -t \
											-p 3000:3000 \
											-p 3001:3001 \
											--volume $(HOME)/.npm:/root/.npm:cached \
											--volume "$(shell pwd)":/app:cached \
											docker.pkg.github.com/uberflip-partners/psychic/onbrand-build-image:$(BUILD_BRANCH)
export PATH := $(HOME)/.local/bin:$(PATH)

export CI_BRANCH=$(shell echo $(GITHUB_REF) | awk -F '/' '{print $$3}')

DOCKER_MAKE_COMMANDS=run_dev_build dependencies

$(DOCKER_MAKE_COMMANDS): remove_container
	$(RUN_BUILD_CONTAINER) make $@_container
.PHONY: $(DOCKER_MAKE_COMMANDS)

all: dev
.PHONY: all

dev: pull_image run_dev_build
.PHONY: dev

deploy-prod: run_prod_build_container
	@echo Deploying to production...
	@test -s .deploypath || { echo ".deploypath doesn't exist!"; exit 1; }
	@echo `date +%FT%TZ`,`whoami`@`hostname`,`git config user.email`,`echo $(CI_BRANCH)` > .last-deployment
	@echo access_key = `grep -A 3 '\[onBrand]'  ~/.aws/credentials | grep 'aws_access_key_id' | awk '{print $$3}'` > ~/.s3cfg
	@echo secret_key = `grep -A 3 '\[onBrand]'  ~/.aws/credentials |grep 'aws_secret_access_key' | awk '{print $$3}'` >> ~/.s3cfg
	@s3cmd sync --guess-mime-type --no-mime-magic --delete-removed --acl-public --exclude-from=.deployignore --cf-invalidate . s3://uberflip-cihost/`cat .deploypath`/`echo $(CI_BRANCH)`/
.PHONY: deploy-prod

ip:
	ifconfig | sed -En 's/127.0.0.1//;s/.*inet (addr:)?(([0-9]*\.){3}[0-9]*).*/\2/p'
.PHONY: ip

clean:
	@echo Cleaning up...
	git clean -xdf
.PHONY: clean

pull_image:
	@docker pull docker.pkg.github.com/uberflip-partners/psychic/onbrand-build-image:latest 2> /dev/null || true
.PHONY: pull_image

version_container:
	@echo node version `node --version`
	@echo npm version v`npm --version`
.PHONY: version_container

dependencies_container: version_container
	@echo Installing dependencies...
	npm install
.PHONY: dependencies_container

run_dev_build_container:
	@echo Building for development...
	npm run dev
.PHONY: run_dev_build_container

run_prod_build_container:
	@echo Building for production...
	npm run prod
.PHONY: run_prod_build_container

remove_container:
	@docker rm -f onbrand-build-image 2> /dev/null || true
.PHONY: remove_container