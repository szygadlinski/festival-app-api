const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Concert = require('../../models/concert.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/concerts', () => {

  before(async () => {
    const testConcOne = new Concert({ performer: 'performer1', genre: 'genre1', price: 10, day: 1, image: 'img' });
    await testConcOne.save();

    const testConcTwo = new Concert({ performer: 'performer2', genre: 'genre2', price: 20, day: 1, image: 'img' });
    await testConcTwo.save();

    const testConcThree = new Concert({ performer: 'performer2', genre: 'genre2', price: 30, day: 2, image: 'img' });
    await testConcThree.save();

    const testConcFour = new Concert({ performer: 'performer3', genre: 'genre2', price: 40, day: 1, image: 'img' });
    await testConcFour.save();

    const testConcFive = new Concert({ performer: 'performer4', genre: 'genre1', price: 20, day: 2, image: 'img' });
    await testConcFive.save();
  });

  after(async () => {
    await Concert.deleteMany();
  });

  it('"/performer/:performer" should return an array with concerts filtered by ":performer"', async () => {
    const res = await request(server).get('/api/concerts/performer/performer2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(2);
  });

  it('"/genre/:genre" should return an array with concerts filtered by ":genre"', async () => {
    const res = await request(server).get('/api/concerts/genre/genre2');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
  });

  it('"/price/price_min/price_max" should return an array with concerts filtered by "price_min" and "price_max"', async () => {
    const res = await request(server).get('/api/concerts/price/10/30');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(4);
  });

  it('"/day/:day" should return an array with concerts filtered by ":day"', async () => {
    const res = await request(server).get('/api/concerts/day/1');
    expect(res.status).to.be.equal(200);
    expect(res.body).to.be.an('array');
    expect(res.body.length).to.be.equal(3);
  });
});
