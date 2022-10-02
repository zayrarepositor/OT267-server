/* eslint-disable no-console */
/* eslint-disable no-undef */

const chai = require('chai');

const chaiHttp = require('chai-http');

const { expect } = require('chai');

const app = require('../index');

chai.use(chaiHttp);
chai.use(chaiHttp);

describe('NEWS TEST', () => {
  let adminToken = '';
  let adminId = 0;
  let newsId = 0;

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
  describe('GET /news', () => {
    it('expected error for not sending token', (done) => {
      chai.request(app)
        .get('/news')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('expected return list of all news', (done) => {
      chai.request(app)
        .get('/news')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('message').to.equals('list of all news');
          done();
        });
    });
  });

  describe('GET /news/:id', () => {
    it('expected error for not sending token', (done) => {
      chai.request(app)
        .get('/news/1')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('expected news detail', (done) => {
      chai.request(app)
        .get('/news/1')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('message').to.equals('news detail');
          done();
        });
    });

    it('expected not found error when param does not exist', (done) => {
      chai.request(app)
        .get('/news/999')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.forbidden).to.be.equal(true);
          done();
        });
    });

    it('expected not found error when param is not a number', (done) => {
      chai.request(app)
        .get('/news/abc')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.forbidden).to.be.equal(true);
          done();
        });
    });
  });

  describe('GET /news/:id/comments', () => {
    it('expected error for not sending token', (done) => {
      chai.request(app)
        .get('/news')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('expected news detail with comments', (done) => {
      chai.request(app)
        .get('/news/1/comments')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('message').to.equals('list of all comments from news 1');
          done();
        });
    });

    it('expected not found error', (done) => {
      chai.request(app)
        .get('/news/999/comments')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.text).to.be.equal('news not found');
          done();
        });
    });

    it('expected not found error', (done) => {
      chai.request(app)
        .get('/news/abc/comments')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(404);
          expect(res.text).to.be.equal('news not found');
          done();
        });
    });
  });

  describe('POST /news', () => {
    it('expected error for not sending token', (done) => {
      chai.request(app)
        .post('/news')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('expected success with status 201 (news created)', (done) => {
      chai.request(app)
        .post('/news')
        .set({ Authorization: adminToken })
        .field('name', 'Test News Name')
        .field('content', 'Test News Content')
        .field('categoryId', 2)
        .attach('image', './test/imgTest/news.PNG', 'news.PNG')
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('message').to.equals('news created');
          newsId = res.body.data.id;
          done();
        });
    });

    it('expected error with status 403 (no image file)', (done) => {
      chai.request(app)
        .post('/news')
        .set({ Authorization: adminToken })
        .field('name', 'Name 5')
        .field('content', 'content 5')
        .field('categoryId', 2)
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors[0]).to.have.property('msg').to.equals('Ingrese un archivo de imagen');
          done();
        });
    });

    it('expected error with status 403 (name value is empty)', (done) => {
      chai.request(app)
        .post('/news')
        .set({ Authorization: adminToken })
        .field('name', '')
        .field('content', 'content 5')
        .field('categoryId', 2)
        .attach('image', './test/imgTest/news.PNG', 'news.PNG')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors[0]).to.have.property('msg').to.equals('Ingrese el nombre de la novedad');
          done();
        });
    });
  });

  describe('PUT /news/id', () => {
    it('expected error for not sending token', (done) => {
      chai.request(app)
        .put(`/news/${newsId}`)
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('expected success with status 200 (news updated)', (done) => {
      chai.request(app)
        .put(`/news/${newsId}`)
        .set({ Authorization: adminToken })
        .field('name', 'New name 5 [UPDATED]')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('data');
          expect(res.body).to.have.property('message').to.equals('news updated');
          done();
        });
    });

    it('expected error with status 403 (has no body)', (done) => {
      chai.request(app)
        .put(`/news/${newsId}`)
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors[0]).to.have.property('msg').to.equals('No hay campos para actualizar');
          done();
        });
    });

    it('expected error with status 403 (no category exist)', (done) => {
      chai.request(app)
        .put(`/news/${newsId}`)
        .set({ Authorization: adminToken })
        .field('categoryId', '999')
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body).to.have.property('errors');
          expect(res.body.errors[0]).to.have.property('msg').to.equals('La categoria no existe');
          done();
        });
    });
  });

  describe('DELETE /news/id', () => {
    it('expected error for not sending token', (done) => {
      chai.request(app)
        .delete('/news/1')
        .end((err, res) => {
          expect(res).to.have.status(401);
          done();
        });
    });

    it('expected success with status 200 (news deleted)', (done) => {
      chai.request(app)
        .delete(`/news/${newsId}`)
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equals('news deleted');
          done();
        });
    });

    it('expected error with status 403 (news not found)', (done) => {
      chai.request(app)
        .delete('/news/999')
        .set({ Authorization: adminToken })
        .end((err, res) => {
          expect(res).to.have.status(403);
          expect(res.body.errors[0]).to.have.property('msg').to.equals('La novedad no existe');
          done();
        });
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
