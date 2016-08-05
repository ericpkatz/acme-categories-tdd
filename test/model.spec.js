var expect = require('chai').expect;
var db = require('../db');
describe('model', function(){
  it('exists', function(){
    expect(db).to.be.ok;
  });

  describe('#deleteCategory', function(){
    it('deletes the category', function(){
      db.reset();
      db.addCategory('foo');
      expect(db.getCategories()).to.eql(['foo']);
      db.deleteCategory('foo');
      expect(db.getCategories()).to.eql([]);
    });
  });

  describe('#getProducts', function(){
    beforeEach(function(){
      db.reset();
      db.addCategory('foo');
      db.addProduct('foo', 'buzz');
    });
    it('returns the products', function(){
      expect(db.getProducts('foo')).to.eql([{ name: 'buzz'}]);
    });
  });

  describe('#deleteProduct', function(){
    beforeEach(function(){
      db.reset();
      db.addCategory('foo');
      db.addProduct('foo', 'buzz');
      db.addProduct('foo', 'bizz');
      db.deleteProduct('foo', 1);
    });
    it('returns the products', function(){
      expect(db.getProducts('foo')).to.eql([{ name: 'buzz'}]);
    });
  });

  describe('#getCategories', function(){
    describe('when there are two categories', function(){
      beforeEach(function(){
        db.addCategory('foo');
        db.addCategory('bar');
      });
      it('return the categories', function(){
        expect(db.getCategories()).to.eql(['foo', 'bar']);
      });
    });

    describe('when there are none', function(){
      beforeEach(function(){
        db.reset();
      });
      it('returns an empty array', function(){
        expect(db.getCategories()).to.eql([]);
      
      });
    });

  });
});
