var assert = require('assert'),
            fs = require("fs"),
            aatConfig = require("../dashboard-config.json"),
            options = {
                "policies": ["IBM_DCP080115"]
            };

        var webdriver = require('selenium-webdriver'),
            SeleniumServer = require('selenium-webdriver/remote').SeleniumServer,
            By = require('selenium-webdriver').By,
            until = require('selenium-webdriver').until;

        var pathToSeleniumServer = "/Users/lars.henrik.nordli/sdk/selenium/selenium-server-standalone-3.0.1.jar"
        var server = new SeleniumServer(pathToSeleniumServer, {
        port: 4444,
        jvmArgs: [
            "-Dwebdriver.chrome.driver=chromedriver"
        ]
        });

        server.start();

        var seleniumDriver = new webdriver.Builder().
            usingServer(server.address()).
            withCapabilities(webdriver.Capabilities.chrome()).
            build();


        var aat = require("@ibma/aat");//(aatConfig, { "policies" : ["IBM_DCP080115"]});
        aat.DEBUG = true;
        aat.Config.policies.push("IBM_DCP080115");
        console.log("**AAT:**\r\n",aat);

        var browser = aat.Selenium(seleniumDriver);

        describe("Home Page", function() {
            before(function(done) {
                this.timeout(0);
                browser.get("http://myapp.mybluemix.net")
                    .then(function() { done() });
            })

            it("Has no accessibility violations", function(done) {
                this.timeout(0);
                browser.getCompliance().then(function(data) {
                    try {
                        assert.equal(data.counts['level.violation'], 0);
                        done();
                    } catch (e) {
                        data.reports.forEach(function(report) {
                            console.log(report);
                        });
                        done(e);
                    }
                });
            });
            after(function() {
                browser.quit();
            })
        });
