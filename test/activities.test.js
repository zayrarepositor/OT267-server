/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */

const chai = require('chai');

const chaiHttp = require('chai-http');

const { expect } = require('chai');

const app = require('../app');

// Para que chai use el chai-http
chai.should();
chai.use(chaiHttp);

// Token para los tests.
/* const adminToken = process.env.TEST_ADMIN_TOKEN; */

// eslint-disable-next-line no-undef
describe('ACTIVITIES ENDPOINT', () => {
  let adminToken = '';
  let adminId = 0;
  let activityId = 0;

  before('Admin register', (done) => {
    const adminRequest = {
      firstName: 'AdminUser',
      lastName: 'lastName',
      email: 'activitiesAdminUser@gmail.com',
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

  describe('#Get activities, GET /activities', () => {
    // Test auth
    it('Should return and error for not auth user or admin', (done) => {
      chai.request(app)
        .get('/activities')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
    });

    // getAllActivities
    it('Should return the list of activities', (done) => {
      chai
        .request(app)
        .get('/activities')
        .set({ Authorization: adminToken })
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('message').equal('list of all activities');
          expect(res.body.data).to.be.a('array');
          done();
        });
    });
  });

  describe('#Create activities POST /activities', () => {
    it('Should return an error for not auth user or admin', (done) => {
      chai.request(app)
        .post('/activities')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
    });

    // createActivity
    it('Should create a new activity', (done) => {
      chai
        .request(app)
        .post('/activities')
        .set({ Authorization: adminToken })
        .field('name', 'Test activity')
        .field('content', 'Test of content')
        .attach('image', './test/img-test/activity.png', 'activity.png')
        .end((error, res) => {
          expect(error).to.have.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('data');
          expect(res.body)
            .to.have.property('message')
            .equal('activity created');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data).to.have.property('name');
          expect(res.body.data).to.have.property('content');
          expect(res.body.data).to.have.property('image');
          activityId = res.body.data.id;

          done();
        });
    });
  });

  describe('#Update activities PUTT /activities/:id', () => {
    it('Should return an error for not auth user or admin', (done) => {
      chai.request(app)
        .put(`/activities/${activityId}`)
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(401);
          done();
        });
    });

    it('Should update an activity using id', (done) => {
      chai.request(app)
        .put(`/activities/${activityId}`)
        .set({ Authorization: adminToken })
        .field('name', 'Nuevo nombre de la actividad')
        .field('content', 'Contenido actualizado de la actividad')
        .attach('image', './test/img-test/activity.png', 'activity.png')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('message').equal('activity updated');
          expect(res.body).to.have.property('data');
          done();
        });
    });

    it('Should return and error for update with not exists id', (done) => {
      chai.request(app)
        .put('/activities/10000000')
        .set({ Authorization: adminToken })
        .field('name', 'Nuevo nombre de la actividad')
        .field('content', 'Contenido actualizado de la actividad')
        .attach('image', './test/img-test/activity.png', 'activity.png')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(404);
          expect(res.text).to.be.equal('activity not found');
          done();
        });
    });

    it('Should return and error for update with not numeric id', (done) => {
      chai.request(app)
        .put('/activities/1s')
        .set({ Authorization: adminToken })
        .field('name', 'Nuevo nombre de la actividad')
        .field('content', 'Contenido actualizado de la actividad')
        .attach('image', './test/img-test/activity.png', 'activity.png')
        .end((error, res) => {
          expect(error).to.be.null;
          expect(res).to.have.status(500);
          done();
        });
    });
  });

  after('Activity cleaning', (done) => {
    chai.request(app)
      .delete(`/activities/${activityId}`)
      .set('authorization', adminToken)
      .end((err, response) => {
        const { status } = response;
        console.log('🧹 ACTIVITY DELETE STATUS =>', status);
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
