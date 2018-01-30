import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User} from '../model/user';

@Injectable()
export class UsersService {

  private usuario: User;
    
  constructor() { }
  
  
  login (usuario: User) {
      //TODO: comprobar usuario contraBD
      this.usuario = usuario;
  }
  
  loginSocial (usuario: User) {
      this.usuario = usuario;
  }
  
  logout () {
      this.usuario = null;
  }
  
  getUser (): Observable<User> {
      return Observable.create(this.usuario);
  }
  
  signup (usuario: User) {
      //TODO: dar de alta usuario en BD
      this.usuario = usuario;
  }

}
