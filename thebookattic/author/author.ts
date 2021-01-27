export class Author {
    // ID for the author's page vs ID for the author's user account
    authorId: number = 0;
    userId: number = 0;
    firstName: string = '';
    lastName: string = '';

    // Average rating for the author based on the ratings for their books
    avgRating: number = 0;
    bio: string = '';

    // Location of the author's picture
    picture: string = '';
}