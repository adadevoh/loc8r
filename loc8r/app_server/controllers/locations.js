




//get locations home page
exports.homelist = function (req, res) {
    res.render('index', { title: 'Home' });
};


//get location info page
exports.locationInfo = function (req, res) {
    res.render('index', { title: 'Location Info' });
};

//get 'add review page'
exports.addReview = function (req, res) {
    res.render('index', { title: 'Add Review' });
};