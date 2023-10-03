import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit {
  public value!: string;
  public useDifferentAddress: boolean = false;
  public cartItems: any[] = [];
  public totalItems: number = 0;
  public totalPrices: number = 0;
  public products: any[] = [];
  public discountCode: string = '';
  public isButtonDisabled: boolean = true;

  constructor(
    private appComponent: AppComponent,
    private cartService: CartService,
    private productService: ProductService
  ) {
    this.appComponent.toggleHeaderAndFooter(false);
  }

  ngOnInit(): void {
    this.cartService.totalItems$.subscribe((totalItems) => {
      this.totalItems = totalItems;
      this.cartItems = this.getCartItems();
      this.updateTotalPrices();
      console.log(this.cartItems);
    });
    this.loadTotalItems();
    this.updateTotalPrices();

    this.products = this.productService.getAll();
  }

  ngOnDestroy() {
    this.appComponent.toggleHeaderAndFooter(true);
  }

  public onDiscountCodeChange() {
    this.isButtonDisabled = this.discountCode.trim() === '';
  }

  public toggleAddress() {
    this.useDifferentAddress = !this.useDifferentAddress;
  }

  public updateQuantity(idx: number, ev: any) {
    const newQuantity = parseInt(ev.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      this.cartItems[idx].quantity = newQuantity;
      this.cartItems[idx].totalPrice = this.cartItems[idx].price * newQuantity; // Cập nhật lại totalPrice

      this.saveToLocalStorage(this.cartItems);
      this.updateTotalItems();
      this.updateTotalPrices();
    }
  }

  private loadTotalItems() {
    const totalItemsString = localStorage.getItem('totalItems');
    this.totalItems =
      totalItemsString !== null ? JSON.parse(totalItemsString) : 0;
  }

  public getCartItems(): any[] {
    const cartInfoListString = localStorage.getItem('cartInfoList');
    if (cartInfoListString !== null) {
      return JSON.parse(cartInfoListString);
    } else {
      return [];
    }
  }

  public removeItemFromCart(index: number): void {
    const cartInfoListString = localStorage.getItem('cartInfoList');
    if (cartInfoListString !== null) {
      let cartInfoList = JSON.parse(cartInfoListString);

      // Xóa sản phẩm tại index
      cartInfoList.splice(index, 1);

      // Cập nhật lại localStorage
      localStorage.setItem('cartInfoList', JSON.stringify(cartInfoList));

      // Cập nhật cartItems và totalItems
      this.cartItems = cartInfoList;
      this.updateTotalItems();
      this.updateTotalPrices();
    }
  }

  public updateTotalItems(): void {
    let totalItems = 0;
    for (const item of this.cartItems) {
      totalItems += item.quantity;
    }
    localStorage.setItem('totalItems', totalItems.toString());
    this.cartService.updateTotalItems(totalItems);
  }

  public updateTotalPrices() {
    const cartInfoListString = localStorage.getItem('cartInfoList');
    if (cartInfoListString !== null) {
      const cartInfoList = JSON.parse(cartInfoListString);
      this.totalPrices = cartInfoList.reduce(
        (total: any, item: any) => total + (item.totalPrice || 0),
        0
      );
    } else {
      this.totalPrices = 0;
    }
  }

  private saveToLocalStorage(cartInfoList: any[]) {
    localStorage.setItem('cartInfoList', JSON.stringify(cartInfoList));
  }
}
