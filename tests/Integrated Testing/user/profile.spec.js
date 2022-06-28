const request = require('supertest')
const app = require("../../../app")
const { Auth }= require('../../../models')
require("../../../controllers/profile")

describe('GET /api/v1/user/profile', () => {
    beforeAll(async () => {
        await request(app).post('/api/v1/auth/register').send({ name: 'Second Hand Test', email: 'luthfiyah.sakinah19@mail.com', password: '@Luthfiyahsakinah1907' });
        const login = await request(app).post('/api/v1/auth/login').send({ email: 'luthfiyah.sakinah19@mail.com', password: '@Luthfiyahsakinah1907' });
        gettoken = login.res.rawHeaders[7];
        let result = gettoken.slice(6);
        const finalresult = result.replace('; Path=/', '');
        token = finalresult;
    });

    afterAll(async () => {
        try { 
            //await request(app).get('/api/v1/auth/logout').set('Authorization',`Bearer ${token}`)
          } catch (error) { 
            console.log(error) 
          }
    });

    it('200 OK', async () => {
    const res = await request(app)
      .get('/api/v1/user/profile')
      .set('Authorization',`Bearer ${token}`)
    expect(res.statusCode).toEqual(200)
    expect(res.body.message).toEqual('Profil ditemukan')  
    })
    it('401 unauthoreized', async () => {
    const res = await request(app)
      .get('/api/v1/user/profile')
    expect(res.statusCode).toEqual(401)
    expect(res.body.message).toEqual('Tidak memiliki token')  
  })
})

describe('GET /api/v1/user/profile', () => {
  beforeAll(async () => {
      await request(app).post('/api/v1/auth/register').send({ name: 'Second Hand Test', email: 'luthfiyah.sakinah19@mail.com', password: '@Luthfiyahsakinah1907' });
      const login = await request(app).post('/api/v1/auth/login').send({ email: 'luthfiyah.sakinah19@mail.com', password: '@Luthfiyahsakinah1907' });
      gettoken = login.res.rawHeaders[7];
      let result = gettoken.slice(6);
      const finalresult = result.replace('; Path=/', '');
      token = finalresult;
  });

  afterAll(async () => {
      try { 
          //await request(app).get('/api/v1/auth/logout').set('Authorization',`Bearer ${token}`)
        } catch (error) { 
          console.log(error) 
        }
  });

  //  it('200 OK', async () => {
  //  const res = await request(app)
  //   .put('/api/v1/user/profile')
  //   .set('Authorization',`Bearer ${token}`)
  //   .send({
  //     userId: 1,
  //     name: 'John Doe',
  //     phoneNumber: '081234567890',
  //     cityId: 1,
  //     address: 'Jl. Kebon Jeruk No. 1'
  //   })
  //   console.log(res)
  // expect(res.statusCode).toEqual(200)
  // expect(res.body.message).toEqual('Profil berhasil diperbarui')  
  // })
  it('400 Bad Request', async () => {
    const res = await request(app)
      .put('/api/v1/user/profile')
      .set('Authorization',`Bearer ${token}`)
      .send({
        phoneNumber: '',
        cityId: 1,
        address: 'Jl. Kebon Jeruk No. 1'
      })
    expect(res.statusCode).toEqual(400)
    expect(res.body.message).toEqual('Kesalahan validasi')  
    })

    it('401 unauthoreized', async () => {
      const res = await request(app)
        .put('/api/v1/user/profile')
        .send({
          name: 'John Doe',
          phoneNumber: '081234567890',
          cityId: 1,
          address: 'Jl. Kebon Jeruk No. 1'
        })
      expect(res.statusCode).toEqual(401)
      expect(res.body.message).toEqual('Tidak memiliki token')  
      })

})