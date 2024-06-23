import { Page } from "@playwright/test";
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutPage } from '../page-objects/formLayoutPage'
import { DatePickerPage } from '../page-objects/datePickerPage'

export class PageManager{

    private readonly page: Page;

    private readonly navigationPage : NavigationPage;
    private readonly formLayoutPage : FormLayoutPage;
    private readonly datePickerPage : DatePickerPage;
    

    constructor(page: Page){
        this.page =page;
        this.navigationPage=new NavigationPage(this.page);
        this.formLayoutPage=new FormLayoutPage(this.page);
        this.datePickerPage=new DatePickerPage(this.page);
        
    }

    getNavigationPage(){
        return this.navigationPage;
    }

    getFormLayoutPage(){
        return this.formLayoutPage;
    }

    getDatePickerPage(){
        return this.datePickerPage;
    }

}