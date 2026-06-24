import { test, expect } from '@playwright/test';

test('API - signup sucesso', async ({ request }) => {
  const res = await request.post('http://localhost:8080/auth/signup', {
    data: {
      email: `user${Date.now()}@test.com`,
      password: 'Abc@12345',
    },
  });

  expect(res.status()).toBe(200);
});

