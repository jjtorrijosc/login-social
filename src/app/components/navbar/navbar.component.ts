import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from "rxjs/Subscription";

import { UsersService } from '../../services/users.service';
import { NavbarService } from '../../services/navbar.service';

import { User } from '../../model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    usuario: User;
    private navbarSubscrUser: Subscription;
    show: boolean;
    private navbarSubscrShow: Subscription;

  constructor(
          private router: Router,
          private navbarService: NavbarService,
          private usersService: UsersService
  ) { }

  ngOnInit() {
      this.show = true;
      this.navbarSubscrShow = this.navbarService.$show.subscribe(
              (show: boolean) => {
                  this.show = show;
              }
          );
      
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
      if (this.navbarSubscrShow) { 
          this.navbarSubscrShow.unsubscribe();
      }
  }
  
  logout() {
      this.usersService.logout();
      this.router.navigate(['./login']);
  }

}
