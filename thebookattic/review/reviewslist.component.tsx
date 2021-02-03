import React, { useEffect } from "react";
import { FlatList, ListRenderItem, SafeAreaView, View } from "react-native";
import { Card, Rating, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";


import { getReviews } from "../store/actions";
import { ReviewState, UserState } from "../store/store";
import ApproveReviewComponent from "./approvereview.component";
import DeleteReviewComponent from "./deletereview.component";
import {Review} from "./review";
import reviewService from "./review.service";


interface ReviewProps {
    reviews : Review[];
    retrievedReviews :boolean;
    
}

export default function ReviewsListComponent(props: ReviewProps) {
    const dispatch = useDispatch();
    //const reviews : Review[] = useSelector((state: ReviewState) => state.review);
    const user = useSelector((state: UserState) => state.user);
    const reviews = props.reviews;
    
     useEffect(()=>{
        reviewService.getReviews().then(res=>{
            dispatch(getReviews(res.filter(item=>{return !item.approved})));
        }).catch(err=>{
            console.log(err);
        });
    }, [dispatch]);

    const Reviews: ListRenderItem<Review> = ({item}) => {
        return (
            <>
        <Card>
            <Card.Title>{item.username}</Card.Title>
            <Card.Divider/>
            <Rating imageSize={20} readonly startingValue={item.rating}/>
            <Text>
                {item.content}
            </Text>
        </Card>
         <View style={{flex: 1, flexDirection: 'row'}}>
         {user.role === 'admin' &&
             <DeleteReviewComponent reviewid={item.id} approved={item.approved}/>
        }
         {(!item.approved && user.role === 'admin') &&
             <ApproveReviewComponent id={item.id} />}
     </View>
     </>
        );
    }

    return (
        
        <SafeAreaView>
            {reviews.length > 0 ? 
            <FlatList data={reviews} renderItem={Reviews} keyExtractor={item => String(item.id)}/> :
            <Text>No Reviews Found!</Text>}  
        </SafeAreaView>
       
      
    );

  
}