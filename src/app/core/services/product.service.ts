
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { data } from '../model/product';
import { EProductCategory } from 'src/app/shared/enums/producst.enum';
import { ActivatedRoute } from '@angular/router';




@Injectable()
export class ProductService {
  
  constructor(
    private http : HttpClient,
    private route: ActivatedRoute
  ) {}
    
  getProductCatagory(category: EProductCategory){
    return this.getAll().filter(x => x.category === category);
  }

  getProductType(brand: string){
    return this.getAll().filter(x => x.brand === brand);
  }

  getNewProduct(newproduct: string){
    return this.getAll().filter(x => x.newproduct === newproduct);
  }

  getLayoutNames(): string[] {
    let layoutNames: string[] = [];

    this.getAll().map(p => 
      p.options[0].layout.forEach(option => 
        layoutNames.push(option.name)));

    return layoutNames;
  }

  getTypeNames(): string[] {
    let typeNames: string[] = [];

    this.getAll().map(p => 
      p.type.forEach(option => 
        typeNames.push(option.name)));

    return typeNames;
  }

  getPrices(): number[] {
    let namePrice: number[] = [];
    this.getAll().map(p => 
      p.options.forEach(p => 
          p.layout.forEach(p =>
            p.optioncolor.forEach(p => 
              p.optionswitch.forEach(p => 
                namePrice.push(p.price)
              )
            )
          )
        )
      );
      return namePrice;
  }

  getOptionUrl(): string[] {
    let listUrl: string[] = [];
    this.getAll().map(p => 
      p.options.forEach(p => 
          p.layout.forEach(p =>
            p.optioncolor.forEach(p => 
              listUrl.push(p.url)
            )
          )
        )
      );
      return listUrl;
  }

  getProductById(route: string): data{
    return this.getAll().find(p => 
      p.route = route
    )!
  }

  // getProductByPath(path: string) {
  //   const productWithMatchingPath = this.getAll().map(p => );
  //   return productWithMatchingPath;
  // }

  getProductsByFilters(categories: string[], brands: string[], layouts: string[], types: string[]): data[] {
    return this.getAll().filter(product => {
      const matchCategories = !categories || categories.length === 0 || categories.includes(product.category);
      const matchBrands = !brands || brands.length === 0 || brands.includes(product.brand);

      const matchLayouts = !layouts || layouts.length === 0 || product.options.some(option => {
        return option.layout.some(layout => layouts.includes(layout.name));
      });

      const matchTypes = !types || types.length === 0 || product.type.some(type => types.includes(type.name));

      return matchCategories && matchBrands && matchLayouts && matchTypes;
    });
  }

