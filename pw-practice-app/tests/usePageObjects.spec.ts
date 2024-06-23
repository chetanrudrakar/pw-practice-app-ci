import{test,expect} from '@playwright/test'
import { PageManager } from '../page-objects/pageManager';
import {faker} from '@faker-js/faker'

test.beforeEach( async ({page}) =>{
    await page.goto('/')
    
    })

    test('navigate to form page {tag : @smoke}', async({page})=>{
        const pm=new PageManager(page)
        await  pm.getNavigationPage().formLayoutPage();
        await  pm.getNavigationPage().datePickerPage();
        await  pm.getNavigationPage().smartTablePage();
        await  pm.getNavigationPage().toasterPage();
        await  pm.getNavigationPage().toolTipPage();

    })

    test('parametrized methods {tag : @integration}', async({page})=>{
        const pm=new PageManager(page)
        const randomFullName =faker.person.fullName({lastName : 'Smith'})
        const randomEmail=`${randomFullName.replaceAll(' ','')}${faker.number.int(1000)}@test.com`
        await  pm.getNavigationPage().formLayoutPage()
       await pm.getFormLayoutPage().submitUsingTheGridForm('chetan.rudrakar@zebra.com','cheat@1234',"Option 2")
       //take screen shot of screen
       await page.screenshot({path : 'screenshots/formslayoutpage.png'})
// Save screenshot in binary
// const buffer= await page.screenshot()
// console.log(buffer.toString())
       await pm.getFormLayoutPage().submitInlineForm(randomFullName, randomEmail, true);
       //take screen shot of particular element or area
       await page.locator('nb-card', {hasText: 'Inline Form'}).screenshot({path :'screenshots/inlineForm.png'})
       pm.getNavigationPage().datePickerPage()
       await pm.getDatePickerPage().selectTheCommonDatePicker(1);
       await pm.getDatePickerPage().selectTheCommonRangePicker(1,2);

    })

    test.only('navigate to date picker {tag : @smoke}', async({page})=>{
        const pm=new PageManager(page)
        await  pm.getNavigationPage().formLayoutPage();
        await  pm.getNavigationPage().datePickerPage();
        await  pm.getNavigationPage().smartTablePage();

    })