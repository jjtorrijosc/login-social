import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
//import { Observable } from 'rxjs/Observable';

import { User} from '../model/user';

@Injectable()
export class UsersService {

  public $obUsuario = new Subject<User>();
  private usuario: User;
    
  constructor() {
      this.usuario = null;
      console.log("constructor UsersService");
  }
    
  login (usuario: User) {
      this.usuario = usuario;
      console.log("login: "+usuario.username);
      this.$obUsuario.next(usuario);
  }
  
  logout () {
      this.usuario = null;
      this.$obUsuario.next(null);
  }
  
  signup (usuario: User) {
      //TODO: dar de alta usuario en BD
      this.login(usuario);
      console.log("signup: "+usuario.username);
  }
  
  getUser (): User {
      console.log("getUser: "+this.usuario.username);
      return this.usuario;
  }

}
