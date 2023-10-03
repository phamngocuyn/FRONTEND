import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // private totalItemsSource = new BehaviorSubject<number>(0);
  // totalItems$ = this.totalItemsSource.asObservable();

  // updateTotalItems(totalItems: number) {
  //   this.totalItemsSource.next(totalItems);
  // }

  private totalItemsSource = new BehaviorSubject<number>(0);
  totalItems$ = this.totalItemsSource.asObservable();

  updateTotalItems(totalItems: number) {
    this.totalItemsSource.next(totalItems);
  }
  
}
