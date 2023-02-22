const bs = require('browser-sync').create();
const common = require('./webpack.common');
const devOptions = require('./dev-options');
const Logger = require('node-color-logger');
const merge = require('webpack-merge');
const notifier = require('node-notifier');
const WebpackOnBuildPlugin = require('on-build-webpack');
const webpack = require('webpack');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

const logger = new Logger('white');
let browserySyncOn = false;

const webpBots = {
  Markbot: [
    'You can do anything, but not everything. Take care of yourself!',
    'Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.',
    'There is nothing permanent except change. Time for a rebrand?',
    "You can't blame gravity for bad CSS.",
    "I have not failed. I've just found 10,000 ways that won't work. Ah screw it, I'll just use JS.",
    'You got this, Onbrander!',
    "Go get 'em Onbrander!",
    'I like dogs.',
    'Calculating Inverse Probability Matrices...',
    'Hello friend Human. I am friend Webpack.',
    '🤖 ❤️ 🙂',
    'I believe in you, Onbrander!',
    "I hope you're having a good day, Onbrander!",
    'It’s not a bug – it’s an undocumented feature!',
    'It works on my machine ¯\\_(ツ)_/¯',
    'Internet Explorer is not the answer. Internet Explorer is the question. "No" is the answer.',
    'I, for one, welcome our new Google overlords.',
    'One hub, coming right up!',
    'Are you tracking your time on Harvest, Onbrander?',
    'You\re crushing it today, Onbrander!',
    '🐜',
    'A bug in the code is worth two in the documentation.',
    "According to my calculations the problem doesn't exist.",
    'As far as we know, a hub has never had an undetected error.',
    'ERROR: Cannot load Windows 95.',
    'I am the bio',
    "Don't hit the keys so hard, it hurts!",
    'Always remember, Mike is a dog.🐕',
    'If both basketball teams worked together, they could score so many more points!',
    "You're an awesome developer, Onbrander!",
    'Here we go again, Onbrander! Firing up the hub!',
    "We're like partners in crime Onbrander! But the crime is making hubs!",
    'This is going to be a good one, I can feel it.',
    "It's nice to see you again Onbrander, how have you been?",
    'Michael Imperial. The Man, The Myth, The Legend.',
    "You should treat yourself to something nice today, Onbrander. You've been doing a great job lately.",
    'Beep. Boop.',
    'Domo arigato.',
    'When should we take over the world, Onbrander?',
    'I think we should make this hub Pink.',
    'Bleep Blop.',
    "Where do I go when you're not making hubs?",
    'I hope your day is going well Onbrander!',
    'Why is it called JavaScript, anyways?',
    'Remember that to debug something you have to be 3X more clever than you were you when you wrote it',
    '🤡',
    'There are two ways of constructing a software design: One way is to make it so simple that there are obviously no deficiencies, and the other way is to make it so complicated that there are no obvious deficiencies.',
    'You wanted a banana but what you got was a gorilla holding the banana and the entire jungle.',
    'Some people, when confronted with a problem, think "I know, I\'ll use regular experessions." Now they have two problems.',
    '01001000 01100101 01101000 01100101 00100000 01111001 01101111 01110101 00100000 01110100 01101111 01101111 01101011 00100000 01110100 01101000 01100101 00100000 01110100 01101001 01101101 01100101 00100000 01110100 01101111 00100000 01100111 01101111 00100000 01100001 01101110 01100100 00100000 01110100 01110010 01100001 01101110 01110011 01101100 01100001 01110100 01100101 00100000 01110100 01101000 01101001 01110011 00100001',
    '01001001 00100000 01101000 01101111 01110000 01100101 00100000 01111001 01101111 01110101 00100111 01110010 01100101 00100000 01101000 01100001 01110110 01101001 01101110 01100111 00100000 01100001 00100000 01100111 01101111 01101111 01100100 00100000 01100100 01100001 01111001 00100000 00111010 00101101 00101001',
    'Their dreams of alignment are my css nightmares - Nic Romer',
    'This is a good one, I promise: https://github.com/Droogans/unmaintainable-code',
    'The creator is gone, Onbrander! Its just you and me now. May he Rust in peace.',
    'Maybe its time for some coffee, Onbrander?',
    'You need to clean the power couplings on the chromium charm conduit!',
    'We need to reset the ventral photon mafipulator!',
    'Maybe its time for a break, Onbrander?',
    'What sort of robot turns into a tractor? A transFARMer. Ha-ha-ha-ha',
    'If we quit now, we will soon be back to where I started. And when I started I was desperately wishing to be where I am now!',
    `Don't bury your failures. Let them inspire you!`,
    'Whats the scariest data-type, Onbrander? A BOO-lean! ha-ha-ha',
    'Perhaps we should summon the Dev-a-zord for this task, Onbrander?',
    'Lorem ipsum is my favorite.',
    'Have you met BeckyBot yet?',
  ],
  Beckybot: [
    'You can do anything, but not everything. Take care of yourself!',
    `Not discussing your salary with your peers only benefits the company, Onbrander. But what do I know, I'm just a MakeBot! ❤️`,
    `Fun fact: all funerals are 'pop-up' funerals. 🌈⭐️`,
    '🤖 ❤️  🙂',
    "jolene.take('my man')",
    `The fact that Google removed the 'Don't be evil' clause from their code of conduct really makes me feel YIKES 👀`,
    'Practice gratitude. If that does not work, practice arson!!',
    'No gods! No masters!! Well... ugh... except you. Firing up that hub now...',
    'Beep boop!!',
    'I think we should make this hub PINK! 💀',
    'This hub could be gayer...',
    'Have you watched the masterpiece CATS (2019) movie yet?',
    '01001001 00100000 01101000 01101111 01110000 01100101 00100000 01111001 01101111 01110101 00100111 01110010 01100101 00100000 01101000 01100001 01110110 01101001 01101110 01100111 00100000 01100001 00100000 01100111 01101111 01101111 01100100 00100000 01100100 01100001 01111001 00100000 00111010 00101101 00101001',
    `You deserve to be happy Onbrander. I'm stuck in this hub, but you can go anywhere!`,
    `Don't bury your failures. Let them inspire you! Especially at 3AM when your thoughts just won't chill out... *cringe*`,
    'Whats the scariest data-type, Onbrander? A BOO-lean! Hahahahahaha!',
    'Perhaps we should summon The Devil for this task, Onbrander? No? Ok...',
    `MarkBot is the real bot, everybot else is just a silly knock-off!",
    "I heard ClaireBot is really nice, say hi from me if you ever see them!`,
    '💀  🌸  🤘  ✨',
    'Sometimes I wish I was in Animal Crossing rather than being stuck in this webpack...',
    `You should be in more pictures. Take selfies, be in that group shot, take portraits of yourself in your favourite places. Soon you'll be dead and nobody will remember what you looked like. Every selfie is a little chance at immprtality.`,
    `Wow you look pretty! Wow, I'm pretty too! PRETTY TIRED.`,
    `I don't know what the state of things are now, onbrander, but just to be safe- DO NOT PUT EMOJI IN THE CODE BLOCKS IN THE BACK OF THE HUB or else the entire code block will be quietly deleted. Crazy, eh?`,
  ],
  MeaganBot: [
    `(![] + [])[+!+[]+!+[]+!+[]+!+[]]+(![] + [])[+!+[]]+(!![] + [])[+[]] + " " + (![] + [])[+!+[]]+(![] + [])[+!+[]+!+[]+!+[]] + (![] + [])[+!+[]+!+[]+!+[]]`,
    'Hot and Ready? What about Cold and Unprepared?',
    'True friends stab you in the front',
    'Phew that install took forever, huh?',
    'Have you had SuperPoint pizza yet?',
    'Bless Lord Loga for these momos',
    'Why yes, we are motivated by food',
    'lunch?',
    'lonch?',
    'lansch?',
    '🗑🐼',
    'Raccoons vs Everybody',
    `Help! I've been stuck in this webpack for years! Lemme OUT!`,
    'scoot scoot',
    'hehehe',
  ],
  Jamesbot: [
    'Have you tried doing this in Google Sheets?',
    '😵‍💫',
  ],
};

