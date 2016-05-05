




//get locations home page
//HomeList
exports.homelist = function (req, res) {
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with wiFi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places with wiFi near you!'
        },
        locations: [
            {
                name: 'Starcups',
                address: '125 Low Street, Reading, RG6 1PS',
                rating: 3,
                facilities: ['Hot drinks', 'Food', 'Premium wifi'],
                distance: '100m'
            },
            {
                name: 'Barnes',
                address: '126 Mid Street, Reading, RG6 1PS',
                rating: 3,
                facilities: ['Cold drinks', 'Bookstore', 'Premium wifi'],
                distance: '200m'
            },
            {
                name: 'Nandys',
                address: '127 High Street, Reading, RG6 1PS',
                rating: 2,
                facilities: ['Hot drinks', 'Food', 'Regular wifi'],
                distance: '250m'
            },

        ]
    });
};


//get location info page
//Locations Info
exports.locationInfo = function (req, res) {
    res.render('location-info', { title: 'Location Info' });
};

//get 'add review page'
//Add review page
exports.addReview = function (req, res) {
    res.render('location-review-form', { title: 'Add Review' });
};