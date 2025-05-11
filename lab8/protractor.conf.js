exports.config = {
  directConnect: true, // дозволяє напряму запускати Chrome без selenium server
  framework: 'jasmine',
  specs: ['tests/protractor_tests/*.js'],
  seleniumAddress: 'http://localhost:4444/wd/hub',

capabilities: {
  browserName: 'chrome',
  chromeOptions: {
    args: ['--disable-gpu', '--window-size=800,600']
  }
},
chromeDriver: './drivers/chromedriver.exe',

};
