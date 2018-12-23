import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppService } from "../app.service";
import { Subscription } from "rxjs";
import { Product } from "../../models/produce.model";
import { PageEvent } from "@angular/material";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls:['./products.component.css']
})
export class ProductsComponent implements OnInit , OnDestroy{
    products: Product[] = []; 
    productsListener: Subscription;
    itemArray = [3,6,12];
    itemPerPage:number=3;
    totalItems:number
    pageIndex=1;

    constructor(private appService: AppService) {}
    ngOnInit() {
        this.appService.getProducts(this.itemPerPage,this.pageIndex);
        this.productsListener = this.appService.getProductsChange()
        .subscribe(result => {
            // console.log(result);
            this.products = result.product;
            this.totalItems = result.count;
        })

    }
    ngOnDestroy() {
        this.productsListener.unsubscribe();
    }

    paginatorChange(event: PageEvent) {
        console.log(event);
        this.pageIndex = event.pageIndex;
        this.itemPerPage = event.pageSize;
        this.appService.getProducts(this.itemPerPage,this.pageIndex)
    }
}