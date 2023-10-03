import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartItems: any[] = [];
  totalItems: number = 0;
  totalPrices: number = 0;
  products: any[] = [];
  hasSearched: boolean = false;

  constructor(private cartService: CartService,
              private productService: ProductService
    ) { }

  ngOnInit(): void {
    this.cartService.totalItems$.subscribe(totalItems => {
      this.totalItems = totalItems;
      this.cartItems = this.getCartItems();
      this.updateTotalPrices();
    });
    this.loadTotalItems();
    this.updateTotalPrices();

    this.products = this.productService.getAll();
  }

  // Thêm hàm searchProducts
  searchProducts(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const query = inputElement.value;

    if (query.trim() !== '') {
      this.products = this.productService.getAll().filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase())
      );
      this.hasSearched = true; // Đã tìm kiếm
    } else {
      this.products = [];
      this.hasSearched = false; // Reset khi trống input
    }
  }
  
  updateQuantity(idx: number, ev: any) {
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
    this.totalItems = totalItemsString !== null ? JSON.parse(totalItemsString) : 0;
  }
  
  getCartItems(): any[] {
    const cartInfoListString = localStorage.getItem('cartInfoList');
    if (cartInfoListString !== null) {
      return JSON.parse(cartInfoListString);
    } else {
      return [];
    }
  }

  removeItemFromCart(index: number): void {
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

  updateTotalItems(): void {
    let totalItems = 0;
    for (const item of this.cartItems) {
        totalItems += item.quantity;
    }
    localStorage.setItem('totalItems', totalItems.toString());
    this.cartService.updateTotalItems(totalItems);
  }

  updateTotalPrices() {
    const cartInfoListString = localStorage.getItem('cartInfoList');
    if (cartInfoListString !== null) {
      const cartInfoList = JSON.parse(cartInfoListString);
      this.totalPrices = cartInfoList.reduce((total: any, item: any) => total + (item.totalPrice || 0), 0);
    } else {
      this.totalPrices = 0;
    }
  }

  private saveToLocalStorage(cartInfoList: any[]) {
    localStorage.setItem('cartInfoList', JSON.stringify(cartInfoList));
  }


}
