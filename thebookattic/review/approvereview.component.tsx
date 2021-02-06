import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { getReviews } from '../store/actions';
import reviewService from './review.service';



interface ApproveReviewProps {
    id: number;
}

export default function ApproveReviewComponent(props: ApproveReviewProps) {
    const nav = useNavigation();
    const dispatch = useDispatch();

    function approveReview() {
        reviewService.approveReviewById(props.id).then(() => {
             reviewService.getReviews().then((review) => {
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
            buttonStyle={{ backgroundColor: 'green' }}
            icon={
                <Icon
                    name='check'
                    color='white'
                    type='font-awesome'
                />
            }
            onPress={approveReview} />
    )
}