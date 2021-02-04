import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native';
import { Button, Card } from 'react-native-elements';
import { useSelector } from 'react-redux';
import { Book } from '../book/book';
import { Review } from '../review/review';
import { BookAtticState } from '../store/store';
import style from '../global-styles';

export default function AdminComponent() {

    const user = useSelector((state: BookAtticState) => state.user);
    const books = useSelector((state: BookAtticState) => state.books);
    const reviews = useSelector((state: BookAtticState)=> state.reviews);

    const nav = useNavigation();
    const [unapprovedBooks, setUnapprovedBooks] = useState([] as Book[]);
    const [unapprovedReviews,setUnapprovedReviews]= useState([] as Review[]);

    useEffect(()=>{
        setUnapprovedBooks(books.filter(item => { return !item.approved }));
        setUnapprovedReviews(reviews.filter(item => { return !item.approved }));        
    }, [books,reviews]);

    return(
        <View>
            {(user.role === 'admin' && unapprovedBooks.length > 0) && 
                <Card>
                    <View style={style.approvalNotice}>
                        <Text style={style.dangerText}>There are some books that need approval!</Text>
                        <Button
                            title="View Unapproved Books"
                            onPress={()=>{nav.navigate('UnapprovedBooks')}}
                        />
                    </View>
                </Card>}
            {(user.role === 'admin' && unapprovedReviews.length > 0) && 
                <Card>
                    <View style={style.approvalNotice}>
                        <Text style={style.dangerText}>There are some reviews that need approval!</Text>
                        <Button
                            title="Unapproved Reviews"
                            onPress={()=>{nav.navigate('UnapprovedReviews')}}
                        />
                    </View>
                </Card>}
            
            
        </View>
    );
}