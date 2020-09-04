import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Importamos los Componentes para rutas.
import { EntrarComponent } from './components/entrar/entrar.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { MetadataComponent } from './components/metadata/metadata.component';

//Para usar el Guard
import { AuthGuard } from './auth.guard'

//Damos rutas
const routes: Routes = [

  {
    path : '',
    redirectTo: '/empresas',
    pathMatch : 'full'
  },
  {
    path : 'registrar',
    component : RegistrarComponent
  },
  {
    path : 'entrar',
    component : EntrarComponent
  },
  {
    path : 'empresas',
    component : EmpresasComponent
  },
  {
    path : 'metadata',
    component : MetadataComponent,
    canActivate : [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