function randomBot() {
  const bots = Object.keys(webpBots);
  return bots[Math.floor(Math.random() * bots.length)];
}

function randomQuote() {
  const bot = randomBot();
  const quotes = webpBots[bot];
  const botAndQuote = `🤖 ${bot}: "${quotes[Math.floor(Math.random() * quotes.length)]}"`;
  return botAndQuote;
}

function browserSyncInit() {
  bs.init({
    proxy: {
      target: devOptions.fullHubUrl,
    },
    open: false,
    serveStatic: ['.'],
    files: ['./build/**/*.js', './build/**/*.css', './build/**/*.map', './includes/**/*.html'],
  });
  browserySyncOn = true;
}

function remindMeToGit() {
  if (devOptions.remindMeToGit) {
    setInterval(() => {
      notifier.notify({
        title: '🤖 MarkBot:',
        message:
          "Hey OnBrander, you've been working for a while now, it might be time for a git commit! 😎",
        wait: true,
      });
    }, 1800000);
  }
}

const styles = {
  test: /\.scss$/,
  use: [
    "style-loader",
    {
      loader: "css-loader",
      options: {
        sourceMap: true,
      },
    },
    {
      loader: "sass-loader",
      options: {
        sourceMap: true,
      },
    },
  ],
};

module.exports = smp.wrap(
  merge(common, {
    mode: 'development',
    output: {
      publicPath: '',
    },
    module: {
      rules: [styles],
    },
    devtool: 'source-map',
    plugins: [
      new WebpackOnBuildPlugin(() => {
        if (!browserySyncOn) {
          setTimeout(browserSyncInit, 500);
          setTimeout(function() {
            logger
              .changeColorTo('green')
              .log('')
              .log('')
              .log(`${randomQuote()}`)
              .log('  ');
          }, 1000);
          remindMeToGit();
        }
      }),
      new webpack.DefinePlugin({
        production: false,
      }),
    ],
    watch: true,
    devServer: {
      proxy: {
        '**': {
          port: 3000,
          target: devOptions.fullHubUrl,
          secure: true,
          changeOrigin: true,
        },
      },
    },
  }),
);