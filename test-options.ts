import {test as base} from '@playwright/test'
import { PageManager } from './page-objects/pageManager'

export type TestOptions={
    globalQaURL : string
    formLayoutsPage : string
    pagesManager : PageManager
}

export const test =base.extend<TestOptions>({
    globalQaURL : ['', {option : true}],
    
    // first code is with auto mode and second is without auto sue to make the dependency on the pageMagaer added
    // formLayoutsPage : [async  ({page}, use) => {
    //     await page.goto('/')
    //     await page.getByText('Forms').click()
    //     await page.getByText('Form Layouts').click()
    //     await use('')
    // }, {auto : true}],

    formLayoutsPage : async  ({page}, use) => {
            await page.goto('/')
            await page.getByText('Forms').click()
            await page.getByText('Form Layouts').click()
            await use('')
            
            console.log('Tear Down')
        },

    pagesManager : async ({page,formLayoutsPage}, use) => {
        const pm=new PageManager(page)
        await use(pm)

    }

})