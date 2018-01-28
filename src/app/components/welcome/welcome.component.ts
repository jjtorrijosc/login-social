import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { User} from '../../model/user';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  usuario: User;

  constructor(private usersService: UsersService,
          private router: Router) { }

  ngOnInit() {
      this.usuario = this.usersService.getUser();
  }
  
  logout () {
      this.usersService.logout();
      this.router.navigate(['./login']);
  }
  
}
