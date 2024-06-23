import { Page,expect } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class DatePickerPage extends HelperBase{

    constructor(page : Page){

        super(page);
    }

    async selectTheCommonDatePicker(numberOfDaysFromCurrentDay:number){
    
        const datePicker=this.page.locator('nb-card-body').getByPlaceholder('Form Picker')
        await datePicker.click()
        const dateTovalidate= await this.commonDatePickerSelection(numberOfDaysFromCurrentDay);
        await expect(datePicker).toHaveValue(dateTovalidate);
    
    }

    async selectTheCommonRangePicker(startDateRange : number,endDateRange : number){
    
        const datePicker=this.page.locator('nb-card-body').getByPlaceholder('Range Picker')
        await datePicker.click()
        const startDateTovalidate= await this.commonDatePickerSelection(startDateRange);
        const endDateTovalidate= await this.commonDatePickerSelection(endDateRange);
        const dateTovalidate = `${startDateTovalidate} - ${endDateTovalidate}`;
        await expect(datePicker).toHaveValue(dateTovalidate);
    
    }



    private async commonDatePickerSelection(numberOfDaysFromCurrentDay : number){

        let date =new Date();
      date.setDate(date.getDate() +numberOfDaysFromCurrentDay)
    
      const expectedDate=date.getDate().toString();
      const expectedMonthShort=date.toLocaleString('En-US', {month : 'short'});
      const expectedMonthLong=date.toLocaleString('En-US',{month : 'long'})
      const expectedYear=date.getFullYear();
      const dateTovalidate= `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
    
      let calendarMonthAndYear=(await this.page.locator('nb-calendar-view-mode').textContent()).trim();
      const expectedcalendarMonthAndYear= `${expectedMonthLong} ${expectedYear}`;
    
      while(!calendarMonthAndYear.includes(expectedcalendarMonthAndYear)){
        await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        calendarMonthAndYear=(await this.page.locator('nb-calendar-view-mode').textContent()).trim();
      }
      
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate,{exact : true}).click()
       
        return dateTovalidate;
    }
}