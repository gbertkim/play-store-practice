const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('GET /app', () => {
  it('should return an array of apps', () => {
    return request(app)
      .get('/apps')
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf.at.least(1);
        const app = res.body[0];
        expect(app).to.include.all.keys('App', 'Category', 'Rating', 'Reviews', 'Size', 'Installs', 'Type', 'Price', 'Content Rating');
      });
  })
  it('should be 400 if sort is incorrect', () => {
    return request(app)
      .get('/apps')
      .query({sort: 'MISTAKE'})
      .expect(400, 'Sort must be one of rating or app');
  });
  it('should sort by rating', () => {
    return request(app)
      .get('/apps')
      .query({sort: 'rating'})
      .expect(200)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).to.be.an('array');
        let i = 0;
        let sorted = true;
        while(sorted && i < res.body.length - 1) {
          sorted = sorted && res.body[i].Rating <= res.body[i + 1].Rating;
          i++;
        }
        expect(sorted).to.be.true;
      });
  });
});