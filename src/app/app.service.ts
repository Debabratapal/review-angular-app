import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Product } from "../models/produce.model";
import { Subject } from "rxjs";
import { Comment } from "../models/comment.model";

@Injectable({
    providedIn: 'root',
})
export class AppService {
    product: Product;
    productChange = new Subject<Product>();
    products: Product[];
    productsChange = new Subject<{count:number, product:Product[]}>();
    comments: Comment[] = [];
    commentsChange = new Subject<Comment[]>();
    review: number = 0;
    reviewChange = new Subject<number>();

    baseURL = 'http://localhost:3001/api';

    constructor(private http: HttpClient) {}

    getProductsChange() {
        return this.productsChange.asObservable();
    }

    getProductChange() {
        return this.productChange.asObservable();
    }

    getCommentsChange() {
        return this.commentsChange.asObservable();
    }

    getReviewChange() {
        return this.reviewChange.asObservable();
    }

    getProduct() {
        return this.product;
    }

    getComments() {
        return this.comments;
    }

    getReview() {
        return this.review;
    }

    getProducts(items, index) {
        if(index == 0) {
            index+=1;
        }
        this.http.get<{product:Product[], count:number}>(`${this.baseURL}?index=${index}&items=${items}`)
            .subscribe(result => {
                this.products = [...result.product]
                this.productsChange.next({
                    product: [...this.products],
                    count: result.count
                })
            }, err => {
                console.log(err);
            })
    }

    getProductById(id) {
       this.http.get<{product: Product}>(`${this.baseURL}/${id}`)
       .subscribe(product => {
           console.log(product);
           this.product = product.product;
           this.comments = this.product.comments;
           this.review = this.product.review;
           this.productChange.next({...this.product});
           this.commentsChange.next([...this.comments]);
           this.reviewChange.next(this.review);
       })
    }

    postComment(data) {
        this.http.post<Product>(`${this.baseURL}/comment/${data.productId}`, data)
        .subscribe(savedData => {
            console.log(savedData);
            this.product = savedData,
            this.comments = savedData.comments;
            this.review = savedData.review;
            this.productChange.next({...this.product})
            this.commentsChange.next([...this.comments])
            this.reviewChange.next(this.review);
        })
    }
}