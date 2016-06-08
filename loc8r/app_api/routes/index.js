
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');

module.exports = function (app) {
    //locations
    app.get('/locations', ctrlLocations.locationsListByDistance);//done
    app.post('/locations', ctrlLocations.locationsCreate);//done
    app.get('/locations/:locationID', ctrlLocations.locationsReadOne);//done
    app.put('/locations/:locationID', ctrlLocations.locationsUpdateOne);
    app.delete('/locations/:locationID', ctrlLocations.locationsDeleteOne);

    //reviews
    app.post('/locations/:locationID/reviews', ctrlReviews.reviewsCreate);//done
    app.get('/locations/:locationID/reviews/:reviewID', ctrlReviews.reviewsReadOne);//done
    app.put('/locations/:locationID/reviews/:reviewID', ctrlReviews.reviewsUpdateOne);
    app.delete('/locations/:locationID/reviews/:reviewID', ctrlReviews.reviewsDeleteOne);
};