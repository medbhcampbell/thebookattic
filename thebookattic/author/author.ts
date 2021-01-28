export class Author {
    // ID for the author's page vs ID for the author's user account
    authorid: number = 0;
    userid: number = 0;
    firstname: string = '';
    lastname: string = '';

    // Average rating for the author based on the ratings for their books
    avgrating: number = 0;
    bio: string = '';

    // Location of the author's picture
    picture: string = '';
}