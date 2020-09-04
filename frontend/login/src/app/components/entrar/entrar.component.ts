import { Component, OnInit } from '@angular/core';
//Auth 
import { AuthService } from '../../services/auth.service';
//Rutas
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})

export class EntrarComponent implements OnInit {

  user = { email: '', password: ''}

  constructor( 
    private authService : AuthService,
    private router : Router
  ) { }

  ngOnInit(): void {
  }

  entrarMethod(){
    //Datos pre-cargados
    console.log(this.user);
    //console.log(this.user);
    this.authService.entrarHttp(this.user)
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
