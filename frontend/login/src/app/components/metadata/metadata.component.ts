import { Component, OnInit } from '@angular/core';
import { EmpresasService } from "../../services/empresas.service";

@Component({
  selector: 'app-metadata',
  templateUrl: './metadata.component.html',
  styleUrls: ['./metadata.component.css']
})
export class MetadataComponent implements OnInit {

  metadataArray = [];

  constructor( private empresasAndMetadata : EmpresasService) { }

  ngOnInit(): void {
    this.empresasAndMetadata.getMetadata().subscribe(
      res => {
        //console.log(JSON.stringify(res));
        this.metadataArray = res;
        
      },
      err=> {
        console.log(err);
      }
    )
  }

}
