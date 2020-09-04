import { Component, OnInit } from '@angular/core';
//Auth 
import { AuthService } from '../../services/auth.service';
//Rutas
import { Router } from '@angular/router';

//notifications
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-entrar',
  templateUrl: './entrar.component.html',
  styleUrls: ['./entrar.component.css']
})

export class EntrarComponent implements OnInit {

  user = { email: '', password: ''}

  constructor( 
    private authService : AuthService,
    private router : Router,
    private toastr: ToastrService
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
        err => { 
          console.log("== begin error object ===")
          console.log(JSON.stringify(err));
          console.log("== end error object ===")
          console.log("Hubo un error:" + err)         
          if (err.statusText == "Unauthorized")
            this.toastr.warning("Ingreso una combinacion de usuario/clave invalida!", "Error de acceso");
          else 
            this.toastr.error(err.message, "Error desconocido");
         }
      )
  }

}
