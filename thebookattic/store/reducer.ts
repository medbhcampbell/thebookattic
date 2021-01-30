import * as Actions from './actions';
import { BookAtticState } from './store';
import { User } from './../user/user';
import { Review } from '../review/review';
import { Author } from '../author/author';
import Genre from '../genre/genre';
import { Book } from '../book/book';

// We need to define the initial state of the application and that
// state should include everything that the application might keep track of.

export const initialState: BookAtticState = {
    user: new User(),
    loginUser: new User(),
    authors: [],
    author: new Author(),
    review: new Review(),
    reviews: [],
    genres: [],
    books: []
};

// Make sure that the reducer has a default argument of the inital state or it will not work.
const reducer = (
    state: BookAtticState = initialState,
    action: Actions.AppAction
): BookAtticState => {
    //console.log(action);
    // We want to call setState. (redux will do that when we return a new state object from the reducer)
    const newState = { ...state }; // If we return this, it will re render the application. (call setState)

    switch (action.type) {
        case Actions.UserActions.GetUser:
            newState.user = action.payload as User;
            newState.loginUser = new User();
            return newState;
        case Actions.UserActions.LoginChange:
            newState.loginUser = action.payload as User;
            return newState;
        case Actions.AuthorActions.GetAuthors:
            newState.authors = action.payload as Author[];
            return newState;
        case Actions.AuthorActions.GetAuthor:
            newState.author = action.payload as Author;
            return newState;
        case Actions.ReviewActions.GetReviews:
            newState.reviews = action.payload as Review[];
            return newState;
        case Actions.ReviewActions.ChangeReview:
            newState.review = action.payload as Review;
            return newState;
        case Actions.GenreActions.GetGenres:
            newState.genres = action.payload as Genre[];
            return newState;
        case Actions.BookActions.ChangeBooks:
            newState.books = action.payload as Book[];
            return newState;
        default:
            return state;
    }
};

export default reducer;
