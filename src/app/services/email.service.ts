import { Injectable } from '@angular/core';
import { EmailModel } from '../interfaces/EmailModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  apiUrl = process.env['CONFORZONE_API_URL'];

  constructor(private http:HttpClient) { }

  sendEmailContact(emailModel:EmailModel) {
    return this.http.post<EmailModel>(`${this.apiUrl}/contact`, emailModel)
  }
}
