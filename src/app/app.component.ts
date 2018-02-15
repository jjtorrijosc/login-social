import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { LoadingService } from './services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
    //vamos a crear un overlay para los momentos de carga
    private subscrLoading: Subscription;
    private pageIsLoading: boolean;

  constructor(private loadingService: LoadingService) {}

  ngOnInit() {
    this.pageIsLoading = false;

    this.subscrLoading = this.loadingService.$isLoading.subscribe(
        (is_loading: boolean) => {
            this.pageIsLoading = is_loading;
        }
    );
  }

  ngOnDestroy() {
    if (this.subscrLoading) { 
        this.subscrLoading.unsubscribe();
    }
  }
  
}
