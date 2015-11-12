var ctrl = require('../controllers/newStocks.js')

module.exports = function (app) {

  app.get('/app_api/newStocks', ctrl.get);

}
