import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { getReviews } from "../store/actions";
import { ReviewState } from "../store/store";
import Review from "./review";
import reviewService from "./review.service";

export default function Reviews() {
    const dispatch = useDispatch();
    const reviews : Review[] = useSelector((state: ReviewState) => state.reviews);
    
    useEffect(()=>{
            reviewService.getReviews().then(res=>{
                dispatch(getReviews(reviews))
            }).catch(err=>{
                console.log(err);
            });
    }, [dispatch]);

    const filtered = reviews.filter(item=>item.approved === true);

    return (
        filtered.map((item, index)=>{
            <View key={index}>
                <Text>
                    {item.username}
                </Text>
                <Text>
                    {item.rating}
                </Text>
                <Text>
                    {item.content}
                </Text>
            </View>
        })
    );
}