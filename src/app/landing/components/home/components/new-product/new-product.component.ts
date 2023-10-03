import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { TypeService } from 'src/app/core/services/type.service';
import { EProductCategory } from 'src/app/shared/enums/producst.enum';

@Component({
  selector: 'app-new-product',
  templateUrl: './new-product.component.html',
  styleUrls: ['./new-product.component.scss']
})
export class NewProductComponent implements OnInit {

  newProduct: any = [];
  listType: any = [];
  public selectedColor: string = '';

  public listType1: any = [];//
  public listCatagory: any = [];
  public currentCategory!: EProductCategory;
  private isBrandPage: boolean = false;
  public page: number = 1;
  public totalLength: any;
  public mainImage: string = '';
  public selectedColor1: string = '';//
  public checked: boolean = false;
  public selectedSort!: string;
  public counts: any = [];
  public minValue1!: number;
  public maxValue1!: number;

  public brands: string[] = [];
  public layouts: string[] = [];
  public types: string[] = [];
  public categories: string[] = [];
  public prices: number[] = [];

  public brandCounts: Record<string, number> = {};
  public layoutCounts: Record<string, number> = {};
  public categoryCounts: Record<string, number> = {};
  public typeCounts: Record<string, number> = {};

  // Thêm mảng sao chép của danh sách gốc
  public originalBrands: string[] = [];
  public originalLayouts: string[] = [];
  public originalCategories: string[] = [];
  public originalTypes: string[] = [];

  public showBrands = false;
  public showLayouts = false;
  public showCategories = false;
  public showTypes = false;
  public showPrices = false;

  public selectedItem: any;
  public isCartOpen = false;
  public isOldCartOpen: boolean = false;
  public isNewCartOpen: boolean = false; // Để kiểm soát việc hiển thị cart model mới
  public i: number = 0;
  public addedCartItem: any;

  public selectedPrice: number | null = null;
  public selectedSwitch: string | null = null;
  public selectedLayout: string | null = null;
  public selectedSwitchItem: string | null = null;
  public selectedColorItem: any | null = null;
  public selectedlayoutItem: string | null = null;
  public selectedSwitches: any | null = null;
  public selectedSwitchId: number | null = null;

  public rangeValues: number[] = [this.minValue1, this.maxValue1];
  public minValue = this.minValue1;
  public maxValue = this.maxValue1;
  public currentListName!: string;

  public filteredProducts: any[] = [];

  public urlItem!: string;

  public orderby!: string;
  public listCategory: any[] = []
  public selectedFilters: any[] = [];

  constructor(
    private typeService : TypeService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.newProduct =this.productService.getAll()
    this.getListType();
  }
  
  getListType() {
    this.listType = this.typeService.getType();
  }

  public openCart(item: any){
    this.selectedItem = item;
    this.isCartOpen = true;
    if (item) {
      this.selectedItem = item;
      this.setDefaultSwitches(); // Gọi hàm setDefaultSwitches
      this.isCartOpen = true;
    }
  }

  closeCart() {
    this.selectedItem = null;
    this.isCartOpen = false;
  }

  public selectSwitch(switchItem: any) {
    this.selectedSwitch = switchItem.name;
    this.selectedSwitchItem = switchItem;
    this.selectedPrice = switchItem.price;
    this.selectedSwitchId = switchItem.id;
  }

  public setDefaultSwitches() {
    this.selectedSwitches = this.selectedItem?.options[0]?.layout[0]?.optioncolor[0]?.optionswitch;
  }

  public selectColor(colorItem: any){
    this.selectedColor = colorItem.name;
    this.selectedColorItem = colorItem;
  }

  public setDefaultSwitch() {
    const defaultSwitch = this.selectedItem?.options[0]?.layout[0]?.optioncolor.find((color : any) => color.name === this.selectedColor)?.optionswitch[0]?.name;
    this.selectedSwitch = defaultSwitch || '';
  }
  
  public selectLayout(layoutItem: any){
    this.selectedLayout = layoutItem.name;
    this.selectedlayoutItem = layoutItem;
  }

  public shouldApplyBoxShadow(colorItem: any): boolean {
    return this.selectedColorItem === colorItem || (this.selectedColorItem === null && colorItem === this.selectedItem?.options[0]?.layout[0]?.optioncolor[0]);
  }

  public shouldApplyLayoutBoxShadow(layoutItem: any): boolean {
    return this.selectedlayoutItem === layoutItem || (this.selectedlayoutItem === null && layoutItem === this.selectedItem?.options[0]?.layout[0]);
  }

  public shouldApplySwitchBoxShadow(switchItem: any): boolean {
    if (!this.selectedSwitchItem) {
      const firstColor = this.selectedItem?.options[0]?.layout[0]?.optioncolor[0];
      const firstSwitch = firstColor?.optionswitch[0];
      if (firstSwitch) {
        this.selectedSwitchItem = firstSwitch;
        return true;
      }
    }
    return this.selectedSwitchItem === switchItem;
  }  

  
  public handleColorItemClick(colorItem: any) {
    this.selectedColor = colorItem.name;
    this.urlItem = colorItem.url;
    this.selectedSwitches = colorItem.optionswitch;
    this.setDefaultSwitch();
    this.selectedSwitchItem = colorItem.optionswitch[0];
    this.selectedPrice = colorItem.optionswitch[0].price;
  }

  public selectBuy(){
    this.isOldCartOpen = false;
    this.isNewCartOpen = true;
    const cartInfo = {
      productId: this.selectedItem?.id,
      imageUrl: this.urlItem || this.selectedItem?.options[0]?.layout[0]?.optioncolor[0]?.url,
      name: this.selectedItem?.name,
      price: this.selectedPrice || this.selectedItem?.options[0]?.layout[0]?.optioncolor[0]?.optionswitch[0]?.price,
      layout: this.selectedLayout || ((this.selectedItem?.options[0]?.layout).length < 2 ? this.selectedItem?.options[0]?.layout[0].name : ""),
      color: this.selectedColor || this.selectedItem?.options[0]?.layout[0]?.optioncolor[0]?.name,
      switch: this.selectedSwitch || this.selectedItem?.options[0]?.layout[0]?.optioncolor[0]?.optionswitch[0]?.name,
      switchId: this.selectedSwitchId,
      quantity: 1 
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

  public changeMainImage(url: string) {
    this.mainImage = url;
    this.selectedColor = url;
  }

}
