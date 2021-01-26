import { User } from './../user/user';

export enum UserActions {
    GetUser = 'GET_USER',
    LoginChange = 'CHANGE_LOGIN',
    ChangeLocale = 'CHANGE_LOCALE'
}

export enum ReviewActions {
    GetReviews = 'GET_REVIEWS',
    ChangeReview = 'CHANGE_REVIEW'
}

export interface AppAction {
    type: string;
    payload: any;
}

export interface UserAction<P> extends AppAction {
    type: UserActions;
    payload: P;
}

export interface ReviewAction extends AppAction {
    type: ReviewActions;
    payload: Review | Review[];
}

export function getUser(user: User): UserAction<User> {
    const action: UserAction<User> = {
        type: UserActions.GetUser,
        payload: user
    };
    return action;
}

export function loginAction(user: User): UserAction<User> {
    const action: UserAction<User> = {
        type: UserActions.LoginChange,
        payload: user
    };
    return action;
}

export function changeLocale(locale: string): UserAction<string> {
    const action: UserAction<string> = {
        type: UserActions.ChangeLocale,
        payload: locale
    };
    return action;
}

export function getReviews(reviews: Review[]): ReviewAction {
    const action: ReviewAction = {
        type: ReviewActions.GetReviews,
        payload: reviews
    };
    return action;
}

export function ChangeReview(review: Review): ReviewAction {
    const action: ReviewAction = {
        type: ReviewActions.ChangeReview,
        payload: review
    };
    return action;
}
