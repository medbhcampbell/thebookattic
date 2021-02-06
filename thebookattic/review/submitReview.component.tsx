import React from 'react';
import { AirbnbRating, Button, Input, Text } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import bookService from '../book/book.service';
import { changeReview, getReviews } from '../store/actions';
import { ReviewState, UserState } from '../store/store';
import { Review } from './review';
import reviewService from './review.service';


interface SubmitReviewProps {
    id: number,
    setHaveReviewed: Function
}

export default function SubmitReviewComponent(props: SubmitReviewProps) {
    const dispatch = useDispatch();
    const review = useSelector((state: ReviewState) => state.review);
    const user = useSelector((state: UserState) => state.user);

    function handleForm() {
        let rew = { ...review };
        rew.username = user.name;
        rew.bookid = props.id;
        if (rew.content) {
            reviewService.addReview(rew).then(() => {
                // Update the store
                reviewService.getReviews().then((results) => {
                    dispatch(getReviews(results));
                }).catch(err => console.log(err));

                dispatch(changeReview(new Review()));
                bookService.addBookHaveRead(user.name, rew.bookid)
                    .then(() => props.setHaveReviewed(true))
                    .catch(err => console.log(err));
            }).catch(err => {
                console.log(err);
            })
        }
    }

    return (
        <>
            <Text h3 style={{ textAlign: 'center' }}>Submit A Review</Text>
            <AirbnbRating
                count={5}
                reviews={["1", "2", "3", "4", "5"]}
                defaultRating={0}
                size={20}
                onFinishRating={(value) => dispatch(changeReview({ ...review, rating: value }))}
            />
            <Input
                label='Leave a Review'
                placeholder='Leave a Review'
                multiline={true}
                numberOfLines={4}
                onChangeText={(value) => dispatch(changeReview({ ...review, content: value }))}
            />
            <Button
                title="Submit Review"
                type="outline"
                onPress={handleForm}
            />
        </>
    );
}
