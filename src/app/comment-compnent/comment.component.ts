import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { AppService } from "../app.service";

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
    review:number;
    commentForm: FormGroup;
    productId: string

    constructor(private route: ActivatedRoute,
                private appService: AppService) {}
    
    ngOnInit() {
        this.productId = this.route.snapshot.paramMap.get('id');
        this.commentForm = new FormGroup({
            'name': new FormControl(null, [Validators.required]),
            'comment': new FormControl(null, [Validators.required]),
            'review': new FormControl(null, [Validators.required])
        })
    }

    onSubmit() {
        console.log(this.commentForm);
        
        const data = {
            productId: this.productId,
            name: this.commentForm.value.name,
            comment: this.commentForm.value.comment,
            review: this.commentForm.value.review
        }
        this.commentForm.reset();
        this.appService.postComment(data);
    }

    formatLabel(value: number | null) {
        if (!value) {
          return 0;
        }
        if (value >= 10) {
          return value;
        }
    
        return value;
      }
}