import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from "rxjs/Subject";
import { Observable } from 'rxjs/Observable';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { environment } from '../../environments/environment';

import { User} from '../model/user';

const loginUrl = '/usuario/login'; // URL to web api
const signupUrl = '/usuario/sign-up';
const httpOptions = {
   headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UsersService {

  public $obUsuario = new Subject<User>();
  private usuario: User;
    
  constructor(
          private http: HttpClient,
          ) {
      this.usuario = null;
      console.log("constructor UsersService");
  }
    
  login (usuario: User): Observable<User> {
      return this.http.post<User>(environment.urlBackend +  loginUrl,
              JSON.stringify(usuario),
              httpOptions
       ).pipe(
          //interceptamos la respuesta
          tap (
             (data: User) => {
               //desde el servicio actualizamos el usuario para toda la app
                 console.log('login subscribe '+data.userId);
                 this.usuario = data;
                 this.$obUsuario.next(data);
             },
             err => {
                 console.error(err);
             }
          )//, 
          //catchError(this.handleError("login", null))
       );
  }
      

  
  logout () {
      this.usuario = new User();
      this.$obUsuario.next(this.usuario);
  }
  
  signup (usuario: User): Observable<User> {
      return this.http.post<User>( environment.urlBackend +  signupUrl,
              JSON.stringify(usuario),
              httpOptions
       ).pipe(
         //interceptamos la respuesta
         tap(
          (data: User) => {
              //una vez dado de alta hacemos login con el nuevo usuario
              console.log('vamos a hacer login');
              this.usuario = data;
             this.login(data).subscribe(
                 (userLogin: User) => {
                     console.log('new User signup and logged: '+userLogin.userId);
                 }
             );
             console.log("signup: "+data.userId);
          },
          err => {
              console.error(err);
          }
         )
       );
  }
  
  getUser (): User {
      console.log("getUser: "+this.usuario.username);
      return this.usuario;
  }

  private handleError<T> (operation = 'operation', result?: T) {
      (error: any): Observable<T> => {
        console.error(error);
        
        // devolvemos resultado vacio
        return of(result as T);
      };
    }
  
}
