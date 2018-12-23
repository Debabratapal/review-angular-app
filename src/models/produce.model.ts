import {Comment} from './comment.model';

export interface Product {
    _id: string
    name: string,
    image: string,
    review: number,
    comments: Comment[];
}