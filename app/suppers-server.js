module.exports = function(app, db) {

  app.get('/suppers', function(req, res) {
    db.Supper.find({}, function (err, suppers){
      res.render('suppers.ejs', {
        supper: suppers
      });
    })
  })

  app.get('/suppers/new', function(req, res){
   res.render('suppers/new.ejs');
  });

  app.get('/suppers/:id', function(req, res) {
    db.Supper.findById(req.params.id, function(err, supper){
      res.render('suppers/show.ejs', {
        supper: supper
      });
    })
  });

  app.post('/suppers', function(req, res) {
    var sup = req.body;
    db.Supper.create({
      description : sup.description,
      dressCode: sup.dressCode,
      address: {
        firstLine: sup.firstLine,
        secondLine: sup.secondLine,
        city: sup.city,
        postCode: sup.postCode
      },
      menu: {
        dishes: sup.dishes,
        cuisine: sup.cuisine,
        drinks: sup.drinks
      }
    }, function(err, supper){
      res.redirect('/suppers');
    });
  })

  

  //DELETE METHOD
  app.post("/suppers/:id", function(req, res){
    var supperId = req.params.id;
    db.Supper.findByIdAndRemove({
      _id: supperId
    }, function(err, supper){
      res.send(204);
    })
  })

}