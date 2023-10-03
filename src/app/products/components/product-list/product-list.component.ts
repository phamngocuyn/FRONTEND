import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { take } from 'rxjs';
import { CartService } from 'src/app/core/services/cart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { EProductCategory } from 'src/app/shared/enums/producst.enum';
import { ChangeDetectorRef } from '@angular/core';
import { BannerService } from 'src/app/core/services/banner.service';
import { banner } from 'src/app/core/model/banner';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public listType: any = [];
  public listCatagory: any = [];
  public currentCategory!: EProductCategory;
  private isBrandPage: boolean = false;
  private newProduct: boolean = false;
  public page: number = 1;
  public totalLength: any;
  public mainImage: string = '';
  public selectedColor: string = '';
  public showInStock: boolean = false;
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

  public currentBanner: banner | undefined;
  public bannerlist: any;

  public orderby!: string;
  public listCategory: any[] = []
  public selectedFilters: any[] = [];


  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private elementRef: ElementRef,
    private cartService: CartService,
    private cdr: ChangeDetectorRef,
    private bannerService: BannerService,
  ) {}

  ngOnInit(): void {
    this.getCurrentCategory();

    this.loadData();
    
    this.minValue1 = Math.min(...this.prices);

    this.maxValue1 = Math.max(...this.prices);

    // if (this.isBrandPage) {
    //   this.listCatagory = this.productService.getProductType(this.currentCategory);
    //   this.bannerlist = this.bannerService.getBanner(this.currentCategory);
    // } else{
    //   this.listCatagory = this.productService.getProductCatagory(this.currentCategory);
    //   this.bannerlist = this.bannerService.getBanner(this.currentCategory);
    // }
    if (this.isBrandPage) {
      this.listCatagory = this.productService.getProductType(this.currentCategory);
      this.bannerlist = this.bannerService.getBanner(this.currentCategory);
    } else if (this.newProduct) {
      this.listCatagory = this.productService.getNewProduct(this.currentCategory);
      this.bannerlist = this.bannerService.getBanner(this.currentCategory);
    } else {
      this.listCatagory = this.productService.getProductCatagory(this.currentCategory);
      this.bannerlist = this.bannerService.getBanner(this.currentCategory);
    }    

    this.route.queryParams.subscribe(params => {
      const categories = params['categories'] || [];
      const brands = params['brands'] || [];
      const layouts = params['layouts'] || [];
      const types = params['types'] || [];
    
      this.listCatagory = this.productService.getProductsByFilters(
        categories,
        brands,
        layouts,
        types
      );
      this.selectedFilters = [...categories, ...brands, ...layouts, ...types];
    });   
  }

  // sort các sản phẩm
  sort(order: any){
    if(order == 'asc'){
      this.listCatagory.sort(
        (p1: any, p2: any) => {
          return p1.options[0].layout[0].optioncolor[0].optionswitch[0].price > 
                 p2.options[0].layout[0].optioncolor[0].optionswitch[0].price ? 1 : -1
        }
      )
    }else{
      this.listCatagory.sort(
        (p1: any, p2: any) => {
          return p1.options[0].layout[0].optioncolor[0].optionswitch[0].price > 
                 p2.options[0].layout[0].optioncolor[0].optionswitch[0].price ? -1 : 1
        }
      )
    }
  }

  sortAlphabetically(order: string) {
    if (order === 'asc') {
      this.listCatagory.sort((a: any, b: any) => a.name.localeCompare(b.name));
    } else if (order === 'dsc') {
      this.listCatagory.sort((a: any, b: any) => b.name.localeCompare(a.name));
    }
  }

  onClickRemoveQueryParam(filter: string) {
    const url = new URL(window.location.href);
  
    // Lấy query parameter từ URL
    const queryParams = new URLSearchParams(url.search);
  
    // Lặp qua tất cả các query parameter
    for (const key of queryParams.keys()) {
      const values = queryParams.getAll(key);
  
      // Lọc ra các giá trị không trùng khớp với filter
      const updatedValues = values.filter(value => value !== filter);
  
      // Cập nhật query parameter với các giá trị đã được cập nhật
      if (updatedValues.length > 0) {
        queryParams.set(key, updatedValues.join(',')); // Join lại thành một chuỗi
      } else {
        queryParams.delete(key);
      }
    }
  
    // Cập nhật URL trong trình duyệt
    url.search = queryParams.toString();
    window.history.replaceState({}, '', url.toString());
  
    // Cập nhật danh sách các danh mục, thương hiệu, bố cục và loại
    const categories = queryParams.getAll('categories') || [];
    const brands = queryParams.getAll('brands') || [];
    const layouts = queryParams.getAll('layouts') || [];
    const types = queryParams.getAll('types') || [];
  
    this.listCatagory = this.productService.getProductsByFilters(
      categories,
      brands,
      layouts,
      types
    );
  
    this.selectedFilters = [...categories, ...brands, ...layouts, ...types];
  }

  toggleFilter(filter: string) {
    const queryParams = { ...this.route.snapshot.queryParams };
    // Xóa bộ lọc trong danh sách queryParams
    if (queryParams[filter]) {
      delete queryParams[filter];
    }
    // Tạo một danh sách mới không chứa bộ lọc cần xóa
    this.selectedFilters = this.selectedFilters.filter(item => item !== filter);  
    // Cập nhật URL
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: Object.keys(queryParams).length > 0 ? queryParams : null, // Xóa toàn bộ queryParams nếu không còn phần tử nào
      queryParamsHandling: 'merge'
    });
  }
  
  private loadData() {
    this.brands = this.originalBrands = this.productService.getAll().map(product => product.brand);
    this.layouts = this.originalLayouts = this.productService.getLayoutNames();
    this.categories = this.originalCategories = this.productService.getAll().map(product => product.category);
    this.types = this.originalTypes = this.productService.getTypeNames();
    this.prices = this.productService.getPrices();
  
    this.brandCounts = this.getCounts(this.brands);
    this.layoutCounts = this.getCounts(this.layouts);
    this.categoryCounts = this.getCounts(this.categories);
    this.typeCounts = this.getCounts(this.types);
  }
  
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    const target = event.target as HTMLElement;

    if (!target.closest('.buttons')) {
      this.showBrands = this.showLayouts = this.showCategories = this.showTypes = this.showPrices = false;
    }
  }

  

  public updateSliderValues(index: number) {
    this.rangeValues[index] = Number(this.rangeValues[index]); 
  }

  public updateInputValues() {
    this.rangeValues = [...this.rangeValues];
  }

  

  public toggleList(listName: string) {
    this.currentListName = listName;
    if (listName === 'brands') {
      this.showBrands = !this.showBrands;
      this.showLayouts = this.showCategories = this.showTypes = this.showPrices = false;
    } else if (listName === 'layouts') {
      this.showLayouts = !this.showLayouts;
      this.showBrands = this.showCategories = this.showTypes = this.showPrices = false;
    } else if (listName === 'categories') {
      this.showCategories = !this.showCategories;
      this.showBrands = this.showLayouts = this.showTypes = this.showPrices = false;
    } else if (listName === 'types') {
      this.showTypes = !this.showTypes;
      this.showBrands = this.showLayouts = this.showCategories = this.showPrices = false;
    } else if (listName === 'prices') {
      this.showPrices = !this.showPrices;
      this.showBrands = this.showLayouts = this.showCategories = this.showTypes = false;
    }
  }

  public getListToShow(listName: string) {
    if (listName === 'brands') {
      return this.getUniqueItems(this.brands);
    } else if (listName === 'layouts') {
      return this.getUniqueItems(this.layouts);
    } else if (listName === 'categories') {
      return this.getUniqueItems(this.categories);
    } else if (listName === 'types') {
      return this.getUniqueItems(this.types);
    }
    return [];
  }

  //querry parameter to route  
  public selectItem(item: string, listName: string) {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      const updatedParams = { ...params };
  
      if (!updatedParams[listName] || !updatedParams[listName].includes(item)) {
        // Nếu chưa có hoặc không chứa item, thêm vào mảng
        updatedParams[listName] = updatedParams[listName] ? [...updatedParams[listName], item] : [item];
  
        // Sử dụng router.navigate để cập nhật URL với updatedParams
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: updatedParams,
          queryParamsHandling: 'merge'
        });
      }
    });
  }
  

  public getUniqueItems(data: string[]) {
    return Array.from(new Set(data));
  }

  private getCounts(data: string[]) {
    const counts: Record<string, number> = {};
    data.forEach(item => {
      counts[item] = (counts[item] || 0) + 1;
    });
    return counts;
  }

  public getCountForItem(item: string, listName: string) {
    if (listName === 'brands') {
      return this.brandCounts[item];
    } else if (listName === 'layouts') {
      return this.layoutCounts[item];
    } else if (listName === 'categories') {
      return this.categoryCounts[item];
    } else if (listName === 'types') {
      return this.typeCounts[item];
    }
    return 0;
  }

  //Hiển thị tên trên sắp xếp
  public updateSort(sortValue: string) {
    this.selectedSort = sortValue;
  }


  //show sản phẩm 
  public getCurrentCategory() {
    const currentUrl = this.router.url;

    if (currentUrl.includes("/BAN_PHIM")) {
      this.currentCategory = EProductCategory.BAN_PHIM;
      return;
    }

    if (currentUrl.includes("/CHUOT")) {
      this.currentCategory = EProductCategory.CHUOT;
      return;
    }

    if (currentUrl.includes("/LOT_CHUOT")) {
      this.currentCategory = EProductCategory.LOT_CHUOT;
      return;
    }

    if (currentUrl.includes("/FEET_CHUOT")) {
      this.currentCategory = EProductCategory.FEET_CHUOT;
      return;
    }

    if (currentUrl.includes("/SWITCH_LUBE")) {
      this.currentCategory = EProductCategory.SWITCH_LUBE;
      return;
    }

    if (currentUrl.includes("/new_product")) {
      this.newProduct = true;
      this.currentCategory = EProductCategory.new_product;
      return;
    }

    this.route.params.pipe().subscribe((res) => {
      if (res["type"]) {
        this.isBrandPage = true;
        // ChỖ NÀY SAU KHI ĐỊNH NGHĨA BẢNG BRANDS THÌ SẼ GÁN brandId
        this.currentCategory = res["type"];
      }
    })
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