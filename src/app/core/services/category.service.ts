
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catagorys } from '../model/catagory';


@Injectable()
export class CategoryService {
  
  constructor(
    private http: HttpClient
  ) {}
    



  getCatagory(): catagorys[]{
    return[
      {
        id: 1,
        name:"Bàn phím cơ",
        category: "banphimco",
        categoryUrl: "https://cdn.shopify.com/s/files/1/0636/9044/0949/files/Ban-phim-co_f27dbc3b-1481-4955-a11b-5cd9f20a3a3d.png",
      },
      {
        id: 2,
        name:"Chuột",
        category: "chuot",
        categoryUrl: "//cdn.shopify.com/s/files/1/0636/9044/0949/files/chuot_35c37987-d484-4613-b8ee-391603bdf2d7.png",
      },
      {
        id: 3,
        name:"Lót chuột",
        category: "lotchuot",
        categoryUrl: "//cdn.shopify.com/s/files/1/0636/9044/0949/files/lot_chuot_1d385bc3-4c08-432d-9de9-37ccc2ad443b.png",
      },
      {
        id: 4,
        name:"Feet chuột",
        category: "feetchuot",
        categoryUrl: "//cdn.shopify.com/s/files/1/0636/9044/0949/files/feet_chuot_cbe5625c-3118-459f-b5b7-5f2e25565b56.png",
      },
      {
        id: 5,
        name:"Switch & Lube",
        category: "switchandlube",
        categoryUrl: "//cdn.shopify.com/s/files/1/0636/9044/0949/files/switch_0d309468-4b83-474c-a144-4499f020816b.png",
      },
    ]
  }
   


}
