
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');

module.exports = function (app) {
    //locations
    app.get('/api/locations', ctrlLocations.locationsListByDistance);//done
    app.post('/api/locations', ctrlLocations.locationsCreate);//done
    app.get('/api/locations/:locationID', ctrlLocations.locationsReadOne);//done
    app.put('/api/locations/:locationID', ctrlLocations.locationsUpdateOne);//done
    app.delete('/api/locations/:locationID', ctrlLocations.locationsDeleteOne);//done

    //reviews
    app.post('/api/locations/:locationID/reviews', ctrlReviews.reviewsCreate);//done
    app.get('/api/locations/:locationID/reviews/:reviewID', ctrlReviews.reviewsReadOne);//done
    app.put('/api/locations/:locationID/reviews/:reviewID', ctrlReviews.reviewsUpdateOne);//done
    app.delete('/api/locations/:locationID/reviews/:reviewID', ctrlReviews.reviewsDeleteOne);//done
};