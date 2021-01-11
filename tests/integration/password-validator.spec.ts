import express from 'express';
import request from 'supertest';

import passwordValidatorRouter from '@infra/http/routes/passwordValidator.routes';

const app = express();
app.use(express.json());
app.use(passwordValidatorRouter);

describe('Password Validator endpoints', () => {
  it('should be able to validate a valid password', async () => {
    const { body } = await request(app).post('/validate').type('json').send({
      password: 'AbCd123456789!',
    });

    expect(body).toBe(true);
  });

  it('should be able to validate an invalid password', async () => {
    const { body } = await request(app).post('/validate').type('json').send({
      password: 'AC156789!',
    });

    expect(body).toBe(false);
  });

  it('should be thrown an error when password is not given', async () => {
    await request(app).post('/validate').type('json').expect(400);
    await request(app)
      .post('/validate')
      .type('json')
      .send({ password: null })
      .expect(400);
    await request(app).post('/validate').type('json').send({}).expect(400);
  });
});
