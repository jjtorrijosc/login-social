import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormsModule, EmailValidator, NgControl } from '@angular/forms';
import { Subscription } from "rxjs/Subscription";

import { Router } from '@angular/router';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular5-social-login';
import { ScrollToService, ScrollToConfigOptions } from '@nicky-lenaers/ngx-scroll-to';


import { User } from '../../model/user';
import { UsersService } from '../../services/users.service';
import { LoadingService } from '../../services/loading.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
    usuario: User;
    usuarioForm: User;
    usuarioLogin: User;
    private navbarSubscrUser: Subscription;

    @ViewChild("formModal") public formModal;
    mensajeErrorSignUp: string;
    @ViewChild("popSignUp") public popSignUp;
    mensajeErrorLogin: string;
    @ViewChild("popLogin") public popLogin;
    
    
    
    
  constructor( 
          private socialAuthService: AuthService,
          private usersService: UsersService,
          private loadingService: LoadingService,
          private _scrollToService: ScrollToService,
          private router: Router
          ) { 
      
  }

  ngOnInit() {
      this.usuarioForm = new User();
      this.usuarioLogin = new User();
      this.usuario = this.usersService.getUser();
      this.navbarSubscrUser = this.usersService.$obUsuario.subscribe(
              (user: User) => {
                  this.usuario = user;
              },
              (error) => {console.error('navbar onInit error: '+error);}
          );
  }
  
  ngOnDestroy() {
      if (this.navbarSubscrUser) { 
          this.navbarSubscrUser.unsubscribe();
      }
  }

  public socialSignIn(socialPlatform: string) {
      let socialPlatformProvider;
      if (socialPlatform === 'facebook') {
        socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
      } else if (socialPlatform === 'google') {
        socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
      }

      this.socialAuthService.signIn(socialPlatformProvider).then(
        (userData) => {
          console.log(socialPlatform + ' sign in data : ', userData);
          // Now sign-in with userData
          var auxUser: User = new User();
          auxUser.username = userData.name;
          auxUser.email = userData.email;
          auxUser.provider = userData.provider;
          auxUser.idProvider = userData.id;
          
          this.loadingService.loading();
          this.usersService.login(auxUser).subscribe(
              (data: User) => {
                  console.log('socialSignIn respuesta: '+data.userId);
                  this.loadingService.stopLoading();    
                  this.router.navigate(['./welcome']);
              },
              error => {
                  console.log('error socialSignIn: '+error.error);
                  this.mensajeErrorSignUp = error.error;
                  this.loadingService.stopLoading();
                  
                  setTimeout(() => {
                      this.popSignUp.show();
                  }, 500);
                  
                  setTimeout(() => {
                      this.popSignUp.hide();
                  }, 5500);
              }
          );
          
        }
      );
    }
  
  public login () {
      this.loadingService.loading();
      console.log("login normal: "+this.usuarioForm.email);
      this.usersService.login(this.usuarioLogin).subscribe(
          (data: User) => {
              console.log('login normal respuesta: '+data.userId);
              this.formModal.hide();
              this.loadingService.stopLoading();
              this.router.navigate(['./welcome']);
          },
          error => {
              console.log('error login normal: '+error.error);
              this.loadingService.stopLoading();
              this.mensajeErrorLogin = error.error;
              
              //metemos un ligero retardo para que se actualice el contenido
              //del tooltip
              setTimeout(() => {
                  this.popLogin.show();
              }, 500);
              
              setTimeout(() => {
                  this.popLogin.hide();
              }, 5500);
          }
      );
  }
  
  public signup () {
      this.loadingService.loading();
      console.log("signup: "+this.usuarioForm.username);
      this.usersService.signup(this.usuarioForm).subscribe(
         (data: User) => {
             console.log('signup respuesta: '+data.userId);
             this.loadingService.stopLoading();
             this.router.navigate(['./welcome']);
         },
         error => {
             console.log('error signup '+error.error);
             this.mensajeErrorSignUp = error.error;
             this.loadingService.stopLoading();
             
             setTimeout(() => {
                 this.popSignUp.show();
             }, 500);
             
             setTimeout(() => {
                 this.popSignUp.hide();
             }, 5500);
             
         }
       );
      
  }
  
  scrollToCarrusel () {
      const confScrollCarrusel: ScrollToConfigOptions = {
              target: 'carrusel'
      };
      this._scrollToService.scrollTo(confScrollCarrusel);
  }
  
}
