/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
/* eslint-disable no-undef */

const chai = require('chai');

const chaiHttp = require('chai-http');

const { expect } = require('chai');

const app = require('../index');

chai.should();
chai.use(chaiHttp);

describe('Testing contacts endpoints', () => {
  let adminToken = '';
  let adminId = 0;
  let standardToken = '';
  let standardId = 0;
  before('Admin register', (done) => {
    const adminRequest = {
      firstName: 'AdminUser',
      lastName: 'lastName',
      email: 'testimoniesAdminUser@gmail.com',
      password: 'adminUser1',
      passwordConfirmation: 'adminUser1',
      image: 'http://adminUserImage.jpg',
      roleId: 1,
    };
    chai.request(app)
      .post('/auth/register/')
      .send(adminRequest)
      .end((err, response) => {
        const { token, user } = response.body.data;
        adminToken = token;
        adminId = user.id;
        console.log(`🔑 ADMIN ID ${adminId} CREATED`);
        if (err) { console.log('errors? =>', err); }
        done();
      });
  });
  before('Standard register', (done) => {
    const standardRequest = {
      firstName: 'StandardUser',
      lastName: 'lastName',
      email: 'testimoniesStandardUser@gmail.com',
      password: 'standardUser1',
      passwordConfirmation: 'standardUser1',
      image: 'http://standardUserImage.jpg',
      roleId: 2,
    };
    chai.request(app)
      .post('/auth/register/')
      .send(standardRequest)
      .end((err, response) => {
        const { token, user } = response.body.data;
        standardToken = token;
        standardId = user.id;
        console.log(`🔑 STANDARD ID ${standardId} CREATED`);
        if (err) { console.log('errors? =>', err); }
        done();
      });
  });
  describe('#Get contacts: GET /contacts', () => {
    // Test auth sin token
    it('Shoul return and error for not auth user, without using token', (done) => {
      chai.request(app)
        .get('/contacts')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
    });

    // Test auth con token de usuario estandar
    it('Shoul return and error for not auth user, using standar user token', (done) => {
      chai.request(app)
        .get('/contacts')
        .set({ Authorization: standardToken })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(403);
          expect(res.text).to.be.equal('forbidden: admin access is required');
          done();
        });
    });

    // Test get contacts
    it('Should return the list of contacts, using admin token', (done) => {
      chai.request(app)
        .get('/contacts')
        .set({ Authorization: adminToken })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').equal('list of all contacts');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.a('array');
          done();
        });
    });
  });

  describe('#Create contact, POST /contacts', () => {
    it('Should created new contact', (done) => {
      chai.request(app)
        .post('/contacts')
        .send({
          name: 'Test contact',
          phone: '3215452154',
          email: 'test@gmail.com',
          message: 'Test message',
        })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').equal('contact registered succesfully');
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('name');
          expect(res.body.data).to.have.property('email');
          done();
        });
    });

    it('Shoul an error for not include name property', (done) => {
      chai.request(app)
        .post('/contacts')
        .send({
          name: '',
          phone: '3215452154',
          email: 'test@gmail.com',
          message: 'Test message',
        })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('errors');
          expect(res.body).to.be.a('object');
          expect(res.body.errors).to.be.a('array');
          done();
        });
    });

    it('Shoul an error for not include email property', (done) => {
      chai.request(app)
        .post('/contacts')
        .send({
          name: 'Test contact',
          phone: '3215452154',
          email: '',
          message: 'Test message',
        })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('errors');
          expect(res.body).to.be.a('object');
          expect(res.body.errors).to.be.a('array');
          done();
        });
    });
  });
  after('Standard cleaning', (done) => {
    chai.request(app)
      .delete(`/users/${standardId}`)
      .set('authorization', adminToken)
      .end((err, response) => {
        const { status } = response;
        console.log('🧹 STANDARD USER DELETE STATUS =>', status);
        if (err) { console.log('errors? =>', err); }
        done();
      });
  });
  after('Admin cleaning', (done) => {
    chai.request(app)
      .delete(`/users/${adminId}`)
      .set('authorization', adminToken)
      .end((err, response) => {
        const { status } = response;
        console.log('🧹 ADMIN USER DELETE STATUS =>', status);
        if (err) { console.log('errors? =>', err); }
        done();
      });
  });
});
