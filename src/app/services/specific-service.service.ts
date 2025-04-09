import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpecificService } from '../interfaces/SpecificService';

@Injectable({
  providedIn: 'root'
})
export class SpecificServiceService {

  apiUrl = "http://localhost:8080/api/v1/specific_services"

  constructor(public http:HttpClient) { }

  getAllSpecificServicesBySlug(slug:string){
    return this.http.get<SpecificService[]>(`${this.apiUrl}/${slug}`)
  }

  getSpecificServiceById(id:number){
    return this.http.get<SpecificService>(`${this.apiUrl}/${id}`)
  }
}
