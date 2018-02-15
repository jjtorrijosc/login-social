import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { MDBBootstrapModule } from 'angular-bootstrap-md';


import { AppComponent } from './app.component';
import {
    SocialLoginModule,
    AuthServiceConfig,
    GoogleLoginProvider,
    FacebookLoginProvider
} from 'angular5-social-login';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import { WelcomeComponent } from './components/welcome/welcome.component';

import { UsersService } from './services/users.service';
import { LoadingService } from './services/loading.service';
import { NavbarComponent } from './components/navbar/navbar.component';

// Configs
export function getAuthServiceConfigs() {
    
    //cargamos las api keys
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider(environment.API_KEY_FACEBOOK)
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(environment.API_KEY_GOOGLE)
        }
      ]
  );
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    SocialLoginModule,
    AppRoutingModule,
    HttpClientModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [{
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
     }, 
     UsersService,
     LoadingService
    ],
    bootstrap: [AppComponent]
  })
export class AppModule { }
