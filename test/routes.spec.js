var client = require('supertest')(require('../app'));
var expect = require('chai').expect;
var db = require('../db');
describe('routes', function(){
  describe('home page', function(){
    beforeEach(function(){
      db.reset();
      db.addCategory('foo');
      db.addCategory('bar');
    
    });
    it('has the text Welcome to Acme Categories', function(done){
      client.get('/')
        .expect(200)
        .end(function(err, res){
          if(err)
            return done(err);
          expect(res.text).to.contain('Welcome to Acme Categories');
          expect(res.text).to.contain('foo');
          expect(res.text).to.contain('bar');
          done();
        });
    });
  });

  describe('DELETE /categories/foo', function(){
    beforeEach(function(){
      db.reset();
      db.addCategory('foo');
    });
    it('redirect to the home page', function(done){
      client.delete('/categories/foo')
        .expect(302)
        .end(function(err, res){
          if(err)
            return done(err);
          expect(res.header.location).to.equal('/');
          done();
        });
    });
  });

  describe('DELETE /categories/foo/products/0', function(){
    beforeEach(function(){
      db.reset();
      db.addCategory('foo');
      db.addProduct('foo', 'bar');
    });
    it('redirect to that category', function(done){
      client.delete('/categories/foo/products/0')
        .expect(302)
        .end(function(err, res){
          if(err)
            return done(err);
          expect(res.header.location).to.equal('/categories/foo');
          done();
        });
    });
  });

  describe('POST /categories/foo/products', function(){
    beforeEach(function(){
      db.reset();
      db.addCategory('foo');
    });
    it('redirect to that category', function(done){
      client.post('/categories/foo/products')
        .send('name=bar')
        .expect(302)
        .end(function(err, res){
          if(err)
            return done(err);
          expect(res.header.location).to.equal('/categories/foo');
          done();
        });
    });
  });
  
  describe('POST /categories', function(){
    beforeEach(function(){
      db.reset();
    });
    it('redirect to that category', function(done){
      client.post('/categories')
        .send('name=foo')
        .expect(302)
        .end(function(err, res){
          if(err)
            return done(err);
          expect(res.header.location).to.equal('/categories/foo');
          done();
        });
    });
  });

  describe('categories page', function(){
    beforeEach(function(){
      db.reset();
      db.addCategory('foo');
      db.addCategory('bar');
      db.addProduct('bar', 'buzz');
    });
    it('shows the products', function(done){
      client.get('/categories/bar')
        .expect(200)
        .end(function(err, res){
          if(err)
            return done(err);
          expect(res.text).to.contain('foo');
          expect(res.text).to.contain('bar');
          expect(res.text).to.contain('buzz');
          done();
        });
    });
  });
});
