import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, Icon } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { getReviews } from '../store/actions';
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
                dispatch(getReviews(review));
            }).catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        }).finally(() => {
            //take us home
            nav.navigate('UnapprovedReviews');
        })
    }

    return (
        <Button
            buttonStyle={{ backgroundColor: 'red' }}
            icon={
                <Icon
                    name='times'
                    color='white'
                    type='font-awesome'
                />
            }
            onPress={deleteReview} />
    )
}