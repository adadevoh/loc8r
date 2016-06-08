//app_server/controllers/locations.js

//get locations home page
//HomeList
exports.homelist = function (req, res) {
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with wiFi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places with wiFi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations: [
            {
                name: 'Starcups',
                address: '125 High Street, Reading, RG6 1PS',
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
                address: '127 Low Street, Reading, RG6 1PS',
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
    res.render('location-info', {
        title: 'Location Info',
        name: 'Starcups',
        rating: 3,
        address: "125 High Street, Reading, RG6 1PS",
        hours : {
            title: "Opening hours",
            times: ["Monday - Friday : 7:00am - 7:00pm", "Saturday : 8:00am - 5:00pm", "Sunday : closed"]
        },
        facilities: ['Hot drinks', 'Food', 'Premium wifi'],
        map : {
            title: "Location map",
            image: "http://maps.googleapis.com/maps/api/staticmap?center=51.455041,-0.9690884&zoom=17&size=400x350&sensor=false&markers=51.455041,-0.9690884&scale=2"
        },
        CustomerReviews: [
            {
                author : 'Simon Holmes',
                rating: 5,
                date: Date.now(),
                comment: "What a great place. I can't say enough good things about it."
            },
            {
                author: "Charlie Chaplin",
                rating: 3,
                date: Date.now(),
                comment: "It was okay. Coffee wasn't great, but the wifi was fast."
            }
        ]
    });
};

//get 'add review page'
//Add review page
exports.addReview = function (req, res) {
    res.render('location-review-form', { title: 'Add Review' });
};




//test
exports.locationsListByDistance = function (req, res) {
    console.log("app_server/controller locations by distance called");
    res.status(200)
    res.json({ message: "app_server/controller: all good" });
};