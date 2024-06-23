import { expect } from "@playwright/test";
import {test} from '../test-options'

test('drag and drop', async({page,globalQaURL})=>{

    page.goto(globalQaURL);
    
    const frame=  page.frameLocator('[rel-title="Photo Manager"] iframe')

     await frame.locator('li',{hasText: "High Tatras 2"}).dragTo(frame.locator('#trash'));


     //more precise way is by actual mouse actions
    await frame.locator('li', {hasText : "High Tatras 4"}).hover();
    await page.mouse.down()
    await frame.locator('#trash').hover();
    await page.mouse.up();

    await expect(frame.locator('#trash h5')).toHaveText(["High Tatras 2","High Tatras 4"]);

})