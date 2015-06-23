module.exports = function(app, db) {

  app.get('/suppers', function(req, res) {
    db.Supper.find({}, function (err, suppers){
      var hello = suppers;
      res.send(suppers);
      console.log(suppers);
     })
  });

}