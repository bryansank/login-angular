import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000/api';

  constructor( private HTTP : HttpClient, private router : Router) { }

  entrarHttp(user){
    return this.HTTP.post<any>(this.URL + '/entrar', user);
  }
  registrarHttp(user){
    return this.HTTP.post<any>(this.URL + '/registrar', user);
  }

  logued(){
    return localStorage.getItem('token') ? true : false;
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/entrar']);
  }

}
