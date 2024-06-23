import{test} from '../test-options'
import {faker} from '@faker-js/faker'

// test.beforeEach( async ({page}) =>{
//     await page.goto('/')
    
//     })

    test('parametrized methods', async({pagesManager})=>{

        const randomFullName =faker.person.fullName({lastName : 'Smith'})
        const randomEmail=`${randomFullName.replaceAll(' ','')}${faker.number.int(1000)}@test.com`
      //  await  pm.getNavigationPage().formLayoutPage()
       await pagesManager.getFormLayoutPage().submitUsingTheGridForm('chetan.rudrakar@zebra.com','chetan@1234',"Option 2")
       await pagesManager.getFormLayoutPage().submitInlineForm(randomFullName, randomEmail, true);
       

    })