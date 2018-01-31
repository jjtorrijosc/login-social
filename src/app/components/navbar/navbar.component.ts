import { Component, OnInit } from '@angular/core';

import { UsersService } from '../../services/users.service';
import { User} from '../../model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

    usuario: User;

  constructor(private usersService: UsersService) { }

  ngOnInit() {
  }

}
