import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SpecificService } from '../interfaces/SpecificService';

@Injectable({
  providedIn: 'root'
})
export class SpecificServiceService {

  apiUrl = process.env['CONFORZONE_API_URL_SPECIFIC_SERVICES']

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
