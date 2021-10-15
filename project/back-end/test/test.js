const assert = require('assert')
const superagent = require('superagent');
const should = require('should');
const { makeServer, closeServer } = require('../bin/server.js');
const jsSHA = require("jssha");
const e = require('express');
const io = require('socket.io-client');
const { resolve } = require('path');
const { ServerClosedEvent } = require('mongodb');




const url = "http://localhost:3000/";
let hashObj = new jsSHA("SHA-512", "TEXT", {numRounds: 1})
hashObj.update("12345678")
let loggedInID = null


describe("Running tests", async () => {

    before((done) => {
      makeServer();
      done()
      });
    describe('Testing login/out functionality', () => {
      

      describe('Trying to login to "hadi123".', () => {
        it('Should return a loggedInID and username', async () => {
          let res =  await superagent.post(url + 'login')
              .send({"username": "hadi123", "password": hashObj.getHash("HEX")})
              loggedInID = res.body.loggedInID
              assert.equal(res.body.username, "hadi123")
          })
        })
        describe('Trying to logout from "hadi123"', () => { 
          it('Should logout with a confirmation message', async () => {
            let res =  await superagent.post(url + 'logout')
                .send({"myUsername": "hadi123", "loggedInID": loggedInID})

                assert.equal(res.body.acknowledged, true)
            })
            
          })
      describe('Trying to login to "ismail1".', () => {
        it('Should return a loggedInID and username', async () => {
          let res =  await superagent.post(url + 'login')
              .send({"username": "ismail1", "password": hashObj.getHash("HEX")})
              loggedInID = res.body.loggedInID
              assert.equal(res.body.username, "ismail1")
          })
        })
        describe('Trying to logout from "ismail1"', () => { 
          it('Should logout with a confirmation message', async () => {
            let res =  await superagent.post(url + 'logout')
                .send({"myUsername": "ismail1", "loggedInID": loggedInID})

                assert.equal(res.body.acknowledged, true)
                assert.equal(res.body.matchedCount, true)
                assert.equal(res.body.modifiedCount, true)
            })
            
          })
      })

    describe('Testing sign-up functionality', () => {
      describe('Trying to sign up', () => {
        it('Should create an account with username "spicy_rice"', async () => {
        let res = await superagent.post(url + 'signup')
        .send({"firstname": "Hadi", "lastname": "Ansari", "email": "hadi.ansari@yahoo.com", "username": "spicy_rice", "password": hashObj.getHash("HEX")})    
        loggedInID = res.body.loggedInID
        assert.equal(res.body.username, "spicy_rice")
        })
      })

      describe('Trying to delete', () => {
        it('Should delete the account with username "spicy_rice"', async () => {
          let res = await superagent.post(url + 'deleteaccount')
          .send({"myUsername": "spicy_rice", "myPassword": hashObj.getHash("HEX"), "loggedInID": loggedInID})    
          assert.equal(res.body.acknowledged, true)
          assert.equal(res.body.deletedCount, 1)
        })
      })

    })


    describe('Testing Search functionality', () => {
      describe('Trying to find "ismail1" from user "oskar1" which is not already friend with "ismail1"', () =>{
        it('Should find a specific user', async () =>{
          
          let res = await superagent.post(url + 'login')
          .send({"username": "oskar1", "password": hashObj.getHash("HEX")})
          loggedInID = res.body.loggedInID
          
          let res2 = await superagent.post(url + 'finduser')
          .send({"myUsername": "oskar1", "loggedInID": loggedInID, "user": "ismail"})
          assert.equal(res2.body.length, 1)
          assert.equal(res2.body[0].firstname, "Ismail")
          assert.equal(res2.body[0].lastname, "Safwat")
          
        })
      })
    })

    describe('Testing Friend page functionality', () => {
      describe('Trying to display profile of "ismail1" via "hadi123"', () =>{
        it('Should return "hadi123" posts', async () =>{
          let res = await superagent.post(url + 'login')
          .send({"username": "hadi123", "password": hashObj.getHash("HEX")})

          loggedInID = res.body.loggedInID

          let res2 = await superagent.post(url + 'friendprofile')
          .send({"myUsername": "hadi123", "loggedInID": loggedInID, "friendUsername": "ismail1"})

          
  
          assert.equal(res2.body.posts.length, 3)
        })
      })
    })

    describe('Testing request (send, accept and ignore) functionalities.', () => {
      evaLoggedInID = null
      thomasLoggedInID = null
      describe('Creating two users with usernames "user1" and "user2".', () => {
        it('Should create two account with usernames "user1" and "user2".', async() => {
          let res1 = await superagent.post(url + 'signup')
          .send({"firstname": "Eva", "lastname": "Andersson", "email": "eva@telia.com", "username": "user1", "password": hashObj.getHash("HEX")}) 
          let res2 = await superagent.post(url + "signup")
          .send({"firstname": "Thomas", "lastname": "Andersson", "email": "thomas@telia.com", "username": "user2", "password": hashObj.getHash("HEX")})
          evaLoggedInID = res1.body.loggedInID
          thomasLoggedInID = res2.body.loggedInID

          assert.equal(res1.body.username, "user1")
          assert.equal(res2.body.username, "user2")
        })
      })
      describe('Sending friend-request from "user2" to "user1"', () => {
        it('Should successfully send reqest from "user2" to "user1"', async () => {

        let res = await superagent.post(url + 'sendrequest')
        .send({"myUsername": "user2", "loggedInID": thomasLoggedInID, "otherFirstname": "Eva", "otherLastname": "Andersson", "otherUsername": "user1"}) 
        
        assert.equal(res.statusCode, 200)
        })
      })
      describe('Ignoring friend-request from "user2"', () => {
        it('Should successfully ignore reqest from "user2".', async () => {

        let res = await superagent.post(url + 'ignorerequest')
        .send({"myUsername": "user1", "loggedInID": evaLoggedInID, "otherFirstname": "Thomas", "otherLastname": "Andersson", "otherUsername": "user2"}) 
        assert.equal(res.statusCode, 200)
        })
      })
      describe('Sending friend-request from "user2" to "user1" ONCE AGAIN!', () => {
        it('Should successfully send reqest from "user2" to "user1"', async () => {

        let res = await superagent.post(url + 'sendrequest')
        .send({"myUsername": "user2", "loggedInID": thomasLoggedInID, "otherFirstname": "Eva", "otherLastname": "Andersson", "otherUsername": "user1"}) 
        
        assert.equal(res.statusCode, 200)
        })
      })
      describe('Accepting friend-request from "user2"', () => {
        it('Should successfully accept reqest from "user2".', async () => {

        let res = await superagent.post(url + 'acceptrequest')
        .send({"myUsername": "user1", "loggedInID": evaLoggedInID, "otherFirstname": "Thomas", "otherLastname": "Andersson", "otherUsername": "user2"}) 
        assert.equal(res.statusCode, 200)
        })
      })
      describe('Deleting users with usernames "user1" and "user2".', () => {
        it('Should delete accounts with usernames "user1" and "user2".', async() => {
          let res1 = await superagent.post(url + 'deleteaccount')
            .send({"myUsername": "user1", "myPassword": hashObj.getHash("HEX"), "loggedInID": evaLoggedInID}) 
          let res2 = await superagent.post(url + 'deleteaccount')
            .send({"myUsername": "user2", "myPassword": hashObj.getHash("HEX"), "loggedInID": thomasLoggedInID})
  
          assert.equal(res1.body.acknowledged, true)
          assert.equal(res1.body.deletedCount, 1)
          assert.equal(res2.body.acknowledged, true)
          assert.equal(res2.body.deletedCount, 1)
        })
      })

    })

    describe('Testing friend-requests, show-friend, show-post, write-post and my-profile.', () => {
      evaLoggedInID = null
      thomasLoggedInID = null
      describe('Creating two users with usernames "user1" and "user2".', () => {
        it('Should create two account with usernames "user1" and "user2".', async() => {
          let res1 = await superagent.post(url + 'signup')
          .send({"firstname": "Eva", "lastname": "Andersson", "email": "eva@telia.com", "username": "user1", "password": hashObj.getHash("HEX")}) 
          let res2 = await superagent.post(url + "signup")
          .send({"firstname": "Thomas", "lastname": "Andersson", "email": "thomas@telia.com", "username": "user2", "password": hashObj.getHash("HEX")})
          evaLoggedInID = res1.body.loggedInID
          thomasLoggedInID = res2.body.loggedInID

          assert.equal(res1.body.username, "user1")
          assert.equal(res2.body.username, "user2")
        })
      })
      describe('Sending friend-request from "user2" to "user1"', () => {
        it('Should successfully send reqest from "user2" to "user1"', async () => {

        let res = await superagent.post(url + 'sendrequest')
        .send({"myUsername": "user2", "loggedInID": thomasLoggedInID, "otherFirstname": "Eva", "otherLastname": "Andersson", "otherUsername": "user1"}) 
        
        assert.equal(res.statusCode, 200)
        })
      })
      describe('Trying to get "user1"\'s friend-requests.', () => {
        it('Should show "user1"\'s friend-requests with one user in it.', async () => {
          let res = await superagent.post(url + 'friendrequests')
          .send({"myUsername": "user1", "loggedInID": evaLoggedInID}) 
          assert.equal(res.statusCode, 200)
          assert.equal(res.body.length, 1)
          assert.equal(res.body[0].username, "user2")
        })
      })
      describe('Accepting friend-request from "user2"', () => {
        it('Should successfully accept request from "user2".', async () => {

        let res = await superagent.post(url + 'acceptrequest')
        .send({"myUsername": "user1", "loggedInID": evaLoggedInID, "otherFirstname": "Thomas", "otherLastname": "Andersson", "otherUsername": "user2"}) 
        assert.equal(res.statusCode, 200)
        })
      })
      describe('Trying to show "user1"\'s and "user2"\'s friend list', () => {
        it('Should successfully show ONE friend for "user1" and "user2".', async () => {

        let res1 = await superagent.post(url + 'showfriends')
        .send({"myUsername": "user1", "loggedInID": evaLoggedInID })
        let res2 = await superagent.post(url + 'showfriends')
        .send({"myUsername": "user2", "loggedInID": thomasLoggedInID })
        
        assert.equal(res1.statusCode, 200)
        assert.equal(res1.body.length, 1)

        assert.equal(res2.statusCode, 200)
        assert.equal(res2.body.length, 1)
        
        })
      })
      describe('Posting on "user2"\'s page from "user1"', () => {
        it('Should successfully post on "user2"\'s wall.', async () => {

        let res = await superagent.post(url + 'writepost')
        .send({"myUsername": "user1", "loggedInID": evaLoggedInID, "destUsername": "user2", "message": "Hi Baby!"})
        assert.equal(res.statusCode, 200)
        assert.equal(res.body.ownerUsername, "user1")
        assert.equal(res.body.body, "Hi Baby!")
        })
      })
      describe('"user2"\' posting on his own wall', () => {
        it('Should successfully post on "user2"\'s wall.', async () => {

        let res = await superagent.post(url + 'writepost')
        .send({"myUsername": "user2", "loggedInID": thomasLoggedInID, "destUsername": "user2", "message": "Hi Darling!"}) 
        assert.equal(res.statusCode, 200)
        assert.equal(res.body.ownerUsername, "user2")
        assert.equal(res.body.body, "Hi Darling!")
        })
      })
      describe('Trying to see "user2"\'s post', () => {
        it('Should has two post.', async () => {

        let res = await superagent.post(url + 'showposts')
        .send({"myUsername": "user2", "loggedInID": thomasLoggedInID, "destUsername": "user2"}) 
        assert.equal(res.statusCode, 200)
        assert.equal(res.body.length, 2)
        })
      })
      describe('Trying to see "user2"\'s profile', () => {
        it('Should return an object with all "user2"\'s details.', async () => {

        let res = await superagent.post(url + 'myprofile')
        .send({"myUsername": "user2", "loggedInID": thomasLoggedInID})
        
        assert.equal(res.statusCode, 200)
        assert.equal(res.body.username, "user2")
        assert.equal(res.body.posts.length, 2)
        assert.equal(res.body.friends.length, 1)
        assert.equal(res.body.receivedRequests, 0)
        assert.equal(res.body.sendRequests, 0)
        })
      })
      describe('Deleting users with usernames "user1" and "user2".', () => {
        it('Should delete accounts with usernames "user1" and "user2".', async() => {
          let res1 = await superagent.post(url + 'deleteaccount')
            .send({"myUsername": "user1", "myPassword": hashObj.getHash("HEX"), "loggedInID": evaLoggedInID}) 
          let res2 = await superagent.post(url + 'deleteaccount')
            .send({"myUsername": "user2", "myPassword": hashObj.getHash("HEX"), "loggedInID": thomasLoggedInID})
  
          assert.equal(res1.body.acknowledged, true)
          assert.equal(res1.body.deletedCount, 1)
          assert.equal(res2.body.acknowledged, true)
          assert.equal(res2.body.deletedCount, 1)
        })
      })

    })
  after( () => {
      closeServer();
    });
})
describe("Running chat test", async () => {

  before((done) => {
    makeServer();
    done()
    });
    describe('Testing chat functionality', () => {
      describe('Trying to send a "Hello" message from "user1" to "user2"', () => {
        it('Should successfully send a message from "user1" to "user2".', async () => {
          room = "user2user1"
          let socketEva = io.connect(url)
          let socketThomas = io.connect(url)


          socketEva.emit("join-room", room)
          socketThomas.emit("join-room", room)
          socketEva.emit("chat message", "Hi Baby!", room)
          socketThomas.once("chat message", msg => {
            socketThomas.disconnect()
            socketEva.disconnect()
            closeServer();
            assert.equal(msg, "Hi Baby!") 
          }) 
         })
          
      })
    })
})