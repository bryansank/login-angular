import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class EmpresasService {

  private URL = 'http://localhost:3000/api';

  constructor( private HTTP : HttpClient) { }

  getEmpresas(){
    return this.HTTP.get<any>(this.URL + '/empresas');
  }

  getMetadata(){
    return this.HTTP.get<any>(this.URL + '/metadata');
  }

}
