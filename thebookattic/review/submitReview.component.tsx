import { RouteProp, useNavigation } from '@react-navigation/native';
import React from 'react';
import { AirbnbRating, Button, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { StackParams } from '../router/router.component';
import { changeReview } from '../store/actions';
import { ReviewState, UserState } from '../store/store';
import { Review } from './review';
import reviewService from './review.service';

interface SubmitReviewProps {
    route: RouteProp<StackParams, 'SubmitReview'>
}

export default function SubmitReviewComponent(props: SubmitReviewProps){
    const dispatch = useDispatch();
    const review = useSelector((state: ReviewState) => state.review);
    const user = useSelector((state: UserState) => state.user);
    const navigation = useNavigation();
    
    function handleForm(){
        let rew = {...review};
        rew.username = user.name;
        rew.bookid = props.route.params.id;
        if(rew.content){
            reviewService.addReview(rew).then(()=>{
                dispatch(changeReview(new Review()));
                navigation.goBack();
            }).catch(err=>{
                console.log(err);
            })            
        }
    }

    return(
        <>
            <AirbnbRating
                count={5}
                reviews={["1", "2", "3", "4", "5"]}
                defaultRating={5}
                size={20}
                onFinishRating={(value)=>dispatch(changeReview({...review, rating: value}))}
            />   
            <Input
                placeholder='Leave a Review'
                multiline={true}
                numberOfLines={4}
                onChangeText={(value)=>dispatch(changeReview({...review, content: value}))}
            />  
            <Button
                title="Submit Review"
                type="outline"
                onPress={handleForm}
            />
        </>
    );
}
