import React, { useEffect, useState } from "react";
import { FlatList, ListRenderItem, View } from "react-native";
import { Card, Rating, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { Book } from "../book/book";

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
    const allReviews : Review[] = useSelector((state: ReviewState) => state.reviews);
    const [reviews, setReviews] = useState([] as Review[]);
    const book = props.book;
    useEffect(()=>{
        // If the store is empty, try to fetch them from the db
        if (allReviews.length <= 0) {
            reviewService.getReviews().then(data => {
                dispatch(getReviews(data));
            }).catch(err => {
                console.log(err);
            });
        }

        // Only get the approved reviews for this book
        setReviews(allReviews.filter(item=>item.approved && item.bookid == book.id));
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
            <Text h3 style={{textAlign: 'center'}}>Reviews</Text>
            {reviews.length > 0 ? 
            <FlatList data={reviews} renderItem={Reviews} keyExtractor={item => String(item.id)}/> :
            <Text>No Reviews Found!</Text>}  
        </View>
    );
}