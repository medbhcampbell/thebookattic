import axios from 'axios';

import { Review } from './review';
import env from '../environment';

class ReviewService {
    private URI: string;
    constructor() {
        this.URI = env.THEBOOKATTIC_URI + 'reviews';
    }

    getReviews(): Promise<Review[]> {
        return axios.get(this.URI).then((result) => result.data);
    }

    addReview(review: Review): Promise<null> {
        return axios.post(this.URI, review).then(() => null);
    }

    updateReview(id: number): Promise<null> {
        return axios.patch(this.URI, id).then(() => null);
    }

    approveReviewById(reviewId: number): Promise<null> {
        return axios.put(this.URI + '/' + reviewId).then(() => null);
   }
   
   deleteReviewById(reviewid: number): Promise<null> {
       return axios.delete(this.URI+'/'+ reviewid).then(() => null);
   }
}

const reviewService = new ReviewService();
export default reviewService;
