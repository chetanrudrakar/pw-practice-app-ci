import {expect, test} from '@playwright/test'

test.beforeEach( async ({page}) =>{
  await  page.goto('/')
  await page.getByText('Forms').click();
  await page.getByText('Form Layouts').click();
 // await page.getByText('Forms').click();
})
// test(" first js test", async ({page}) =>{
//   await page.getByText('Form Layouts').click();
//  //await page.close()
  
// })

// test(" second js test", async ({page}) =>{
//   await page.getByText('Forms').click();
//   await page.getByText('Datepicker').click();
//  //await page.close()
  
// })

test.describe('test suite1',() =>{

  test.beforeEach( async ({page}) =>{
    await page.getByRole("link",{name :'Charts', exact: true}).click();
  })
  test(" first js test", async ({page}) =>{
    await page.getByText('Forms').click();
    await page.getByText('Form Layouts').click();
  
   //await page.close()
    
  })
  
  test(" second js test", async ({page}) =>{
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();
   //await page.close()
    
  })
})

// test.describe('test suite2',() =>{

//   test.beforeEach( async ({page}) =>{
//     await page.getByText('Forms').click();
//   })
//   test("first js test", async ({page}) =>{
//     await page.getByText('Form Layouts').click();
//    //await page.close()
    
//   })
  
//   test("second js test", async ({page}) =>{
//     await page.getByText('Forms').click();
//     await page.getByText('Datepicker').click();
//    //await page.close()
    
//   })
// })

test("Locator syntax rules", async({page})=>{

  //Bytag name
 await page.locator('input').first().click()

  //by Id
 await page.locator('#inputEmail1').click()

 //by class vlaue
 await page.locator('.shape-rectangle').first().click()

 //By attribute
 await page.locator('[placeholder="Password"]').first().click()

 //by Class value full
 //await page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]').click()

 //Combine different locators
await page.locator('input[placeholder="Email"]').first().click()

//Xpath (Not recommended by playwright) instead playwright supports to use user facing locators
 page.locator('//*[@id="inputEmail1"]')

 //By partial text
 await page.locator(':text("Using")').click();

 //By exact text
 await page.locator(':text-is("Using the Grid")').click()
  
})

test("User facing locators", async({page}) =>{

 await page.getByRole('textbox',{name : "Email"}).first().click()

 await page.getByText('Using the Grid').click()

 await page.getByLabel('Email').first().click()

 await page.getByPlaceholder('Jane Doe').click()

 await page.getByTestId("SINGIN").click()
 await page.getByTitle('IoT Dashboard').click()
})

test("child Elements", async({page})=>{

//await page.locator('nb-radio-group nb-radio :text-is("Option 1")').click()

await page.locator('nb-radio-group').locator('nb-radio').locator(':text-is("Option 1")').click()

await page.locator('nb-card').getByTestId("SINGIN").click()

await page.locator('nb-card').nth(0).getByRole('button', {name : "submit"}).click()

})

test('parent elements', async({page})=>{

  //Seond parameter in locator method with has  and hasText mthod
 //await page.locator('nb-card',{hasText: "Using the Grid"}).getByRole('textbox', {name: "Email"}).click()
 await page.locator('nb-card',{has: page.locator('#inputEmail1')}).getByRole('textbox', {name: "Email"}).click()


 //using filter method
 await page.locator('nb-card').filter({hasText : "Basic form"}).getByRole('textbox', {name: "Email"}).click()
 await page.locator('nb-card').filter({has : page.locator('#exampleInputPassword1')}).getByRole('textbox',{name : "Password"}).click()

 //multiple filters
 await page.locator('nb-card').filter({has : page.locator('.checkbox')}).filter({hasText :"Remember me"}).getByRole('textbox',{name : "Email"}).click()

 //move to the parent element with (..)
 await page.locator(':text-is("Block form")').locator('..').getByRole('textbox',{name : "First Name"}).click()

})

test('Reusing the locators', async({page}) =>{
  const basicForm=page.locator('nb-card').filter({hasText : "Basic form"})
  const emailIdField=basicForm.getByRole('textbox', {name: "Email"})
  const passwordField=basicForm.getByRole('textbox', {name: "Password"})

  await emailIdField.fill('chetan@zebra.com')
  await passwordField.fill('Chetan@1996')
  await basicForm.locator('nb-checkbox').click()
  await basicForm.getByRole('button').click()

  //assertion for assertion we need to import expect in same as text

  await expect(emailIdField).toHaveValue('chetan@zebra.com')
})

test('Extracting values', async ({page}) => {

  //single text valuie
  const basicForm=page.locator('nb-card').filter({hasText : "Basic form"})
  const buttonText=await basicForm.locator('button').textContent()
  expect(buttonText).toEqual('Submit')
  
  //all text values
  const allOptionTextLabels=await page.locator('nb-radio').allTextContents()
  expect(allOptionTextLabels).toContain('Option 1')

  //input Value
  const emailIdField=basicForm.getByRole('textbox', {name: "Email"})
 await emailIdField.fill('ChetanR@test.com')
  const emailEntered= await emailIdField.inputValue()
  expect(emailEntered).toEqual('ChetanR@test.com')
  
  //To validate any attribute value 
  const attributeValue=await emailIdField.getAttribute('id')
  expect(attributeValue).toEqual('exampleInputEmail1')

})

test('Assertions', async({page}) => {
const basicFormButton=page.locator('nb-card').filter({hasText : "Basic form"}).locator('button')
  //Generic assertions
  const value =6;
  expect(value).toEqual(6)

  const buttonText=await basicFormButton.textContent()
  expect(buttonText).toEqual('Submit')

  //Locator Assertions

  await expect(basicFormButton).toHaveText('Submit')

  //soft Assertion
  await expect.soft(basicFormButton).toHaveText('Button') // here it will fail still will continue the flow as we have applied soft assertion
  await basicFormButton.click()

})