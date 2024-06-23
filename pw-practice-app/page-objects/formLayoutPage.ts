import { Optional } from "@angular/core";
import { Locator, Page } from "@playwright/test";
import { HelperBase } from "./helperBase";

export class FormLayoutPage extends HelperBase{

    readonly usingTheGridForm : Locator
    readonly usingTheGridEmail : Locator;
    readonly usingTheGridPassword : Locator;
    readonly usingTheGridRadioText : string;
    readonly usingTheGridSignIn : Locator ;


    constructor(page : Page){
        super(page)
        this.usingTheGridForm=page.locator('nb-card', {hasText: 'Using the Grid'});
        this.usingTheGridEmail=this.usingTheGridForm.getByRole('textbox', {name : "Email"})
        this.usingTheGridPassword=this.usingTheGridForm.getByRole('textbox', {name : "Password"})
        this.usingTheGridSignIn=this.usingTheGridForm.getByRole('button',{name : "Sign in"})

    }

    /**
     * This method will fill the using the grid form details
     * @Author  : Chetan Rudrakar
     * @param email : enter the email Id in Valid format
     * @param password : password 
     * @param optionText : provide the option text that need to select
     */
    async submitUsingTheGridForm(email : string , password : string, optionText : string){
       await this.usingTheGridEmail.fill(email);
       await this.usingTheGridPassword.fill(password);
       await this.usingTheGridForm.getByRole('radio',{name : optionText}).check({force : true});
       await this.usingTheGridSignIn.click()
    }

     /**
     * This method will fill the inline form details
     * @Author  : Chetan Rudrakar
     * @param name : Enter first and last name
     * @param email : provide the valid email address 
     * @param rememberMe : provide true/false to check the checkbox or  not
     */

    async submitInlineForm(name : string, email : string, rememberMe : boolean){

        const inlineForm=this.page.locator('nb-card', {hasText: 'Inline Form'});
        await inlineForm.getByRole('textbox', {name : "Jane Doe"}).fill(name);
       await inlineForm.getByRole('textbox', {name : "Email"}).fill(email);
        const rememberMeCheckBox=inlineForm.getByRole('checkbox');
        if(rememberMe){
         await rememberMeCheckBox.check({force : true})
        }
        await inlineForm.getByRole('button').click()

        
}

}