import { Component, OnInit } from '@angular/core';
import { EmpresasService } from "../../services/empresas.service";

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})

export class EmpresasComponent implements OnInit {

  empresasArray = [];

  constructor( private empresasAndMetadata : EmpresasService) { }

  ngOnInit(): void {
    this.empresasAndMetadata.getEmpresas().subscribe(
      res => {
        //console.log(JSON.stringify(res));
        this.empresasArray = res;
        
      },
      err=> {
        console.log(err);
      }
    )
  }

}
