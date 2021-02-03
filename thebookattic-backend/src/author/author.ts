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

    constructor(authorId: number, userId: number, firstName: string, lastName: string, avgRating: number, bio: string, picture: string) {
        this.authorid = authorId;
        this.userid = userId;
        this.firstname = firstName;
        this.lastname = lastName;
        this.avgrating = avgRating;
        this.bio = bio;
        this.picture = picture;
    }
}