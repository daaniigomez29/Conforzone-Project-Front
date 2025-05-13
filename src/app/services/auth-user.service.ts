import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterRequest } from '../interfaces/RegisterRequest';
import { LoginRequest } from '../interfaces/LoginRequest';
import { BehaviorSubject, Observable, catchError, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { TokenRequest } from '../interfaces/TokenRequest';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  private apiUrl:string = "" //Url para llamar al back
  private isAuthenticated$: BehaviorSubject<boolean>; //Observable para saber si ha iniciado sesión

  constructor(private http:HttpClient, private router:Router) { 
    this.isAuthenticated$ = new BehaviorSubject<boolean>(this.isAuthenticated());
  }

  //Registra a un nuevo usuario en la base de datos 
  register(registerRequest:RegisterRequest): Observable<any> {
   return this.http.post(this.apiUrl + "/register", registerRequest)
  }

  //El usuario inicio sesión en la aplicación
  login(loginRequest:LoginRequest): Observable<any> {
   return this.http.post<TokenRequest>(this.apiUrl + "/login", loginRequest)
    .pipe(
      tap(
        response =>{
          localStorage.setItem('token', response.token) //Añade al almacenamiento local el token          
        }),
        catchError(
          error =>{
            return error;
          }
        )
    )
  }

  //Si existe token significa que ha iniciado sesión, por lo que devuelve true
  isLogged(): boolean{
    return localStorage.getItem('token') ? true : false
  }

  //Obtiene token
  getToken(): string | null{
    return localStorage.getItem('token');
  }

  //Devuelve si el usuario está autenticado
  isAuthenticated() : boolean{
    return !!this.getToken();
  }

  //Devuelve el atributo isAuthenticated
  getIsAuthenticated() : Observable<boolean>{
  return this.isAuthenticated$.asObservable();
  }

  //Devuelve si el usuario es admin o no
  isAdmin() : boolean{
    return (this.getUserData().admin == 'ADMIN') ? true : false
  }

  //Obtiene datos del token
  getUserData(){
    let token:string = localStorage.getItem('token') as any;
    const {name, admin, idUser} = jwtDecode(token) as any
    return {
      nombre : name,
      admin : admin,
      id: idUser
    }
  }

  //Cierra sesión
  logout(){
    localStorage.removeItem('token'); //eliminame el token del LocalStorage
    this.isAuthenticated$.next(false);                      
    Swal.fire({ // muestra una alert exitosa
      title: "Sesión cerrada",
      icon: "success"
    })
    this.router.navigateByUrl('login'); //Devuelveme al login
  }
}
