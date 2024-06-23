import { Page } from "@playwright/test";

export class HelperBase{

     readonly page : Page

    constructor (page : Page){

        this.page=page
    }

    async waitForNumberOfSeconds(NumberOfSeconds : number){
        
        await this.page.waitForTimeout(NumberOfSeconds *1000)
    }


}