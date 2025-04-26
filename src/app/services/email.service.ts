import { Injectable } from '@angular/core';
import { EmailModel } from '../interfaces/EmailModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  apiUrl:string = "https://conforzone-project-back-production.up.railway.app/api/v1/email";

  constructor(private http:HttpClient) { }

  sendEmailContact(emailModel:EmailModel) {
    return this.http.post<EmailModel>(`${this.apiUrl}/contact`, emailModel)
  }
}
