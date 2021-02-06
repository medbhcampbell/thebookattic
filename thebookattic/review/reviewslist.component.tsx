import React, { useEffect } from "react";
import { FlatList, ListRenderItem, ScrollView, View } from "react-native";
import { Card, Rating, Text } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";


import { getReviews } from "../store/actions";
import { UserState } from "../store/store";
import ApproveReviewComponent from "./approvereview.component";
import DeleteReviewComponent from "./deletereview.component";
import { Review } from "./review";
import reviewService from "./review.service";


interface ReviewProps {
    reviews: Review[];
    retrievedReviews: boolean;

}

export default function ReviewsListComponent(props: ReviewProps) {
    const user = useSelector((state: UserState) => state.user);
    const reviews = props.reviews;

    const Reviews: ListRenderItem<Review> = ({ item }) => {
        return (
            <>
                <Card>
                    <Card.Title>{item.username}</Card.Title>
                    <Card.Divider />
                    <Rating imageSize={20} readonly startingValue={item.rating} />
                    <Text>
                        {item.content}
                    </Text>
                </Card>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
                    {user.role === 'admin' &&
                        <DeleteReviewComponent reviewid={item.id} approved={item.approved} />
                    }
                    {(!item.approved && user.role === 'admin') &&
                        <ApproveReviewComponent id={item.id} />}
                </View>
            </>
        );
    }

    return (

        <ScrollView>
            {reviews.length > 0 ?
                <FlatList data={reviews} renderItem={Reviews} keyExtractor={item => String(item.id)} /> :
                <Text>No Reviews Found!</Text>}
        </ScrollView>


    );


}