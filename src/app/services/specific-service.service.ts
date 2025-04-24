import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpecificService } from '../interfaces/SpecificService';

@Injectable({
  providedIn: 'root'
})
export class SpecificServiceService {

  apiUrl = "http://localhost:8080/api/v1/specific_services"

  constructor(public http:HttpClient) { }

  getAllSpecificServicesBySlug(slug:string | null){
    return this.http.get<SpecificService[]>(`${this.apiUrl}/slug/${slug}`)
  }

  getSpecificServiceBySlugAndId(slug:string | null, id:number){
    return this.http.get<SpecificService>(`${this.apiUrl}/${slug}/${id}`)
  }

  getSpecificServicesOffers() {
    return this.http.get<SpecificService[]>(`${this.apiUrl}/offers`)
  }

  getOfferSpecificServicesById(id:number) {
    return this.http.get<SpecificService>(`${this.apiUrl}/services/offers/${id}`)
  }
}
