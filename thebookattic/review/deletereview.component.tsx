import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';
import { changeReview, getReviews} from '../store/actions';
import { Review } from './review';
import reviewService from './review.service';

interface DeleteReviewProps {
    reviewid: number;
    approved: boolean;
}

export default function DeleteReviewComponent(props: DeleteReviewProps) {
    const nav = useNavigation();
    const dispatch = useDispatch();

    //Delete the review 
    function deleteReview() {
        reviewService.deleteReviewById(props.reviewid).then(() => {
            reviewService.getReviews().then((review) => {
                dispatch(changeReview(new Review));
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            //take us home
            nav.navigate('Home');
        })
    }

    return (
        <Button
            color='red'
            title={props.approved? 'Delete':'Reject'}
            onPress={deleteReview} />
    )
}