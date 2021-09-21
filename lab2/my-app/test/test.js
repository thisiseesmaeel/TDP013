const assert = require('assert')
const should = require('should')
const superagent = require('superagent')
const request = require('superagent');
const chai = require('chai')
const expect = chai.expect
const url = "http://localhost:3000/";


 describe('Get all messages.', () => {
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


describe('Get one specific message', () => {
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

////////////// 405 error
describe('405 error', () => {
  it('should return statuscode 405', (done) => {
    request.post(url + "get", function(err, res) {
      expect(res.statusCode).to.equal(405);
      done();
    })
  })
})

describe('405 error', () => {
  it('should return statuscode 405', (done) => {
    request.get(url + "save", function(err, res) {
      expect(res.statusCode).to.equal(405);
      done();
    })
  })
})

describe('405 error', () => {
  it('should return statuscode 405', (done) => {
    request.post(url + "getall", function(err, res) {
      expect(res.statusCode).to.equal(405);
      done();
    })
  })
})

describe('405 error', () => {
  it('should return statuscode 405', (done) => {
    request.get(url + "flag", function(err, res) {
      expect(res.statusCode).to.equal(405);
      done();
    })
  })
})
/////////////////////////


/////////////// Error 404
describe('Trying to reach /lol with a get method', () => {
  it('should return statuscode 404', (done) => {
    request.get(url + "/lol", function(err, res) {
      expect(res.statusCode).to.equal(404);
      done();
    })
  })
})

describe('Trying to reach /bruh with a post method', () => {
  it('should return statuscode 404', () => {
    request.post(url + "/bruh")
    .send({id: "61424edbae0a291a8c3fd354", status: "read"})
    .end((err, res) =>{
        expect(err.status).to.equal(404);
    })
  })
})

////////////// Error 400
describe('Changing status code of a message that does NOT exist.', () => {
  it('Should return 400 error', async () => {
    const res = await request.post(url + 'flag')
     .send({id: "61424edbae0a291a8c3fd359", status: "unread"})
     .catch((err) => {
       assert.equal(err.status, 400)
     })
  })
})

describe("Trying to change an invalid status code of a message.", () => {
  it('Should return 400 error', async () => {
    await request.post(url + 'flag')
     .send({id: "61424edbae0a291a8c3fd354", status: "lol"})
     .catch((err) => {
       assert.equal(err.status, 400)
     })
  })
})


describe('Trying to post an empty message.', () => {
  it('Should return 400 error', async () => {
    await request.post(url + 'save')
     .send({message: "", status: "unread"})
     .catch((err) => {
       assert.equal(err.status, 400)
     })
  })
})

describe('Trying to post a message with an invalid status.', () => {
  it('Should return 400 error', async () => {
      await request.post(url + 'save')
     .send({message: "This is a message.", status: "lol"})
     .catch((err) => {
       assert.equal(err.status, 400)
     })
  })
})

describe('Trying to post a message with more than 140 characters.', () => {
  it('Should return 400 error', async () => {
     await request.post(url + 'save')
     .send({message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", status: "unread"})
     .catch((err) => {
         expect(err.status).to.equal(400);
     })
  })
})

describe('Trying to get a message with an invalid ID.', () => {
  it('Should return 400 error', () => {
    request.get(url + 'get?id=61424edbae0a291a8c3fd358', (res, err) => {
        assert.equal(res.status, 400)
    })
  })
})