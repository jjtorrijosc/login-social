import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { Router } from '@angular/router';

import { UsersService } from '../../services/users.service';
import { NavbarService } from '../../services/navbar.service';

import { User} from '../../model/user';
import { Sesion } from '../../model/sesion';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  
    usuario: User;
    sesiones: Sesion[];
    private subscrUser: Subscription;
    

  constructor(
          private usersService: UsersService,
          private navbarService: NavbarService,
          private router: Router) { }

  ngOnInit() {
      this.usuario = this.usersService.getUser();
      if (this.usuario && this.usuario.userId) {
          this.getUserSessions(this.usuario.userId);
      } 
          
      //dejamos un subscribe por si el usuario cambia
      this.subscrUser = this.usersService.$obUsuario.subscribe(
          (usuario: User) => {
              if (usuario != null) {
                  console.log('subscribe: '+usuario.username);
                  this.usuario = usuario;
                  this.getUserSessions(this.usuario.userId);
              }
          }
      );
      
      //this.navbarService.hide();
  }
  
  ngOnDestroy() {
      if (this.subscrUser) { 
          this.subscrUser.unsubscribe();
      }
      this.navbarService.show();
  }
  
  logout () {
      this.usersService.logout();
      this.router.navigate(['./login']);
  }  
  
  getUserSessions (userId: number) {
      this.usersService.getSessionsUser(userId).subscribe(
          (sesiones: Sesion[]) => {
               this.sesiones = sesiones;
          }
      );
      
  }
  
}
