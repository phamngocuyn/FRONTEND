import { Injectable } from '@angular/core';
import { banner } from '../model/banner';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BannerService {
    constructor(
        private route: ActivatedRoute
      ) {}
  
    getBanner(item: string){
        return this.getAll().find(p => p.name == item)
    }

    getAll(): banner[]{
        return [
            {
                id: 1,
                name: "BAN_PHIM",
                Name:"Bàn phím cơ",
                urlBanner: "//cdn.shopify.com/s/files/1/0636/9044/0949/collections/ban_phim_co_filco.jpg?v=1677060694&width=3200",
                introduce: "Là thương hiệu bàn phím cơ Nhật Bản được thành lập năm 1992, Filco luôn biết làm gì để những mẫu bàn phím cơ của mình bền nhất và luôn là trợ thủ đáng tin cậy trong mọi môi trường làm việc cũng như giải trí tại nhà.",
                relatedProducts: "Ngoài bàn phím cơ, Filco còn có các phụ kiện giúp hỗ trợ sử dụng bàn phím được thoải mái hơn như kê tay,  phụ kiện vệ sinh, keycap,..."
            },
            {
                id: 2,
                name: "filco",
                Name: "Filco",
                urlBanner: "https://news.phongcachxanh.vn/wp-content/uploads/2020/12/banphimco_Cac-ban-phim-co-Filco-TKL.png",
                introduce: "Là thương hiệu bàn phím cơ Nhật Bản được thành lập năm 1992, Filco luôn biết làm gì để những mẫu bàn phím cơ của mình bền nhất và luôn là trợ thủ đáng tin cậy trong mọi môi trường làm việc cũng như giải trí tại nhà.",
                relatedProducts: "Ngoài bàn phím cơ, Filco còn có các phụ kiện giúp hỗ trợ sử dụng bàn phím được thoải mái hơn như kê tay,  phụ kiện vệ sinh, keycap,...uyn"
            },
        ]
    }
  
}
