import React from 'react';
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
                dispatch(changeReview(new Review));
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
              nav.navigate('UnapproveReviews');
        })
    }

    return (
        <Button
            color='green'
            title='Approve'
            onPress={approveReview} />
    )
}