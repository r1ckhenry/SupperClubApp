module.exports = function(app, db) {

  app.get('/suppers', function(req, res) {
    db.Supper.find({}, function (err, suppers){
      res.render('suppers.ejs', {
        supper: suppers
      });
    })
  })

  app.post('/suppers', function(req, res) {
    console.log(req.body);
    db.Supper.create(req.body, function(err, supper){
      res.send(201, supper);
    })
  })

  app.get('/suppers/new', function(req, res){
   res.render('suppers/new.ejs');
  });

  app.delete("/suppers/:id", function(req, res){
    var supperId = req.params.id;
    db.Supper.findByIdAndRemove({
      _id: supperId
    }, function(err, supper){
      res.send(204);
    })
  })

}