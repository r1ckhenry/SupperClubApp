module.exports = function(app, db) {

  app.get('/suppers', function(req, res) {
    db.Supper.find({}, function (err, suppers){
      res.render('suppers.ejs', {
        supper: suppers
      });
    })
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