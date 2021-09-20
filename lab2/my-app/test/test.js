const assert = require('assert')
const should = require('should')
const superagent = require('superagent')
const request = require('superagent');
const chai = require('chai')
const expect = chai.expect
const url = "http://localhost:3000/";


 describe('Get all messages', () => {
    it('should return one message', (done) => {
      request.get(url + 'getall', (err, res) => {
        if(err) {done(err)}
        const message = res.body[0].message
        const status = res.body[0].status
        assert.equal(message ,"This is a simple message!")
        assert.equal(status ,"unread")
        done()
      })
      
    })
})

describe('Post "Hello World!!!"', () => {
  it('Should post the message', async () => {
    const res = await request.post(url + 'save')
    .send({message: "Hello World!!!", status: "unread"})
    
    assert.equal(res.statusCode, "200")
    
  })
})

describe('Get all messages', () => {
  it('should return two messages', (done) => {
    request.get(url + 'getall', (err, res) => {
      if(err) {done(err)}

      assert.equal(res.body.length, 2)
      
      done()
    })
  })
})

describe('Changing status code of first message', () => {
  it('Should change the status to "read"', async () => {
    const res = await request.post(url + 'flag')
    .send({id: "61424edbae0a291a8c3fd354", status: "read"})

    assert.equal(res.statusCode, 200)
    
  })
})

describe('Changing status code of first message', () => {
  it('Should change the status to "unread"', async () => {
    const res = await request.post(url + 'flag')
    .send({id: "61424edbae0a291a8c3fd354", status: "unread"})

    assert.equal(res.statusCode, 200)
    
  })
})


describe('Get one specific message"', () => {
  it('Should return the desired message', () => {
    request.get(url + 'get/?id=61424edbae0a291a8c3fd354', (err, res) => {
      if(err) {console.log(err)}
      const message = res.body[0].message
      const status = res.body[0].status
      assert.equal(res.statusCode, 200)
      assert.equal(message, "This is a simple message!")
      assert.equal(status, "unread")
    })
  })
})

// describe('Change message status to read', () => {
//   it('message "Hello World!!!" should get "read" as status', async () => {
//     const res = await request.post(url + 'flag')
//     .send({id: "6148af704c4d234c8b1f2aad", status: "read"})
    
//     assert.equal(res.statusCode, "200")
//   })
// })

// describe("POST /airports/distance", function () {
//   it("calculates the distance between two airports", async function () {
//     const response = await request
//       .post("/airports/distance")
//       .send({ from: "KIX", to: "SFO" });

//     expect(response.status).to.eql(200);


describe('404 error', () => {
  it('should return statuscode 404', (done) => {
    request.get(url, function(err, res) {
      expect(res.statusCode).to.equal(404);
      done();
    })
  })
}) 