const cors = require('cors');
const productCategoriesController = require('../controllers/productCategoriesController');

module.exports = function (app) {
    app.route('/api/v1/productcategories').post(productCategoriesController.createProductCategory, cors());
};
