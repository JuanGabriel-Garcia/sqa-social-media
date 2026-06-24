import { test, expect } from '@playwright/test';

test('API - signup email duplicado retorna 409', async ({ request }) => {

  const email = `dup${Date.now()}@test.com`;

  // Primeiro cadastro - sucesso
  await request.post('http://localhost:8080/auth/signup', {
    data: { email, password: 'Abc@12345' },
  });

  // Segundo cadastro com os mesmos dados - deve retornar 409
  const res = await request.post('http://localhost:8080/auth/signup', {
    data: { email, password: 'Abc@12345' },
  });

  expect(res.status()).toBe(409);
});