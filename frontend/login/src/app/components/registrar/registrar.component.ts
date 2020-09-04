import { Component, OnInit } from '@angular/core';
//Auth 
import { AuthService } from '../../services/auth.service';
//Rutas
import { Router } from '@angular/router';


@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.css']
})

export class RegistrarComponent implements OnInit {

  user = { email: '', password: ''}

  constructor( 
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  registarMethod(){
    //console.log(this.user);
    this.authService.registrarHttp(this.user)
      .subscribe(
        res => { 
          console.log(res);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/metadata']);
        },
        err => { console.log("Hubo un error:" + err) }
      )
  }

}
