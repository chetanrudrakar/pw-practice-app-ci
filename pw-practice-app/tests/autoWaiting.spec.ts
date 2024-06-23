import{test, expect} from '@playwright/test'
import { timeout } from 'rxjs-compat/operator/timeout'

//autoWait
test.beforeEach('beforeEach Suite', async({page})=>{
   await page.goto(process.env.URL)
   await page.locator('#ajaxButton').click()

})

test('auto Waiting', async({page}) =>{

    const successMessageButton=page.locator('.bg-success')
    //await successMessageButton.click()
    //const sucessMessage= await successMessageButton.textContent() //This will work because  textContent method autoWait

    //For such conditions for which auto wait func is not there we can add additional waits
    //await successMessageButton.waitFor({state : "attached"})
   // const sucessMessage= await successMessageButton.allTextContents()x // This will not work as allTextContent method do not have auto Wait
  //Generic assertion
    //expect(sucessMessage).toContain('Data loaded with AJAX get request.')

    //Locator assertion
   await expect(successMessageButton).toHaveText('Data loaded with AJAX get request.', {timeout : 20000})
})

test('Alternative waits',async({page}) =>{

    const successMessageButton=page.locator('.bg-success')
   //_wait for selector
    // await page.waitForSelector('.bg-success')   
    
    //wait for particular response
   // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

   //wait for network calls to be completed
   //await page.waitForLoadState('networkidle')

    const sucessMessage= await successMessageButton.allTextContents()
    expect(sucessMessage).toContain('Data loaded with AJAX get request.')
})