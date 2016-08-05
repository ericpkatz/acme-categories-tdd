var router = require('express').Router();
var db = require('../db');

module.exports = router;

router.get('/:category', function(req, res, next){
  res.render('category', {
    title: 'Products for ' + req.params.category,
    categories: db.getCategories(),
    products: db.getProducts(req.params.category),
    category: req.params.category
  });
});

router.post('/', function(req, res, next){
  db.addCategory(req.body.name);
  res.redirect('/categories/' + req.body.name);
});

router.delete('/:category', function(req, res, next){
  db.deleteCategory(req.params.category);
  res.redirect('/');
});

router.post('/:category/products', function(req, res, next){
  db.addProduct(req.params.category, req.body.name);
  res.redirect('/categories/' + req.params.category);
});

router.delete('/:category/products/:idx', function(req, res, next){
  db.deleteProduct(req.params.category, req.params.idx);
  res.redirect('/categories/' + req.params.category);
});

