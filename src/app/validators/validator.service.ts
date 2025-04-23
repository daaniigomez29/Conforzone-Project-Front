import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() { }

  patternEmail(control:AbstractControl){
    const email:string = control.value;
    
    return email.includes("@") && email.endsWith(".com") ? null : {noValidEmail : true}
   }
}
