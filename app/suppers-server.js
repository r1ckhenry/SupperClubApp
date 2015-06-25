module.exports = function(app, db) {

  app.get('/suppers', function(req, res) {
    db.Supper.find({}, function (err, suppers){
      res.render('suppers.ejs', {
        supper: suppers
      });
    })
  })

}