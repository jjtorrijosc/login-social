import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
    AuthService,
    FacebookLoginProvider,
    GoogleLoginProvider
} from 'angular5-social-login';

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
    
  constructor( 
          private socialAuthService: AuthService,
          private usersService: UsersService,
          private loadingService: LoadingService,
          private router: Router
          ) { 
      
  }

  ngOnInit() {
      this.usuario = new User()
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
          auxUser.id_provider = userData.id;
          
          this.usersService.login(auxUser);
          this.router.navigate(['./welcome']);
        }
      );
    }
  
  public signup () {
      this.loadingService.loading();
      console.log("signup: "+this.usuario.username);
      this.usersService.signup(this.usuario);
      this.router.navigate(['./welcome']);
  }
  
}
