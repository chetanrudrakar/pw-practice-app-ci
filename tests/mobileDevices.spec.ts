import {test,expect} from '@playwright/test'  
    
    test('input Fields', async({page})=>{
        await page.goto('/');
        await page.locator('.sidebar-toggle').click();
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
        await page.locator('.sidebar-toggle').click();
      const usingTheGrid = page.locator('nb-card', {hasText : "Using the Grid"}).getByRole('textbox', {name : "Email"});
       await usingTheGrid.fill('chetan.rudrakar@reflexis.inc.com')
    })