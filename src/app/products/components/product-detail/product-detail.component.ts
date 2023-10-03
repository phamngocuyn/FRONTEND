import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'src/app/core/model/product';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public product: data | undefined;
  quantity: number = 1;
  showMore: boolean = false;
  showComment: boolean = false;
  addedCartItem: any;

  public selectedColorItem: any | null = null;
  public selectedColor: string = '';
  public selectedSwitches: any[] | null = null;
  public selectedSwitchItem: any | null = null;
  public selectedSwitch: string | null = null;
  public selectedLayout: string | null = null;
  public selectedPrice: number | null = null;
  public selectedSwitchId: any | null = null;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      const url = param['route'];
      console.log(url)
      const layoutPath = param['path'];
      console.log(layoutPath);
      if (url) {
        this.product = this.productService.getProductById(url);
        this.setDefaultColorAndSwitches();
      }
      if (layoutPath) {
        this.product = this.productService.getProductById(layoutPath);
        this.setDefaultColorAndSwitches();
      }
    });
  }

  selectLayoutPath(layoutItem: any) {
    this.router.navigate(['BAN_PHIM/product-detail', layoutItem.path]);
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  toggleShowMore() {
    this.showMore = !this.showMore;
  }

  toggleShowComment(){
    this.showComment = !this.showComment;
  }

  public selectColor(colorItem: any){
    this.selectedColor = colorItem.name;
    this.selectedColorItem = colorItem;
    this.selectedSwitches = colorItem.optionswitch;
    this.setDefaultSwitch();
  }

  selectLayout(layoutItem: any){
    this.selectedLayout = layoutItem.name
  }

  public selectSwitch(switchItem: any) {
    this.selectedSwitch = switchItem.name;
    this.selectedSwitchItem = switchItem;
    this.selectedPrice = switchItem.price;
    this.selectedSwitchId = switchItem.id;
  }

  public setDefaultSwitch() {
    const defaultSwitch = this.selectedSwitches?.[0]?.name;
    this.selectedSwitch = defaultSwitch || '';
  }

  public setDefaultColorAndSwitches() {
    const defaultColor = this.product?.options[0]?.layout[0]?.optioncolor[0];
    this.selectedColor = defaultColor?.name || '';
    this.selectedColorItem = defaultColor || null;
    this.selectedSwitches = defaultColor?.optionswitch || null;
    this.setDefaultSwitch();
  }

  public shouldApplyBoxShadow(colorItem: any): boolean {
    return this.selectedColorItem === colorItem || (this.selectedColorItem === null && colorItem === this.product?.options[0]?.layout[0]?.optioncolor[0]);
  }

  public shouldApplySwitchBoxShadow(switchItem: any): boolean {
    if (!this.selectedSwitchItem) {
      const firstSwitch = this.selectedSwitches?.[0];
      if (firstSwitch) {
        this.selectedSwitchItem = firstSwitch;
        return true;
      }
    }
    return this.selectedSwitchItem === switchItem;
  }

  urlItem!: string;
  public handleColorItemClick(colorItem: any) {
    this.selectedColor = colorItem.name;
    this.urlItem = colorItem.url;
    this.selectedSwitches = colorItem.optionswitch;
    this.setDefaultSwitch();
    this.selectedSwitchItem = colorItem.optionswitch[0];
    this.selectedPrice = colorItem.optionswitch[0].price;
  }

  public selectBuy(){
    const cartInfo = {
      productId: this.product?.id,
      imageUrl: this.urlItem || this.product?.options[0]?.layout[0]?.optioncolor[0]?.url,
      name: this.product?.name,
      price: this.selectedPrice || this.product?.options[0]?.layout[0]?.optioncolor[0]?.optionswitch[0]?.price,
      layout: this.selectedLayout || ((this.product?.options[0]?.layout)? this.product?.options[0]?.layout[0].name : ""),
      color: this.selectedColor || this.product?.options[0]?.layout[0]?.optioncolor[0]?.name,
      switch: this.selectedSwitch || this.product?.options[0]?.layout[0]?.optioncolor[0]?.optionswitch[0]?.name,
      switchId: this.selectedSwitchId,
      quantity: this.quantity 
    };
    
    this.addedCartItem = cartInfo;
    this.saveToLocalStorage(cartInfo);
    // Lấy cartInfoList từ localStorage
    const cartInfoList = JSON.parse(localStorage.getItem('cartInfoList') || '[]');
    let totalItems = 0;
    // Tính tổng số lượng sản phẩm
    for (const item of cartInfoList) {
        totalItems += item.quantity;
    }
    // Cập nhật tổng số lượng sản phẩm
    this.cartService.updateTotalItems(totalItems);
    this.cdr.detectChanges();
  }

  private saveToLocalStorage(cartInfo: any) {
    let cartInfoList = JSON.parse(localStorage.getItem('cartInfoList') || '[]');
    
    const existingProductIndex = cartInfoList.findIndex((item: any) => 
                                 item.productId === cartInfo.productId && item.switchId === cartInfo.switchId);
  
    if (existingProductIndex > -1) {
      cartInfoList[existingProductIndex].quantity += 1;
      cartInfoList[existingProductIndex].totalPrice = cartInfoList[existingProductIndex].price * cartInfoList[existingProductIndex].quantity;
    } else {
      cartInfo.totalPrice = cartInfo.price;
      cartInfoList.push(cartInfo);
    }
  
    localStorage.setItem('cartInfoList', JSON.stringify(cartInfoList));
    this.updateTotalItemsInLocalStorage(cartInfoList);
  }

  private updateTotalItemsInLocalStorage(cartInfoList: any[]) {
    let totalItems = 0;
    for (const item of cartInfoList) {
        totalItems += item.quantity;
    }
    localStorage.setItem('totalItems', totalItems.toString());
  }


}
