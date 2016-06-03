
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');

module.exports = function (app) {
    //locations
    app.get('/locations', ctrlLocations.locationsListByDistance);
    app.post('/locations', ctrlLocations.locationsCreate);
    app.get('/locations/:locationID', ctrlLocations.locationsReadOne);
    app.put('/locations/:locationID', ctrlLocations.locationsUpdateOne);
    app.delete('/locations/:locationID', ctrlLocations.locationsDeleteOne);

    //reviews
    app.post('/locations/:locationID/reviews', ctrlReviews.reviewsCreate);
    app.get('/locations/:locationID/reviews/:reviewID', ctrlReviews.reviewsReadOne);
    app.put('/locations/:locationID/reviews/:reviewID', ctrlReviews.reviewsUpdateOne);
    app.delete('/locations/:locationID/reviews/:reviewID', ctrlReviews.reviewsDeleteOne);
};