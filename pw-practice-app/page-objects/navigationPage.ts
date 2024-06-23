import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class NavigationPage extends HelperBase{

     /*One approach of keeping the locators is defining the locator variable and assigning
      the value to the locator in constructor and 
     Second approach is to keep the locators in the functional methods 
     for other than formLayout Page we have kept the locators at the method levels
     */
    private readonly formLayoutMenuItem : Locator;
    constructor (page :Page){
    super(page)
    this.formLayoutMenuItem=page.getByText('Form Layouts');
    

    }

    //navigate to forms layout
    async formLayoutPage(){
        await this.selectGroupMenuItem("Forms");
        await this.formLayoutMenuItem.click();
        await this.waitForNumberOfSeconds(4);
    }

    async datePickerPage(){

        await this.selectGroupMenuItem("Forms");
    await this.page.getByText('Datepicker').click();
    }

    async toasterPage(){
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.page.getByText('Toastr').click();
    }

    async smartTablePage(){
        await this.selectGroupMenuItem("Tables & Data");
        await this.page.getByText('Smart table').click();
    }

    async toolTipPage(){
        await this.selectGroupMenuItem("Modal & Overlays");
        await this.page.getByText('Tooltip').click();
    }

    private async selectGroupMenuItem(groupMenuItemTitle : string){
     const groupMenuItem = this.page.getByTitle(groupMenuItemTitle)
     const groupMenuState =await groupMenuItem.getAttribute('aria-expanded');

     if(groupMenuState=="false"){
       await groupMenuItem.click()
     }
    }
}