import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class LoadingService {

    public $isLoading = new Subject<boolean>();
    
  constructor() { }
  
  loading () {
      this.$isLoading.next(true);
  }
  stopLoading () {
      setTimeout(() => {
          this.$isLoading.next(false);
      }, 1000);
  }

}
