// import { expect } from 'chai';
// import chaiHttp from 'chai-http';
// import app from '../app.js';



// describe('Notes API', () => {
//   // Test GET /notes
//   describe('GET /notes', () => {
//     it('should get all notes', (done) => {
//       chai.request(app)
//         .get('/notes')
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('array');
//           done();
//         });
//     });
//   });

//   // Test POST /notes
//   describe('POST /notes', () => {
//     it('should create a new note', (done) => {
//       const newNote = {
//         title: 'Test Note',
//         content: 'This is a test note.',
//       };

//       chai.request(app)
//         .post('/notes')
//         .send(newNote)
//         .end((err, res) => {
//           expect(res).to.have.status(200);
//           expect(res.body).to.be.an('object');
//           expect(res.body).to.have.property('title').eq('Test Note');
//           expect(res.body).to.have.property('content').eq('This is a test note.');
//           done();
//         });
//     });
//   });

//   // TODO: Add more test cases for other endpoints
// });
var assert=require('chai').assert;
const app=require('../app')
describe('BasicTest',function(){
    describe('Multiplication',function(){
        it('it shouls equal to 15',function(done){
            var result=3*5;
            assert.equal(result,15);
            done();
        });
    });
});
