// Load dependencies
        var assert = require('assert'),
            zombie = require("zombie"),
            aatConfig = require("../dashboard-config.json"),
            aat = require("@ibma/aat")(aatConfig, { "policies" : ["IBM_DCP080115"]}),
            browser = aat.Zombie(new zombie());

        // Describe unit tests for the home page
        describe("Home Page", function() {
            // Before running tests, visit the homepage
            before(function(done) {
                browser.visit("http://myapp.mybluemix.net", function() {
                    done();
                });
            })

            // Test that the page loaded successfully
            it("Loaded", function() {
                browser.assert.success();
            });

            // Tests to ensure no accessibility violations
            it("Has no accessibility violations", function(done) {
                // Scan may take longer than the default timeout
                // Disable timeout
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
        });
