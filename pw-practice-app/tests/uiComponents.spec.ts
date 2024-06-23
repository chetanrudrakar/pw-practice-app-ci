import { waitForAsync } from '@angular/core/testing'
import {test,expect} from '@playwright/test'

test.beforeEach( async ({page}) =>{
await page.goto('/')

})

test.describe.only('Form Layout Page', () => {
     test.describe.configure({retries : 0})
    test.beforeEach(async({page}) =>{
        await page.getByText('Forms').click();
        await page.getByText('Form Layouts').click();
    })


test('input Fields', async({page}, testinfo)=>{
    let testdata : string;
    if(testinfo.retry){
        //do this 
         testdata="cr4159@zebra.com";
    }else{
        testdata="cr4159@zebra.com1"
    }
const usingTheGrid = page.locator('nb-card', {hasText : "Using the Grid"}).getByRole('textbox', {name : "Email"})
   await usingTheGrid.fill('chetan.rudrakar@reflexis.inc.com')
   await usingTheGrid.clear();
   await usingTheGrid.pressSequentially('cr4159@zebra.com', {delay : 500})


   //generic assertions
   const inputValue = await usingTheGrid.inputValue();
    expect (inputValue).toEqual(testdata);

    //locator assertions
    await expect(usingTheGrid).toHaveValue('cr4159@zebra.com')

        })

        test.only('radio Buttons', async({page})=>{
            const usingTheGridRadio = page.locator('nb-card', {hasText : "Using the Grid"})
         // await usingTheGridRadio.getByLabel('Option 2').check({force : true});
           await usingTheGridRadio.getByRole('radio', {name : 'Option 1'}).check({force : true});
           let radioStatus=await usingTheGridRadio.getByRole('radio', {name : 'Option 1'}).isChecked();
           await expect(usingTheGridRadio).toHaveScreenshot({maxDiffPixels : 100});
           //Assertion
          // expect (radioStatus).toBeTruthy();
          //locator assertion
        //  await expect(usingTheGridRadio.getByRole('radio', {name : 'Option 1'})).toBeChecked();
       
        //  await usingTheGridRadio.getByRole('radio', {name : 'Option 2'}).check({force : true});
        //  await expect(usingTheGridRadio.getByRole('radio', {name : 'Option 2'})).toBeChecked();
        //   radioStatus=await usingTheGridRadio.getByRole('radio', {name : 'Option 1'}).isChecked();
        //   expect (radioStatus).toBeFalsy()

})


})

test('Checkbox', async({page})=>{
    await page.getByText('Modal & Overlays').click();
    await page.getByText('Toastr').click();

    await page.getByRole('checkbox', {name : "Hide on click"}).uncheck({force : true});
    await page.getByRole('checkbox', {name : "Prevent arising of duplicate toast"}).check({force : true});
    
//check all three checkboxes
const toastTypes = page.getByRole('checkbox');
for(const toastType of await toastTypes.all()){
   await toastType.check({force: true});
    expect( await toastType.isChecked()).toBeTruthy();
}

//check all three checkboxes

// for(const toastType of await toastTypes.all()){
//    await toastType.uncheck({force: true});
//     expect(await toastType.isChecked()).toBeFalsy();
// }
})

test('List and ddropdowns', async({page})=>{

    const dropDownList=page.locator('ngx-header nb-select');
       await dropDownList.click();
       const itemList=page.locator('nb-option-list nb-option')
       await expect(itemList).toHaveText(["Light","Dark", "Cosmic", "Corporate"])
       itemList.filter({hasText : 'Dark'}).click();
       const header =page.locator('nb-layout-header')
       await expect(header).toHaveCSS('background-color', 'rgb(34, 43, 69)')


       const colors ={
        "Light" : "rgb(255, 255, 255)",
        "Dark" : "rgb(34, 43, 69)",
        "Cosmic" : "rgb(50, 50, 89)",
        "Corporate" : "rgb(255, 255, 255)"
       }
     
       await dropDownList.click();
       for(const color in colors){
        itemList.filter({hasText : color}).click();
        await expect(header).toHaveCSS('background-color', colors[color])
       if(color!="Corporate")
        await dropDownList.click();
       }
})

