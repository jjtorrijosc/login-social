import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class NavbarService {

    public $show = new Subject<boolean>();
    
  constructor() { }

  
  show () {
      this.$show.next(true);
  }
  
  hide () {
      this.$show.next(false);
  }
  
}
