const assert = require('assert')
const superagent = require('superagent');
const should = require('should')
const url = "http://localhost:3000/";
let { makeServer, closeServer } = require('../server');


describe("Run tests", () => {
  before( () => {
    makeServer();
    });
  describe('Get all messages.', () => { 
    it('should return one message', (done) => {
      superagent.get(url + 'getall', (err, res) => {
        if(err) {done(err)}
        const message = res.body[0].message
        const status = res.body[0].status
        assert.equal(message ,"This is a simple message!")
        assert.equal(status ,"unread")
        done()
      })
        
    })
  })
  
describe('Post "Hello"', () => {
  it('Should post the message', async () => {
    const res = await superagent.post(url + 'save')
    .send({message: "Hello", status: "unread"})
    
    assert.equal(res.statusCode, "200")
    
  })
})

describe('Get all messages', () => {
  it('should return two messages', (done) => {
    superagent.get(url + 'getall', (err, res) => {
      if(err) {done(err)}
      assert.equal(res.body.length, 2)
      
      done()
    })
  })
})

  describe('Changing status code of first message', () => {
    it('Should change the status to "read"', (done) => {
      superagent.post(url + 'flag')
      .send({id: "6156c2a539b69bed2864fbdd", status: "read"})
      .then((res) => {
        if(res.statusCode == 200)
        {
          done();
        }
      })
      .catch((err) => {
        done(err.status);
      })
    
    })
  })

  describe('Changing status code of first message', () => {
    it('Should change the status to "unread"', (done) => {
      superagent.post(url + 'flag')
      .send({id: "6156c2a539b69bed2864fbdd", status: "unread"})
      .then((res) => {
        if(res.statusCode == 200)
        {
          done();
        }
      })
      .catch((err) => {
        done(err.status);
      })
    })
  })


  // describe('Get one specific message', () => {
  //   it('Should return the desired message', () => {
  //     superagent.get(url + 'get/?id=6156c2a539b69bed2864fbdd', (err, res) => {
  //       //if(err) {console.log(err)}
  //       const message = res.body[0].message
  //       const status = res.body[0].status
  //       assert.equal(res.statusCode, 200)
  //       assert.equal(message, "This is a simple message!")
  //       assert.equal(status, "unread")
  //     })
  //   })
  // })

  ////////////// 405 error
  describe('405 error', () => {
    it('should return statuscode 405', (done) => {
      superagent.post(url + "get", function(err, res) {
          assert.equal(res.statusCode, 405)
        done();
      })
    })
  })

  describe('Trying to use wrong method "Get" to save a new message', () => {
    it('should return statuscode 405', (done) => {
      superagent.get(url + "save")
      .catch((err)=>{
        if(err.status == 405){
          done()
        }
        else{
          done(new Error("Got statuscode " + err.status))
        }
      })
    })
  })

  describe('Trying to use wrong method "Post" to get all messages.', () => {
    it('should return statuscode 405', (done) => {
      superagent.post(url + "getall")
      .catch((err)=>{
        //console.log(err.status)
        if(err.status == 405){
          done()
        }
        else{
          done(new Error("Got statuscode " + err.status))
        }
      })
    })
  })

  describe('405 error', () => {
    it('should return statuscode 405', (done) => {
      superagent.get(url + "flag", function(err, res) {
          assert.equal(res.statusCode, 405)
        done();
      })
    })
  })
  /////////////////////////


  /////////////// Error 404
  describe('Trying to reach /lol with a get method', () => {
    it('should return statuscode 404', (done) => {
      superagent.get(url + "/lol", function(err, res) {
        assert.equal(res.statusCode, 404)
        done();
      })
    })
  })

  describe('Trying to reach /bruh with a post method', () => {
    it('should return statuscode 404', () => {
      superagent.post(url + "/bruh")
      .send({id: "614d81f463694fd02f99ef1d", status: "read"})
      .end((err, res) =>{
          assert.equal(err.status, 404);
      })
    })
  })

  ////////////// Error 400
  describe('Changing status code of a message that does NOT exist.', () => {
    it('Should return 400 error', async () => {
      const res = await superagent.post(url + 'flag')
      .send({id: "61424edbae0a291a8c3fd359", status: "unread"})
      .catch((err) => {
        assert.equal(err.status, 400)
      })
    })
  })

  describe("Trying to change an invalid status code of a message.", () => {
    it('Should return 400 error', async () => {
      await superagent.post(url + 'flag')
      .send({id: "614d81f463694fd02f99ef1d", status: "lol"})
      .catch((err) => {
        assert.equal(err.status, 400)
      })
    })
  })


describe('Trying to post an empty message.', () => {
  it('Should return 400 error', async () => {
    await superagent.post(url + 'save')
     .send({message: "", status: "unread"})
     .catch((err) => {
       assert.equal(err.status, 400)
     })
  })
})

describe('Trying to post a message with an invalid status.', () => {
  it('Should return 400 error', async () => {
      await superagent.post(url + 'save')
     .send({message: "This is a message.", status: "lol"})
     .catch((err) => {
       assert.equal(err.status, 400)
     })
  })
})

describe('Trying to post a message with more than 140 characters.', () => {
  it('Should return 400 error', async () => {
     await superagent.post(url + 'save')
     .send({message: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.", status: "unread"})
     .catch((err) => {
        assert.equal(err.status, 400)
     })
  })
})

describe('Trying to get a message with an invalid ID.', () => {
  it('Should return 400 error', () => {
    superagent.get(url + 'get?id=61424edbae0a291a8c3fd358', (res, err) => {
        assert.equal(res.status, 400)
    })
  })
})
after( () => {
  closeServer();
  }); 

})