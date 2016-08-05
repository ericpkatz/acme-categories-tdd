var _data = {};

module.exports = {
  getCategories: getCategories,
  addCategory: addCategory,
  reset: reset,
  getProducts: getProducts,
  addProduct: addProduct,
  deleteProduct: deleteProduct,
  deleteCategory: deleteCategory
};

function deleteCategory(name){
  delete _data[name];
}

function deleteProduct(category, idx){
  getProducts(category).splice(idx, 1);
}

function addProduct(category, productName){
  getProducts(category).push({name: productName});
}

function getProducts(name){
  return _data[name];
}

function getCategories(){
  return Object.keys(_data);
};

function reset(){
  _data = {};
}

function addCategory(name){
  _data[name] = [];
}