  getAll():data[]{
    return[
      {
        id: 0,  
        category: EProductCategory.BAN_PHIM,
        urlBanner: "//cdn.shopify.com/s/files/1/0636/9044/0949/collections/ban_phim_co_filco.jpg?v=1677060694&width=3200",
        brand: "filco",
        name: "ABàn phím cơ Filco Majestouch Convertible 3 Matcha - Tenkeyless",
        route: "filco-majestouch-convertible-3-fullsize",
        statusProduct: "còn 3 sản phẩm",
        newproduct: EProductCategory.new_product,
        layouts: [
          {
            id: 1,
            name: "Fullsize",
            path: "filco-majestouch-convertible-3-fullsize"
          },
          {
            id: 2,
            name: "Mini",
            path: "filco-majestouch-convertible-3-mini"
          }
        ],
        url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
        introduce: "Là thương hiệu bàn phím cơ Nhật Bản được thành lập năm 1992, Filco luôn biết làm gì để những mẫu bàn phím cơ của mình bền nhất và luôn là trợ thủ đáng tin cậy trong mọi môi trường làm việc cũng như giải trí tại nhà.",
        relatedProducts: "Ngoài bàn phím cơ, Filco còn có các phụ kiện giúp hỗ trợ sử dụng bàn phím được thoải mái hơn như kê tay,  phụ kiện vệ sinh, keycap,...",
        type: [
          {
            id: 1,
            name: "Fullsize"
          },
          {
            id: 1,
            name: "Mini"
          }
        ],
        groupimage: [

        ],
        options: [
          {
            layout: [
              {
                id: 1,
                name: 'Mini',
                optioncolor: [
                  {
                    id: 1,
                    name: "black1",
                    url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn1',
                        price: 120000
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue1',
                        price: 12
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red1',
                        price: 2000000
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: "white1",
                    url: "https://banphimco.com/wp-content/uploads/2019/12/ban-phim-co-filco-convertible-2.jpg",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 123183
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 123279
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 1237632
                      }
                    ]
                  }
                ]
              },
      
            ]
          }

        ],

      },
      {
        id: 1,  
        category: EProductCategory.BAN_PHIM,
        urlBanner: "//cdn.shopify.com/s/files/1/0636/9044/0949/collections/ban_phim_co_filco.jpg?v=1677060694&width=3200",
        brand: "logitech",
        name: "Bàn phím cơ Glorious GMMK 2 Fullsize 96% - Pre-built",
        route: "filco-majestouch-convertible-3-mini",
        statusProduct: "còn 1 sản phẩm",
        newproduct: EProductCategory.new_product,
        layouts: [
          {
            id: 1,
            name: "Fullsize",
            path: "filco-majestouch-convertible-3-fullsize"
          },
          {
            id: 2,
            name: "Mini",
            path: "filco-majestouch-convertible-3-mini"
          }
        ],
        url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
        introduce: "Là thương hiệu bàn phím cơ Nhật Bản được thành lập năm 1992, Filco luôn biết làm gì để những mẫu bàn phím cơ của mình bền nhất và luôn là trợ thủ đáng tin cậy trong mọi môi trường làm việc cũng như giải trí tại nhà.",
        relatedProducts: "Ngoài bàn phím cơ, Filco còn có các phụ kiện giúp hỗ trợ sử dụng bàn phím được thoải mái hơn như kê tay,  phụ kiện vệ sinh, keycap,...",
        type: [
          {
            id: 1,
            name: "Fullsize"
          },
          {
            id: 1,
            name: "Mini"
          }
        ],
        groupimage: [

        ],
        options: [
          {
            layout: [
              {
                id: 1,
                name: 'Mini',
                optioncolor: [
                  {
                    id: 1,
                    name: "black",
                    url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 120050
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 12
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 2000100
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: "white",
                    url: "https://banphimco.com/wp-content/uploads/2019/12/ban-phim-co-filco-convertible-2.jpg",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 123164
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 123232
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 1237632
                      }
                    ]
                  }
                ]
              },
            ]
          }

        ],

      },
      {
        id: 2,  
        category: EProductCategory.BAN_PHIM,
        urlBanner: "//cdn.shopify.com/s/files/1/0636/9044/0949/collections/ban_phim_co_filco.jpg?v=1677060694&width=3200",
        brand: "filco",
        name: "Bàn phím cơ Glorious GMMK 2 Fullsize 100% - Pre-built",
        route: "filco-majestouch-convertible-3-fullsize1",
        statusProduct: "hết hàng",
        newproduct:"",
        layouts: [
          {
            id: 1,
            name: "Fullsize",
            path: "filco-majestouch-convertible-3-fullsize1"
          },
          {
            id: 2,
            name: "Mini",
            path: "filco-majestouch-convertible-3-mini1"
          }
        ],
        url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
        introduce: "Là thương hiệu bàn phím cơ Nhật Bản được thành lập năm 1992, Filco luôn biết làm gì để những mẫu bàn phím cơ của mình bền nhất và luôn là trợ thủ đáng tin cậy trong mọi môi trường làm việc cũng như giải trí tại nhà.",
        relatedProducts: "Ngoài bàn phím cơ, Filco còn có các phụ kiện giúp hỗ trợ sử dụng bàn phím được thoải mái hơn như kê tay,  phụ kiện vệ sinh, keycap,...",
        type: [
          {
            id: 1,
            name: "Fullsize"
          },
          {
            id: 1,
            name: "Mini"
          }
        ],
        groupimage: [

        ],
        options: [
          {
            layout: [
              {
                id: 1,
                name: 'Mini',
                optioncolor: [
                  {
                    id: 1,
                    name: "black",
                    url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 120050
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 12
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 2000100
                      }
                    ]
                  }
                ]
              },
            ]
          }

        ],
      },
      {
        id: 0,  
        category: EProductCategory.BAN_PHIM,
        urlBanner: "//cdn.shopify.com/s/files/1/0636/9044/0949/collections/ban_phim_co_filco.jpg?v=1677060694&width=3200",
        brand: "filco",
        name: "Bàn phím cơ Filco Majestouch Convertible 3 Matcha - Tenkeyless",
        route: "filco-majestouch-convertible-3-mini1",
        statusProduct: "còn 2 sản phẩm",
        newproduct: EProductCategory.new_product,
        layouts: [
          {
            id: 1,
            name: "Fullsize",
            path: "filco-majestouch-convertible-3-fullsize1"
          },
          {
            id: 2,
            name: "Mini",
            path: "filco-majestouch-convertible-3-mini1"
          }
        ],
        url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
        introduce: "Là thương hiệu bàn phím cơ Nhật Bản được thành lập năm 1992, Filco luôn biết làm gì để những mẫu bàn phím cơ của mình bền nhất và luôn là trợ thủ đáng tin cậy trong mọi môi trường làm việc cũng như giải trí tại nhà.",
        relatedProducts: "Ngoài bàn phím cơ, Filco còn có các phụ kiện giúp hỗ trợ sử dụng bàn phím được thoải mái hơn như kê tay,  phụ kiện vệ sinh, keycap,...",
        type: [
          {
            id: 1,
            name: "Fullsize"
          },
          {
            id: 1,
            name: "Mini"
          }
        ],
        groupimage: [

        ],
        options: [
          {
            layout: [
              {
                id: 1,
                name: 'Mini',
                optioncolor: [
                  {
                    id: 1,
                    name: "black",
                    url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn1',
                        price: 120000
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue1',
                        price: 12
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red1',
                        price: 2000000
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: "white",
                    url: "https://banphimco.com/wp-content/uploads/2019/12/ban-phim-co-filco-convertible-2.jpg",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 123183
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 123279
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 1237632
                      }
                    ]
                  }
                ]
              },
              {
                id: 2,
                name: 'Fullsize',
                optioncolor: [
                  {
                    id: 1,
                    name: "red",
                    url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 140028
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 1636272
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 138874
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: "white",
                    url: "https://banphimco.com/wp-content/uploads/2019/12/ban-phim-co-filco-convertible-2.jpg",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 199880
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 12
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 3934902
                      }
                    ]
                  }
                ]
              }
            ]
          }

        ],

      },
      {
        id: 1,  
        category: EProductCategory.BAN_PHIM,
        urlBanner: "//cdn.shopify.com/s/files/1/0636/9044/0949/collections/ban_phim_co_filco.jpg?v=1677060694&width=3200",
        brand: "logitech",
        name: "Bàn phím cơ Glorious GMMK 2 Fullsize 96% - Pre-built",
        route: "filco-majestouch-convertible-3-fullsize2",
        statusProduct: "hết hàng",
        newproduct: EProductCategory.new_product,
        layouts: [
          {
            id: 1,
            name: "Fullsize",
            path: "filco-majestouch-convertible-3-fullsize2"
          },
          {
            id: 2,
            name: "Mini",
            path: "filco-majestouch-convertible-3-mini2"
          }
        ],
        url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
        introduce: "Là thương hiệu bàn phím cơ Nhật Bản được thành lập năm 1992, Filco luôn biết làm gì để những mẫu bàn phím cơ của mình bền nhất và luôn là trợ thủ đáng tin cậy trong mọi môi trường làm việc cũng như giải trí tại nhà.",
        relatedProducts: "Ngoài bàn phím cơ, Filco còn có các phụ kiện giúp hỗ trợ sử dụng bàn phím được thoải mái hơn như kê tay,  phụ kiện vệ sinh, keycap,...",
        type: [
          {
            id: 1,
            name: "Fullsize"
          },
          {
            id: 1,
            name: "Mini"
          }
        ],
        groupimage: [

        ],
        options: [
          {
            layout: [
              {
                id: 1,
                name: 'Mini',
                optioncolor: [
                  {
                    id: 1,
                    name: "black",
                    url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 120050
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 12
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 2000100
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: "white",
                    url: "https://banphimco.com/wp-content/uploads/2019/12/ban-phim-co-filco-convertible-2.jpg",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 123164
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 123232
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 1237632
                      }
                    ]
                  }
                ]
              },
            ]
          }

        ],

      },
      {
        id: 2,  
        category: EProductCategory.BAN_PHIM,
        urlBanner: "//cdn.shopify.com/s/files/1/0636/9044/0949/collections/ban_phim_co_filco.jpg?v=1677060694&width=3200",
        brand: "filco",
        name: "Bàn phím cơ Glorious GMMK 2 Fullsize 100% - Pre-built",
        route: "filco-majestouch-convertible-3-mini2",
        statusProduct: "còn 3 sản phẩm",
        newproduct: EProductCategory.new_product,
        layouts: [
          {
            id: 1,
            name: "Fullsize",
            path: "filco-majestouch-convertible-3-fullsize2"
          },
          {
            id: 2,
            name: "Mini",
            path: "filco-majestouch-convertible-3-mini2"
          }
        ],
        url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
        introduce: "Là thương hiệu bàn phím cơ Nhật Bản được thành lập năm 1992, Filco luôn biết làm gì để những mẫu bàn phím cơ của mình bền nhất và luôn là trợ thủ đáng tin cậy trong mọi môi trường làm việc cũng như giải trí tại nhà.",
        relatedProducts: "Ngoài bàn phím cơ, Filco còn có các phụ kiện giúp hỗ trợ sử dụng bàn phím được thoải mái hơn như kê tay,  phụ kiện vệ sinh, keycap,...",
        type: [
          {
            id: 1,
            name: "Fullsize"
          },
          {
            id: 1,
            name: "Mini"
          }
        ],
        groupimage: [

        ],
        options: [
          {
            layout: [
              {
                id: 1,
                name: 'Mini',
                optioncolor: [
                  {
                    id: 1,
                    name: "black",
                    url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 120050
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 12
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 2000100
                      }
                    ]
                  }
                ]
              },
            ]
          }

        ],
      },
      {
        id: 0,  
        category: EProductCategory.BAN_PHIM,
        urlBanner: "//cdn.shopify.com/s/files/1/0636/9044/0949/collections/ban_phim_co_filco.jpg?v=1677060694&width=3200",
        brand: "filco",
        name: "Bàn phím cơ Filco Majestouch Convertible 3 Matcha - Tenkeyless",
        route: "filco-majestouch-convertible-3-fullsize3",
        statusProduct: "còn 3 sản phẩm",
        newproduct: EProductCategory.new_product,
        layouts: [
          {
            id: 1,
            name: "Fullsize",
            path: "filco-majestouch-convertible-3-fullsize3"
          },
          {
            id: 2,
            name: "Mini",
            path: "filco-majestouch-convertible-3-mini3"
          }
        ],
        url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
        introduce: "Là thương hiệu bàn phím cơ Nhật Bản được thành lập năm 1992, Filco luôn biết làm gì để những mẫu bàn phím cơ của mình bền nhất và luôn là trợ thủ đáng tin cậy trong mọi môi trường làm việc cũng như giải trí tại nhà.",
        relatedProducts: "Ngoài bàn phím cơ, Filco còn có các phụ kiện giúp hỗ trợ sử dụng bàn phím được thoải mái hơn như kê tay,  phụ kiện vệ sinh, keycap,...",
        type: [
          {
            id: 1,
            name: "Fullsize"
          },
          {
            id: 1,
            name: "Mini"
          }
        ],
        groupimage: [

        ],
        options: [
          {
            layout: [
              {
                id: 1,
                name: 'Mini',
                optioncolor: [
                  {
                    id: 1,
                    name: "black",
                    url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn1',
                        price: 120000
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue1',
                        price: 12
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red1',
                        price: 2000000
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: "white",
                    url: "https://banphimco.com/wp-content/uploads/2019/12/ban-phim-co-filco-convertible-2.jpg",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 123183
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 123279
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 1237632
                      }
                    ]
                  }
                ]
              },
              {
                id: 2,
                name: 'Fullsize',
                optioncolor: [
                  {
                    id: 1,
                    name: "red",
                    url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 140028
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 1636272
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 138874
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: "white",
                    url: "https://banphimco.com/wp-content/uploads/2019/12/ban-phim-co-filco-convertible-2.jpg",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 199880
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 12
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 3934902
                      }
                    ]
                  }
                ]
              }
            ]
          }

        ],

      },
      {
        id: 1,  
        category: EProductCategory.BAN_PHIM,
        urlBanner: "//cdn.shopify.com/s/files/1/0636/9044/0949/collections/ban_phim_co_filco.jpg?v=1677060694&width=3200",
        brand: "logitech",
        name: "Bàn phím cơ Glorious GMMK 2 Fullsize 96% - Pre-built",
        route: "filco-majestouch-convertible-3-mini3",
        statusProduct: "hết hàng",
        newproduct: EProductCategory.new_product,
        layouts: [
          {
            id: 1,
            name: "Fullsize",
            path: "filco-majestouch-convertible-3-fullsize3"
          },
          {
            id: 2,
            name: "Mini",
            path: "filco-majestouch-convertible-3-mini3"
          }
        ],
        url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
        introduce: "Là thương hiệu bàn phím cơ Nhật Bản được thành lập năm 1992, Filco luôn biết làm gì để những mẫu bàn phím cơ của mình bền nhất và luôn là trợ thủ đáng tin cậy trong mọi môi trường làm việc cũng như giải trí tại nhà.",
        relatedProducts: "Ngoài bàn phím cơ, Filco còn có các phụ kiện giúp hỗ trợ sử dụng bàn phím được thoải mái hơn như kê tay,  phụ kiện vệ sinh, keycap,...",
        type: [
          {
            id: 1,
            name: "Fullsize"
          },
          {
            id: 1,
            name: "Mini"
          }
        ],
        groupimage: [

        ],
        options: [
          {
            layout: [
              {
                id: 1,
                name: 'Mini',
                optioncolor: [
                  {
                    id: 1,
                    name: "black",
                    url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 120050
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 12
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 2000100
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: "white",
                    url: "https://banphimco.com/wp-content/uploads/2019/12/ban-phim-co-filco-convertible-2.jpg",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 123164
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 123232
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 1237632
                      }
                    ]
                  }
                ]
              },
            ]
          }

        ],

      },
      {
        id: 2,  
        category: EProductCategory.BAN_PHIM,
        urlBanner: "//cdn.shopify.com/s/files/1/0636/9044/0949/collections/ban_phim_co_filco.jpg?v=1677060694&width=3200",
        brand: "filco",
        name: "Bàn phím cơ Glorious GMMK 2 Fullsize 100% - Pre-built",
        route: "filco-majestouch-convertible-3-fullsize4",
        statusProduct: "còn 3 sản phẩm",
        newproduct:"",
        layouts: [
          {
            id: 1,
            name: "Fullsize",
            path: "filco-majestouch-convertible-3-fullsize4"
          },
          {
            id: 2,
            name: "Mini",
            path: "filco-majestouch-convertible-3-mini4"
          }
        ],
        url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
        introduce: "Là thương hiệu bàn phím cơ Nhật Bản được thành lập năm 1992, Filco luôn biết làm gì để những mẫu bàn phím cơ của mình bền nhất và luôn là trợ thủ đáng tin cậy trong mọi môi trường làm việc cũng như giải trí tại nhà.",
        relatedProducts: "Ngoài bàn phím cơ, Filco còn có các phụ kiện giúp hỗ trợ sử dụng bàn phím được thoải mái hơn như kê tay,  phụ kiện vệ sinh, keycap,...",
        type: [
          {
            id: 1,
            name: "Fullsize"
          },
          {
            id: 1,
            name: "Mini"
          }
        ],
        groupimage: [

        ],
        options: [
          {
            layout: [
              {
                id: 1,
                name: 'Mini',
                optioncolor: [
                  {
                    id: 1,
                    name: "black",
                    url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 120050
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 12
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 2000100
                      }
                    ]
                  }
                ]
              },
            ]
          }

        ],
      },
      {
        id: 0,  
        category: EProductCategory.BAN_PHIM,
        urlBanner: "//cdn.shopify.com/s/files/1/0636/9044/0949/collections/ban_phim_co_filco.jpg?v=1677060694&width=3200",
        brand: "filco",
        name: "Bàn phím cơ Filco Majestouch Convertible 3 Matcha - Tenkeyless",
        route: "filco-majestouch-convertible-3-mini4",
        statusProduct: "còn 3 sản phẩm",
        newproduct:"",
        layouts: [
          {
            id: 1,
            name: "Fullsize",
            path: "filco-majestouch-convertible-3-fullsize4"
          },
          {
            id: 2,
            name: "Mini",
            path: "filco-majestouch-convertible-3-mini4"
          }
        ],
        url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
        introduce: "Là thương hiệu bàn phím cơ Nhật Bản được thành lập năm 1992, Filco luôn biết làm gì để những mẫu bàn phím cơ của mình bền nhất và luôn là trợ thủ đáng tin cậy trong mọi môi trường làm việc cũng như giải trí tại nhà.",
        relatedProducts: "Ngoài bàn phím cơ, Filco còn có các phụ kiện giúp hỗ trợ sử dụng bàn phím được thoải mái hơn như kê tay,  phụ kiện vệ sinh, keycap,...",
        type: [
          {
            id: 1,
            name: "Fullsize"
          },
          {
            id: 1,
            name: "Mini"
          }
        ],
        groupimage: [

        ],
        options: [
          {
            layout: [
              {
                id: 1,
                name: 'Mini',
                optioncolor: [
                  {
                    id: 1,
                    name: "black",
                    url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn1',
                        price: 120000
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue1',
                        price: 12
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red1',
                        price: 2000000
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: "white",
                    url: "https://banphimco.com/wp-content/uploads/2019/12/ban-phim-co-filco-convertible-2.jpg",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 123183
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 123279
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 1237632
                      }
                    ]
                  }
                ]
              },
              {
                id: 2,
                name: 'Fullsize',
                optioncolor: [
                  {
                    id: 1,
                    name: "red",
                    url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 140028
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 1636272
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 138874
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: "white",
                    url: "https://banphimco.com/wp-content/uploads/2019/12/ban-phim-co-filco-convertible-2.jpg",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 199880
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 12
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 3934902
                      }
                    ]
                  }
                ]
              }
            ]
          }

        ],

      },
      {
        id: 1,  
        category: EProductCategory.BAN_PHIM,
        urlBanner: "//cdn.shopify.com/s/files/1/0636/9044/0949/collections/ban_phim_co_filco.jpg?v=1677060694&width=3200",
        brand: "logitech",
        name: "Bàn phím cơ Glorious GMMK 2 Fullsize 96% - Pre-built",
        route: "filco-majestouch-convertible-3-fullsize5",
        statusProduct: "còn 3 sản phẩm",
        newproduct:"",
        layouts: [
          {
            id: 1,
            name: "Fullsize",
            path: "filco-majestouch-convertible-3-fullsize5"
          },
          {
            id: 2,
            name: "Mini",
            path: "filco-majestouch-convertible-3-mini5"
          }
        ],
        url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
        introduce: "Là thương hiệu bàn phím cơ Nhật Bản được thành lập năm 1992, Filco luôn biết làm gì để những mẫu bàn phím cơ của mình bền nhất và luôn là trợ thủ đáng tin cậy trong mọi môi trường làm việc cũng như giải trí tại nhà.",
        relatedProducts: "Ngoài bàn phím cơ, Filco còn có các phụ kiện giúp hỗ trợ sử dụng bàn phím được thoải mái hơn như kê tay,  phụ kiện vệ sinh, keycap,...",
        type: [
          {
            id: 1,
            name: "Fullsize"
          },
          {
            id: 1,
            name: "Mini"
          }
        ],
        groupimage: [

        ],
        options: [
          {
            layout: [
              {
                id: 1,
                name: 'Mini',
                optioncolor: [
                  {
                    id: 1,
                    name: "black",
                    url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 120050
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 12
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 2000100
                      }
                    ]
                  },
                  {
                    id: 2,
                    name: "white",
                    url: "https://banphimco.com/wp-content/uploads/2019/12/ban-phim-co-filco-convertible-2.jpg",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 123164
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 123232
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 1237632
                      }
                    ]
                  }
                ]
              },
            ]
          }

        ],

      },
      {
        id: 2,  
        category: EProductCategory.BAN_PHIM,
        urlBanner: "//cdn.shopify.com/s/files/1/0636/9044/0949/collections/ban_phim_co_filco.jpg?v=1677060694&width=3200",
        brand: "filco",
        name: "Bàn phím cơ Glorious GMMK 2 Fullsize 100% - Pre-built",
        route: "filco-majestouch-convertible-3-mini5",
        statusProduct: "còn 3 sản phẩm",
        newproduct:"",
        layouts: [
          {
            id: 1,
            name: "Fullsize",
            path: "filco-majestouch-convertible-3-fullsize5"
          },
          {
            id: 2,
            name: "Mini",
            path: "filco-majestouch-convertible-3-mini5"
          }
        ],
        url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
        introduce: "Là thương hiệu bàn phím cơ Nhật Bản được thành lập năm 1992, Filco luôn biết làm gì để những mẫu bàn phím cơ của mình bền nhất và luôn là trợ thủ đáng tin cậy trong mọi môi trường làm việc cũng như giải trí tại nhà.",
        relatedProducts: "Ngoài bàn phím cơ, Filco còn có các phụ kiện giúp hỗ trợ sử dụng bàn phím được thoải mái hơn như kê tay,  phụ kiện vệ sinh, keycap,...",
        type: [
          {
            id: 1,
            name: "Fullsize"
          },
          {
            id: 1,
            name: "Mini"
          }
        ],
        groupimage: [

        ],
        options: [
          {
            layout: [
              {
                id: 1,
                name: 'Mini',
                optioncolor: [
                  {
                    id: 1,
                    name: "black",
                    url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                    optionswitch: [
                      {
                        id: 1,
                        name: 'CherryBowrn',
                        price: 120050
                      },
                      {
                        id: 2,
                        name: 'Cherry MX Blue',
                        price: 12
                      },
                      {
                        id: 3,
                        name: 'Cherry MX Red',
                        price: 2000100
                      }
                    ]
                  }
                ]
              },
            ]
          }

        ],
      },

    ]
  }





  data: any[]=[
    {
      id: 0,  
      category: EProductCategory.BAN_PHIM,
      urlBanner: "//cdn.shopify.com/s/files/1/0636/9044/0949/collections/ban_phim_co_filco.jpg?v=1677060694&width=3200",
      brand: "filco",
      name: "Bàn phím cơ Filco Majestouch Convertible 3 Matcha - Tenkeyless",
      url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
      introduce: "Là thương hiệu bàn phím cơ Nhật Bản được thành lập năm 1992, Filco luôn biết làm gì để những mẫu bàn phím cơ của mình bền nhất và luôn là trợ thủ đáng tin cậy trong mọi môi trường làm việc cũng như giải trí tại nhà.",
      relatedProducts: "Ngoài bàn phím cơ, Filco còn có các phụ kiện giúp hỗ trợ sử dụng bàn phím được thoải mái hơn như kê tay,  phụ kiện vệ sinh, keycap,...",
      type: [
        {
          id: 1,
          name: "Fullsize"
        },
        {
          id: 1,
          name: "Mini"
        }
      ],
      groupimage: [

      ],
      options: [
        {
          layout: [
            {
              id: 1,
              name: 'Mini',
              optioncolor: [
                {
                  id: 1,
                  name: "black",
                  url: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                  optionswitch: [
                    {
                      id: 1,
                      name: 'CherryBowrn1',
                      price: 120000
                    },
                    {
                      id: 2,
                      name: 'Cherry MX Blue1',
                      price: 12
                    },
                    {
                      id: 3,
                      name: 'Cherry MX Red1',
                      price: 2000000
                    }
                  ]
                },
                {
                  id: 2,
                  name: "white",
                  url: "https://banphimco.com/wp-content/uploads/2019/12/ban-phim-co-filco-convertible-2.jpg",
                  optionswitch: [
                    {
                      id: 1,
                      name: 'CherryBowrn',
                      price: 123183
                    },
                    {
                      id: 2,
                      name: 'Cherry MX Blue',
                      price: 123279
                    },
                    {
                      id: 3,
                      name: 'Cherry MX Red',
                      price: 1237632
                    }
                  ]
                }
              ]
            }
          ]
        }
      ],
      price: 169.99,
      description: [
        {
          title: "",
          body: [
            {
              id: 1,
              text: ""
            },
            {
              id: 2,
              text: ""
            },
            {
              id: 3,
              text: ""
            }
          ]
        }
      ],
      designLocation: "thiết kế tại Japan",
      guarantee: "bảo hành 1 year",
      listUrl: [],// list ảnh carousel ở đầu trang
      productState: "còn hàng",
      instruct: [
        {
          title: "",
          body: [
            {
              id: 1,
              text: ""
            },
            {
              id: 2,
              text: ""
            },
            {
              id: 3,
              text: ""
            }
          ]
        }
      ],
      

    },
  ]


}


// sắp xếp dùng được primeng 
