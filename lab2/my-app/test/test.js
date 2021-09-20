const assert = require('assert')
const should = require('should')
const superagent = require('superagent')


/* describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      assert.equal([1, 2, 3].indexOf(4), -1)
}) })
}) */


superagent
  .post('http://localhost:3000/save')
  .send({ message: 'Hello World!', status: 'unread' })
  .set('accept', 'json')
  .end((err, res) => {
    // kontrollera resultat
})

superagent.post('http://localhost:3000/save').then(console.log).catch(console.error);
