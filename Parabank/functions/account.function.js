const { expect } = require('@playwright/test');
import {pause} from './global.function'
const { faker } = require('@faker-js/faker');
export async function registerUser(page,credential){

    await page.locator('[id="customer\\.firstName"]').click();
    await page.locator('[id="customer\\.firstName"]').fill(faker.person.firstName());
    await page.locator('[id="customer\\.lastName"]').click();
    await page.locator('[id="customer\\.lastName"]').fill(faker.person.lastName());
    await page.locator('[id="customer\\.address\\.street"]').click();
    await page.locator('[id="customer\\.address\\.street"]').fill(faker.location.streetAddress());
    await page.locator('[id="customer\\.address\\.city"]').click();
    await page.locator('[id="customer\\.address\\.city"]').fill(faker.location.city());
    await page.locator('[id="customer\\.address\\.state"]').click();
    await page.locator('[id="customer\\.address\\.state"]').fill(faker.location.state());
    await page.locator('[id="customer\\.address\\.zipCode"]').fill(faker.location.zipCode());
    await page.locator('[id="customer\\.phoneNumber"]').fill(faker.string.numeric(10));
    await page.locator('[id="customer\\.ssn"]').click();
    await page.locator('[id="customer\\.ssn"]').fill(faker.string.numeric(10));
    await page.locator('[id="customer\\.username"]').click();
    await page.locator('[id="customer\\.username"]').fill(credential.userName); 
    await page.locator('[id="customer\\.password"]').click();
    await page.locator('[id="customer\\.password"]').fill(credential.password);
    await page.locator('#repeatedPassword').click();
    await page.locator('#repeatedPassword').fill(credential.password);
    await page.getByRole('button', { name: 'Register' }).click();
  
}

export async function createAccount(page,type)  {
 
  await page.getByTestId('type').selectOption(type);
  let options = await page.getByTestId('fromAccountId').locator('option').allTextContents();

  while (options.length === 0){
    await pause(500);
    options  = await page.getByTestId('fromAccountId').locator('option').allTextContents();
  }

  expect(options.length).toBeGreaterThan(0);

  await page.getByTestId('fromAccountId').selectOption(options[0]);
  await page.getByRole('button', {name: 'Open New Account'}).click();
  await expect(page.getByText('Your new account number:')).toBeVisible();

  return await page.getByTestId('newAccountId').textContent();
  
};

export async function transferFunds(page, amount) {

  await page.locator('#amount').fill(amount.toString());
  await page.getByRole('button', { name: 'Transfer' }).click();
  await expect(page.getByRole('heading', { name: 'Transfer Complete!' })).toBeVisible();
  await expect(page.getByText(`$${amount}.00 has been transferred`)).toBeVisible();
}