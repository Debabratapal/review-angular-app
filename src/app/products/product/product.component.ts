import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-product',
    templateUrl: './product.component.html',
    styleUrls: ['./product.component.css']
})
export class ProductComponent  {
    @Input('product') product;
   

    constructor(private router: Router) {}

   
    onCardClick(id) {
        this.router.navigate(['',id])
    }
}