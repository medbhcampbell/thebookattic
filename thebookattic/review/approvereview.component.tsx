import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { changeReview, getReviews } from '../store/actions';
import reviewService from './review.service';
import { Review } from './review';


interface ApproveReviewProps {
    id: number;
}

export default function ApproveReviewComponent(props: ApproveReviewProps) {
    const nav = useNavigation();
    const dispatch = useDispatch();

    function approveReview() {
        reviewService.approveReviewById(props.id).then(() => {
            // Refresh the store with the update book set
            reviewService.getReviews().then((review) => {
<<<<<<< HEAD
                dispatch(changeReview(new Review));
=======
>>>>>>> a4fee5b94b16cb93202c3d24ee5f034dd85c65d8
                dispatch(getReviews(review));
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
              nav.navigate('UnapprovedReviews');
        })
    }

    return (
        <Button
            color='green'
            title='Approve'
            onPress={approveReview} />
    )
}