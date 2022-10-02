/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
const chai = require('chai');

const chaiHttp = require('chai-http');

const { expect } = require('chai');

const server = require('../app');

chai.should();
chai.use(chaiHttp);

describe('ORGANIZATIONS ENDPOINT', () => {
  let adminToken;
  let adminId;
  before('Admin register', (done) => {
    const adminRequest = {
      firstName: 'AdminUser',
      lastName: 'lastName',
      email: 'organizationsAdminUser@mail.com',
      password: 'adminUser1',
      passwordConfirmation: 'adminUser1',
      image: 'http://adminUserImage.jpg',
      roleId: 1,
    };
    chai.request(server)
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

  describe('GET public info', () => {
    it('should bring all the info', (done) => {
      chai.request(server)
        .get('/organization/public')
        .end((err, response) => {
          const { body } = response;
          expect(err).to.not.exist;
          expect(body.message).to.exist.to.eql('organization data');
          expect(body.data).to.exist.to.be.a('object');
          expect(response).to.have.status(200);
          if (err) console.log('errors? =>', err);
          done();
        });
    });
  });
  describe('POST organizations', () => {
    it('should send an error if about text is too short', (done) => {
      chai.request(server)
        .post('/organization/public')
        .set('Authorization', `${adminToken}`)
        .send({
          aboutUsText: 'Trabajamos todos los días',
        })
        .end((err, response) => {
          const { body } = response;
          expect(body.errors).to.exist;
          expect(body.data).to.not.exist;
          expect(response).to.have.status(403);
          if (err) console.log('errors? =>', err);
          done();
        });
    });
    it('should send an error if the token is wrong', (done) => {
      chai.request(server)
        .post('/organization/public')
        .set('Authorization', `${adminToken}a`)
        .send({
          name: 'Somos Más',
          image: 'somosmas.jpg',
        })
        .end((err, response) => {
          expect(response).to.have.status(401);
          expect(response.text).to.eql('unauthorized: id is required');
          if (err) console.log('errors? =>', err);
          done();
        });
    });

    it('should update the organization', (done) => {
      chai.request(server)
        .post('/organization/public')
        .set('Authorization', `${adminToken}`)
        .send({
          image: 'somosmas.jpg',
          address: 'San Luis, Buenos Aires',
          welcomeText: 'Este es un texto de bienvenida.',
        })
        .end((err, response) => {
          const { body } = response;
          expect(body.errors).to.not.exist;
          expect(body.message).to.exist.to.eql('organization data updated');
          expect(body.data).to.exist.to.be.a('object');
          expect(response).to.have.status(201);
          if (err) console.log('errors? =>', err);
          done();
        });
    });
  });
  after('Admin cleaning', (done) => {
    chai.request(server)
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
