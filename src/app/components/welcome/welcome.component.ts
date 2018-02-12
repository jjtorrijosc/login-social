import { Component, OnInit, OnDestroy  } from '@angular/core';
//import { Subscription } from "rxjs/Subscription";
import { Subscription } from "rxjs/Subscription";
import { Router } from '@angular/router';

import { UsersService } from '../../services/users.service';
import { User} from '../../model/user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit, OnDestroy {
  
    usuario: User;
    private subscrUser: Subscription;

  constructor(private usersService: UsersService,
          private router: Router) { }

  ngOnInit() {
      this.usuario = this.usersService.getUser();

      //dejamos un subscribe por si el usuario cambia
      this.subscrUser = this.usersService.$obUsuario.subscribe(
          (usuario: User) => {
              console.log('subscribe: '+usuario.username);
              this.usuario = usuario;}
      );
  }
  
  ngOnDestroy() {
      if (this.subscrUser) { 
          this.subscrUser.unsubscribe();
      }
  }
  
  logout () {
      this.usersService.logout();
      this.router.navigate(['./login']);
  }  
  
}
