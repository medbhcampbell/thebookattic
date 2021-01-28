import axios from 'axios';

import { Review } from './review';

class ReviewService {
    private URI: string;
    constructor() {
        this.URI = process.env.REACT_APP_SERVER_URI + 'reviews';
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
}

const reviewService = new ReviewService();
export default reviewService;
