import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EntrarComponent } from './components/entrar/entrar.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { EmpresasComponent } from './components/empresas/empresas.component';
import { MetadataComponent } from './components/metadata/metadata.component';

//Para usar HTTP entre los servicios importamos... Ademas HTTP_inter...
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

//importamos el servicio token
import { TokenGetService } from './services/token-get.service';

//Guard
import { AuthGuard } from './auth.guard'

//insert Notifications
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    EntrarComponent,
    RegistrarComponent,
    EmpresasComponent,
    MetadataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    AuthGuard,
    {
      provide : HTTP_INTERCEPTORS,
      useClass : TokenGetService,
      multi : true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
