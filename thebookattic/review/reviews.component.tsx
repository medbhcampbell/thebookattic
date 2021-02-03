import React, { useEffect } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { Card, Rating, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { Book } from "../book/book";
import styles from "../global-styles";

import { getReviews } from "../store/actions";
import { ReviewState } from "../store/store";
import {Review} from "./review";
import reviewService from "./review.service";


interface ReviewProps {
    // route: RouteProp<StackParams, 'Reviews'>
    book: Book
}

export default function ReviewsComponent(props: ReviewProps) {
    const dispatch = useDispatch();
    const reviews : Review[] = useSelector((state: ReviewState) => state.reviews);
    const book = props.book;
    useEffect(()=>{
        reviewService.getReviews().then(res=>{
            dispatch(getReviews(res.filter(item=>item.approved && item.bookid == book.id)));
        }).catch(err=>{
            console.log(err);
        });
    }, [dispatch]);

    const Reviews: ListRenderItem<Review> = ({item}) => {
        return (
        <Card>
            <Card.Title>{item.username}</Card.Title>
            <Card.Divider/>
            <Rating imageSize={20} readonly startingValue={item.rating}/>
            <Text>
                {item.content}
            </Text>
        </Card>
        );
    }

    return (
        <View>
            <Text h2 style={{textAlign: 'center'}}>Reviews</Text>
            {reviews.length > 0 ? 
            <FlatList data={reviews} renderItem={Reviews} keyExtractor={item => String(item.id)}/> :
            <Text>No Reviews Found!</Text>}  
        </View>
    );
}