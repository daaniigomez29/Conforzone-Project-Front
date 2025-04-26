import { Injectable } from '@angular/core';
import { EmailModel } from '../interfaces/EmailModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  apiUrl:string = "http://localhost:8080/api/v1/email";

  constructor(private http:HttpClient) { }

  sendEmailContact(emailModel:EmailModel) {
    return this.http.post<EmailModel>(`${this.apiUrl}/contact`, emailModel)
  }
}
