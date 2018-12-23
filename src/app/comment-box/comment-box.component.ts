import { Component, OnInit, OnDestroy } from "@angular/core";
import { AppService } from "../app.service";
import { Subscription } from "rxjs";
import { Comment } from "../../models/comment.model";

@Component({
    selector:'app-comment-box',
    templateUrl: './comment-box.component.html',
    styleUrls: ['./comment-box.component.css']
})
export class CommentBoxComponent implements OnInit, OnDestroy {
    comments: Comment[] =  [];
    commentListener: Subscription;
    constructor(private appService: AppService) {}

    ngOnInit() {
        this.comments = this.appService.getComments()
        this.comments.reverse();
        this.commentListener = this.appService.getCommentsChange()
        .subscribe(comments => {
            this.comments = comments;
            this.comments.reverse();
        })
        // console.log(this.comments);
        
        
    }

    ngOnDestroy() {
        this.commentListener.unsubscribe();
    }

}