import { test, expect } from '@playwright/test';

test('E2E - criar conta com sucesso e ir para home', async ({ page }) => {
  const email = `user${Date.now()}@test.com`;
  const password = 'Abc@12345';

  await page.goto('http://localhost:3000/signup');

  const emailInput = page.getByPlaceholder('seu@email.com');
  const passwordInput = page.getByPlaceholder('••••••••').first();
  const confirmPasswordInput = page.getByPlaceholder('••••••••').last();

  await expect(async () => {
    
    await emailInput.clear();
    await emailInput.fill(email);

    await passwordInput.clear();
    await passwordInput.fill(password);

    await confirmPasswordInput.clear();
    await confirmPasswordInput.fill(password);

    // Clica no botão do formulário
    await page.locator('form button[type="submit"]').click();

    // Se o WebKit falhar na digitação, essa validação falha e o bloco todo recomeça!
    await expect(page).toHaveURL('http://localhost:3000/');
  }).toPass({ timeout: 15000 });
});