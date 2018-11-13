var envIndex = process.argv.indexOf('--env') + 1;
var env = envIndex ? process.argv[envIndex] : undefined;

module.exports = {
  testTimeout: 180 * 1000,
  verbose: false,
  plugins: {
    local: {
      browserOptions: {
        chrome: [
          'headless',
          'disable-gpu',
          'no-sandbox'
        ]
      }
    },
    // MAGI REMOVE START
    istanbul: {
      dir: './coverage',
      reporters: ['text-summary', 'lcov'],
      include: [
        '**/vaadin-app-layout/src/*.html'
      ],
      exclude: [],
      thresholds: {
        global: {
          statements: 90
        }
      }
    }
    // MAGI REMOVE END
  },

  registerHooks: function(context) {

    const saucelabsPlatforms = [
      'iOS Simulator/iphone@10.3'
    ];

    const cronPlatforms = [
      {
        deviceName: 'Android GoogleAPI Emulator',
        platformName: 'Android',
        platformVersion: '7.1',
        browserName: 'chrome'
      },
      'iOS Simulator/ipad@11.3',
      'iOS Simulator/iphone@10.3',
      'Windows 10/chrome@latest',
      'Windows 10/firefox@latest'
    ];
    if (env === 'saucelabs') {
      context.options.plugins.sauce.browsers = saucelabsPlatforms;
    } else if (env === 'saucelabs-cron') {
      context.options.plugins.sauce.browsers = cronPlatforms;
      // MAGI REMOVE START
      context.options.plugins.istanbul.thresholds.global.statements = 0;
    } else {
      context.options.plugins.istanbul.thresholds.global.statements = 0;
      // MAGI REMOVE END
    }
  }
};
