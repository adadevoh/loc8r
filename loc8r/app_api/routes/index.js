
var ctrlLocations = require('../controllers/locations');
var ctrlReviews = require('../controllers/reviews');

module.exports = function (app) {
    //locations
    app.get('/locations', ctrlLocations.locationsListByDistance);//done
    app.post('/locations', ctrlLocations.locationsCreate);//done
    app.get('/locations/:locationID', ctrlLocations.locationsReadOne);//done
    app.put('/locations/:locationID', ctrlLocations.locationsUpdateOne);//done
    app.delete('/locations/:locationID', ctrlLocations.locationsDeleteOne);//done

    //reviews
    app.post('/locations/:locationID/reviews', ctrlReviews.reviewsCreate);//done
    app.get('/locations/:locationID/reviews/:reviewID', ctrlReviews.reviewsReadOne);//done
    app.put('/locations/:locationID/reviews/:reviewID', ctrlReviews.reviewsUpdateOne);//done
    app.delete('/locations/:locationID/reviews/:reviewID', ctrlReviews.reviewsDeleteOne);
};