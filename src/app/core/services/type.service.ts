
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { typeProduct } from '../model/type';


@Injectable()
export class TypeService {
  
  constructor(
    private http : HttpClient
  ) {}
    

  

  getType(): typeProduct[]{
    return[
      {
        id: 1,
        type: "filco",
        typeUrl: "//cdn.shopify.com/s/files/1/0636/9044/0949/files/Filco.png",
      },
      {
        id: 2,
        type: "finalmouse",
        typeUrl: "//cdn.shopify.com/s/files/1/0636/9044/0949/files/finalmouse.png",
      },
      {
        id: 3,
        type: "corepad",
        typeUrl: "//cdn.shopify.com/s/files/1/0636/9044/0949/files/corepad.png",
      },
      {
        id: 4,
        type: "lamzu",
        typeUrl: "//cdn.shopify.com/s/files/1/0636/9044/0949/files/lamzu.png",
      },
      {
        id: 5,
        type: "pulsar",
        typeUrl: "//cdn.shopify.com/s/files/1/0636/9044/0949/files/pulsar.png",
      },
      {
        id: 6,
        type: "ninjutso",
        typeUrl: "//cdn.shopify.com/s/files/1/0636/9044/0949/files/ninjutso.png",
      },
      {
        id: 7,
        type: "glorious",
        typeUrl: "//cdn.shopify.com/s/files/1/0636/9044/0949/files/glorious.png",
      },
      {
        id: 8,
        type: "lgg",
        typeUrl: "//cdn.shopify.com/s/files/1/0636/9044/0949/files/lgg.png",
      },
      {
        id: 9,
        type: "skypad",
        typeUrl: "//cdn.shopify.com/s/files/1/0636/9044/0949/files/skypad.png",
      },
      {
        id: 10,
        type: "datacolor",
        typeUrl: "//cdn.shopify.com/s/files/1/0636/9044/0949/files/datacolor.png",
      },
    ]
  }
   


}
