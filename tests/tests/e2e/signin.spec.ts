import { test, expect } from '@playwright/test';

test('E2E - login com erro e depois sucesso', async ({ page }) => {
  await page.goto('http://localhost:3000/signin');

  const emailInput = page.getByPlaceholder('seu@email.com');
  const passwordInput = page.getByPlaceholder('••••••••');

  // 1. Tenta fazer o login inválido (Com Retry automático do Playwright)
  await expect(async () => {
   
    await emailInput.clear();
    await emailInput.fill('invalido@test.com');
    
    await passwordInput.clear();
    await passwordInput.fill('Abc@99999');
    
    await page.locator('form button[type="submit"]').click();

    await expect(
      page.getByText(/Erro ao fazer login|Credenciais inválidas/)
    ).toBeVisible();
  }).toPass({ timeout: 15000 }); // Dá até 15 segundos para ele tentar e conseguir

  // 2. Cria o usuário válido via API (rápido e isolado)
  const email = `user${Date.now()}@test.com`;
  
  await page.request.post('http://localhost:8080/auth/signup', {
    data: {
      email,
      password: 'Abc@12345',
    },
  });

  await expect(async () => {
    await emailInput.clear();
    await emailInput.fill(email);
    
    await passwordInput.clear();
    await passwordInput.fill('Abc@12345');
    
    await page.locator('form button[type="submit"]').click();

    // O teste só sai do loop e passa quando a URL realmente mudar
    await expect(page).toHaveURL('http://localhost:3000/');
  }).toPass({ timeout: 15000 });
});