test('tooltips', async({page})=>{

    await page.getByText('Modal & Overlays').click();
    await page.getByText('Tooltip').click();
   await page.locator('nb-card button').getByText('Top').hover()
   const toolTip= await page.locator('nb-tooltip').textContent();
    expect(toolTip).toEqual('This is a tooltip')
 
})

test('dailog box', async({page})=>{
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart table').click();

    //Listner for the dailog box
    page.on('dialog', dialog =>{
  expect(dialog.message()).toEqual('Are you sure you want to delete?')
  dialog.accept();
    })
   await  page.getByRole('table').locator('tr',{hasText : "mdo@gmail.com"}).locator(".nb-trash").click();
   expect(await page.locator('table tbody tr').first().locator('td',{hasText : 'mdo@gmail.com'}).isVisible()).toBeFalsy();
})

test('web tables', async({page})=>{
    await page.getByText('Tables & Data').click();
    await page.getByText('Smart table').click();

    const rowToEdit=page.getByRole('row', {name : "snow@gmail.com"});
    await rowToEdit.locator('.nb-edit').click();
    
    await page.locator('input-editor').getByPlaceholder('Age').clear();
    await page.locator('input-editor').getByPlaceholder('Age').fill('28')
    await page.locator('.nb-checkmark').click();

    //specific column
    await page.locator('.ng2-smart-pagination-nav ul li',{hasText : '2'}).click()
    const rowEdit=page.getByRole('row',{name : '11'}).filter({has : page.locator('td').nth(1).getByText('11')})
    await rowEdit.locator('.nb-edit').click();
    await page.locator('input-editor').getByPlaceholder('E-mail').clear();
    await page.locator('input-editor').getByPlaceholder('E-mail').fill('chetanr.com')
    await page.locator('.nb-checkmark').click();

   //Filter of table
    const ages=["20","40","30","200"];

    for(const age of ages){
        await page.locator('input-filter').getByPlaceholder('Age').clear();
        await page.locator('input-filter').getByPlaceholder('Age').fill(age);

        //Add delay to load the search
       await page.waitForTimeout(500);

        const rowAges=page.locator('tbody tr');

        for(const rowAge of await rowAges.all()){
            const ageValue=await rowAge.locator('td').last().textContent();
           
            if(age=="200"){
                expect(await page.locator('tbody tr').textContent()).toContain('No data found');
            }else{
                expect(ageValue).toEqual(age)
            }
            
        }
    }
   

})

test('data picker', async({page})=>{
    await page.getByText('Forms').click();
    await page.getByText('Datepicker').click();

    const datePicker=page.locator('nb-card-body').getByPlaceholder('Form Picker')
    await datePicker.click()

  let date =new Date();
  date.setDate(date.getDate() +350)

  const expectedDate=date.getDate().toString();
  const expectedMonthShort=date.toLocaleString('En-US', {month : 'short'});
  const expectedMonthLong=date.toLocaleString('En-US',{month : 'long'})
  const expectedYear=date.getFullYear();
  const dateTovalidate=`${expectedMonthShort} ${expectedDate}, ${expectedYear}`

  let calendarMonthAndYear=(await page.locator('nb-calendar-view-mode').textContent()).trim();
  const expectedcalendarMonthAndYear= `${expectedMonthLong} ${expectedYear}`;

  while(!calendarMonthAndYear.includes(expectedcalendarMonthAndYear)){
    await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
    calendarMonthAndYear=(await page.locator('nb-calendar-view-mode').textContent()).trim();
  }
  
    await page.locator('[class="day-cell ng-star-inserted"]').getByText(expectedDate,{exact : true}).click()
   await expect(datePicker).toHaveValue(dateTovalidate);

})


test('slider', async({page})=>{

    //First Approach updating the attribute values

//     const tempGuage=page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')

//    await tempGuage.evaluate(node =>{
//     node.setAttribute('cx','232.630');
//     node.setAttribute('cy','232.630');
//     })
//     //perform action to show on browser
//    await tempGuage.click();
   const temp=page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
  // await expect(temp).toContainText('30');
   

//Approach 2 actual mouse movement by using bounding Box

temp.scrollIntoViewIfNeeded();
const box =await temp.boundingBox();
const x= box.x +box.width/2;
const y= box.y +box.height/2;

await page.mouse.move(x,y);
await page.mouse.down()
await page.mouse.move(x-100,y);
await page.mouse.move(x-100,y+100);
await page.mouse.up();
await expect(temp).toContainText('12');

})






