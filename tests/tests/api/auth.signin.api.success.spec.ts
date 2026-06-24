import { test, expect } from '@playwright/test';

test('API - signin sucesso', async ({ request }) => {

  const email = `login${Date.now()}@test.com`;

  await request.post('http://localhost:8080/auth/signup', {
    data: { email, password: 'Abc@12345' },
  });

  const res = await request.post('http://localhost:8080/auth/signin', {
    data: { email, password: 'Abc@12345' },
  });

  expect(res.status()).toBe(200);
});

