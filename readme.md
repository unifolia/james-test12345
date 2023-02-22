# Welcome to the Onbrand Webpack Project Template

- [How to](#user-content-how-to)
- [Possible Errors](#user-content-possible-errors)
- [Snippets](#user-content-add-to-hub)
- [Deploying](#user-content-deploying-to-production)
- [Project Notes](#project-notes)

# How to:

1. In the dev-options.js\_ file, update the shortHubUrl and fullHubUrl to match the Hub url you are working on.

2. In the Uberflip backend app, find the Hub you are working on and in it's custom code section add the below snippets. When adding the code to the back of the hub, ensure to update the paths with the correct bundle name.

3. For assets that are not referenced in files but require Uberflip hosting, include them in the assets folder.

4. Steps to add a new entry point (which will create a new bundle with that name)

   1. In the partials/hubSpecificStyles folder create a new SCSS file for the new hub
   2. In the scriptPartials/hubSpecificFunctions folder create a new JS file for the new hub
   3. In the entry-points folder create a new JS file entry point for the new hub
   4. Make sure the files you created in the hubSpecificStyles and the hubSpecificFunctions folders are properly linked in the entry-point file.
   5. In webpack.config.js file update the entry-points variable on line 265

5. For general SCSS and JavaScript that should be included in all bundles include the files in the onbrand.js and onbrand.scss files. For files that will only be included in their respective bundles include them in their entry-points files.

6. To run locally, in your terminal run `make`.

7. To deploy to onBrand servers run `make deploy-prod` - see Deploying for more detail
   **You're ready! Go!**

# Possible Errors

- _svg fonts_ We have no included support for svg fonts, but this can be added if neccesary. By default webpack will assume svgs are images, and load them accordingly.

# Working with localhost

- by default, browsersync will mirror clicks across all entry points, causing on click functions to fire multiple times.
- to avoid this, open the [browsersync options](http://localhost:3001/sync-options) when localhost is running and toggle `Clicks` off.

# Staging

OnBrander now have the ability to show client changes on a branch (Staging) without affecting the live hub.
If a request to a hub includes a URL parameter whose name begins with “ufcc*”, the hub will set a cookie with the same name and value.
If a request to a hub includes a URL parameter named “ufcc_reset”, the hub will clear all ufcc* cookies.

Based on these URL parameters the hub can show the following:

1. cihost from the master directory (default)
2. cihost from a branch directory (“?ufcc_onbrand_branch=OB-1234”)
3. local development server (“?ufcc_onbrand_local”)
4. remove all custom code for cihost (“?ufcc_disabled_all”)
5. reset cookie and view default (“?ufcc_reset”)

When work has been completed on a ticket and it is time for QA deploy changes while on the branch eg. OB-1234, Provide the coach/client with the appropriate url
eg. https://resources.uberflip.com?ufcc_onbrand_branch=OB-1234 to show them the changes.

# Add to hub

## DEVELOPMENT CSS - Place in HEAD

```
{% if ufcc_onbrand_local %}
    <!-- ONBRAND LOCAL -->
    <link id="onbrand__styles" rel="stylesheet" href="/build/<fillInDirHere>/<fillInDirHere>.css">
{% elsif ufcc_onbrand_branch %}
    <!-- ONBRAND BRANCH {{ ufcc_onbrand_branch }} -->
    <link id="onbrand__styles-staging" rel="stylesheet" href="//cihost.uberflip.com/${cihostFolder}/{{ ufcc_onbrand_branch }}/build/<fillInDirHere>/<fillInDirHere>.css">
{% else %}
    <link id="onbrand__styles-production" rel="stylesheet" href="//cihost.uberflip.com/${cihostFolder}/master/build/<fillInDirHere>/<fillInDirHere>.css">
{% endif %}
```

## CUSTOM CSS - Place in HEAD

```
    <style>
        /* Write all custom CSS here */
    </style>
```

## DEVELOPMENT JS - Placed below BODY

```
{% if ufcc_onbrand_local %}
    <!-- ONBRAND LOCAL -->
    <script id="__bs_script__" async src="/browser-sync/browser-sync-client.js?v=2.18.13"></script>
    <script id="onbrand__scripts" src="/build/<fillInDirHere>/<fillInDirHere>.bundle.js"></script>
{% elsif ufcc_onbrand_branch %}
    <!-- ONBRAND BRANCH {{ ufcc_onbrand_branch }} -->
    <script id="onbrand__scripts-staging" src="//cihost.uberflip.com/${cihostFolder}/{{ufcc_onbrand_branch}}/build/<fillInDirHere>/<fillInDirHere>.bundle.js"></script>
{% else %}
    <script id="onbrand__scripts-production" src="//cihost.uberflip.com/${cihostFolder}/master/build/<fillInDirHere>/<fillInDirHere>.bundle.js"></script>
{% endif %}
```

## CUSTOM JS - Place below BODY

```
<script>
    // -- Hub Events -- //
    window.addEventListener('uberflip.load', function() {
      if (!window.onbrandLoaded) {
        // Call all on load functions here
        window.onbrandLoaded = true;
      }
    });
    window.addEventListener('uberflip.itemsLoaded', function() {
      // Call all itemsLoaded events here
    });
    window.addEventListener('uberflip.resize', function() {
      // Call all resize events here
    });
    window.addEventListener('uberflip.scroll', function() {
      // Call all scroll events here
    });
    window.addEventListener('uberflip.recoItemsLoaded', function() {
      // Call all reco panel items loaded events here
    });
    window.addEventListener('uberflip.ctaActivate', function(ctaId) {
      // Call all ctaActivate events here
    });
    window.addEventListener('uberflip.ctaFormSubmitSuccess', function() {
      // Call all ctaFormSubmitSuccess events here
    });
</script>

```

# Deploying to Staging

1. Make sure you have a staging hub setup

2. Make sure you are on the branch you would like to deploy from (for example OB-1234)

3. Ensure that your staging hub is setup with the correct production CSS and JS code block. Replace with the name of your branch.

4. Run `make deploy-prod` on your branch

# Deploying to Production

1. Make sure you have all the latest code. Either
   (merge workflow)
   `git pull`
   or
   (rebase workflow)
   `git fetch`
   `git rebase origin/master`

2. Make sure the repo is going to be deployed to the correct path.
   `cat .deploypath`
   and confirm that the path is correct. (It's relative to the root project directory, so if you expect the code to be deployed to `/shared/lytxV2`, the file should contain `lytxV2`.)

3. Build and deploy!
   `make deploy-prod`

# Project Notes

_add project specific details here_
