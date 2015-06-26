

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

    var supperArray = req.user.suppersAttending.concat(req.user.suppersCreated)

      db.Supper.find({ 
        _id : { $in : supperArray }
      })
      .exec(function(err, result) { 
        if(err) console.log(err);
        // console.log(result);
        res.render('profile.ejs', {
          user: req.user,
          result: result
        })
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
        console.log(req.params)
        req.user.suppersAttending.push(req.params.id);
        req.user.save(function(err, supper){
            console.log(err, supper);
            res.redirect('/suppers/'+req.params.id);
            // res.send(req.flash('info'))
        });
    })

    //DELETE METHOD
      app.post("/suppers/:id/delete", isLoggedIn, function(req, res){
        console.log(req.params);
        var supperId = req.params.id;
        db.Supper.findByIdAndRemove({
          _id: supperId
        }, function(err, supper){
          res.redirect('/profile')
        })
      })

    

    app.post('/suppers', function(req, res) {
    var user = req.user;
    var sup = req.body;
    var veggie = req.body.menu;
    var veggieBool = req.body.veggie === 'on' ? 'true' : 'false';
    var veganBool = req.body.vegan === 'on' ? 'true' : 'false';
    var dateTime = new Date(req.body.date);

    db.Supper.create({
      description : sup.description,
      dressCode: sup.dressCode,
      date: dateTime,
      guest: sup.guestNumber,
      image: sup.image,
      userid: req.user._id,
      title: sup.title,
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
        req.user.save(function(err){
        });
        res.redirect('/suppers/' + supper._id);
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
                // console.log(req.user);
            });
        } else {
            db.User.findById(req.user._id, function(err, user){
                console.log(req.body)
                user.name = req.body.name;
                user.image = req.body.image;
                user.bio = req.body.bio;
            user.save(function(err){
                console.log(err)
                res.redirect('/profile');
            });
        });
        
        }
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/login');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/login');
}