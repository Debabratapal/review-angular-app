import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AppService } from "../app.service";
import { Subscription } from "rxjs";
import { Product } from "../../models/produce.model";

@Component({
    selector:'app-product-review',
    templateUrl: './product-review.component.html',
    styleUrls: ['./product-review.component.css']
})
export class ProductReviewComponent implements OnInit, OnDestroy{
    id:string;
    productListener: Subscription;
    product:Product;
    review:number;
    reviewListener: Subscription;
    constructor(private route: ActivatedRoute,
                private appService: AppService) {}

    ngOnInit() {
        this.id = this.route.snapshot.paramMap.get('id');
        this.appService.getProductById(this.id)
        this.product = this.appService.getProduct()
        this.productListener = this.appService.getProductChange()
        .subscribe(product => {
            console.log(product);
            this.product = product;
        })
        this.review = this.appService.getReview();
        this.reviewListener = this.appService.getReviewChange()
        .subscribe(review => {
            this.review = review;
        })
    }
      

    
    ngOnDestroy() {
        this.reviewListener.unsubscribe();
        this.productListener.unsubscribe();
    }
}