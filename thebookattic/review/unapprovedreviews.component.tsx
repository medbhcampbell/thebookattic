import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ScrollView, Text, View } from "react-native";

import { ReviewState } from "../store/store";
import { Review } from "./review";
import ReviewsListComponent from "./reviewslist.component";
import styles from '../global-styles';

export default function UnapprovedReviewsComponent() {
    const reviews = useSelector((state: ReviewState) => state.reviews);
    const [unapprovedReviews, setUnapprovedReviews] = useState([] as Review[]);
    
    useEffect(()=>{
        // Get unapproved reviews
        setUnapprovedReviews(reviews.filter(item=>{return !item.approved}));
    }, [reviews]);

    return (
       
        <ScrollView >
             <View style={{alignItems: 'center'}}>
            <Text style={styles.h1}>{unapprovedReviews? 'Reviews Pending Approval:' : 'No pending approvals!'}</Text>
            <ReviewsListComponent reviews={unapprovedReviews} retrievedReviews={true}/>
            </View>
        </ScrollView>
        
    );
}