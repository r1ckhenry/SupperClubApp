// app/routes.js
module.exports = function(app, passport, db) {


    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    // to change test.ejs back to index.ejs ****
    app.get('/test', function(req, res) {
        res.render('test.ejs'); // load the test.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });

    // process the login form
    // app.post('/login', do all our passport stuff here);
        // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });


    //**************************
    //   SUPPERS SECTION
    //************************

    app.get('/suppers/new', isLoggedIn, function(req, res){
        res.render('suppers/new.ejs');
    });

    app.get('/suppers/:id', function(req, res) {
        db.Supper.findById(req.params.id, function(err, supper){
        if (req.xhr) {
            res.send(supper)
        } else {
            res.render('suppers/show.ejs', {
                supper: supper
            });  
        }
    })
  });
    
    app.post('/suppers/:id', isLoggedIn, function(req, res){
        req.user.suppersAttending.push(req.params.id);
        req.user.save(function(err){
            console.log(err);
        });
    })

    app.post('/suppers', function(req, res) {
    var user = req.user;
    var sup = req.body;
    console.log(user);
    var veggie = req.body.menu;
    var veggieBool = req.body.veggie === 'on' ? 'true' : 'false';
    var veganBool = req.body.vegan === 'on' ? 'true' : 'false';
    var dateTime = new Date(req.body.date);

    db.Supper.create({
      description : sup.description,
      dressCode: sup.dressCode,
      date: dateTime,
      guest: sup.guest,
      image: sup.image,
      userid: req.user.id,
      address: {
        firstLine: sup.firstLine,
        secondLine: sup.secondLine,
        city: sup.city,
        postCode: sup.postCode
      },
      menu: {
        dishes: sup.dishes,
        cuisine: sup.cuisine,
        drinks: sup.drinks,
        veggie: veggieBool,
        vegan: veganBool
      }
    }, function(err, supper){
        req.user.suppersCreated.push(supper._id);
        console.log(supper);
        req.user.save(function(err){
        });
        res.redirect('/suppers');
    });
  })




    app.get('/profile/edit', isLoggedIn, function(req, res){
        res.render('profile/edit.ejs', {
            user : req.user
        });
    });

    app.post('/profile', isLoggedIn, function(req, res){
        if (req.xhr) {
            req.user.faveCuisines.push(req.body.newCountry);
            req.user.save(function(err){
                console.log(req.user);
            });
        } else {
            db.User.findById(req.user._id, function(err, user){
            user.name = req.body.name;
            user.save(function(err){
                console.log(err)
            });
        });
        res.redirect('/profile');
        }
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/test');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/test');
}