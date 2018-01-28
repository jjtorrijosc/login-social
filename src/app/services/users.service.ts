import { Injectable } from '@angular/core';

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
  
  getUser (): User {
      return this.usuario;
  }
  
  signup (usuario: User) {
      //TODO: dar de alta usuario en BD
      this.usuario = usuario;
  }

}
