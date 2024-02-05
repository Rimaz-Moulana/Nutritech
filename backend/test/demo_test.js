const mocha = require('mocha');
const assert = require('assert');
const Video = require('../models/video');

// Describe tests
describe('Saving records', function () {
    // Create tests
    it('Saves a record to the database', function (done) {
        var v = new Video({
            video_id: 3,
            Uploader: 'ITN',
            Brand_Name: 'Astra',
            Product: 'Margarine',
            variation: '500mg',
            date: '13/01/2024',
            time: '10:12:34',
            status: 'Unannotated',
        });

        v.save().then(function () {
            assert(v.isNew === false);
            done();
        }).catch(function (error) {
            console.error('Error saving record:', error);
            done(error); // Pass the error to Mocha to indicate a failure
        });
        
    }).timeout(30000);

    // Add more tests if needed
});
