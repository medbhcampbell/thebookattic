export class Book {
    //IDs from SQL
    bookId: number = 0;
    authorId: number = 0;

    //Info about book
    title: string = '';
    cover: string = '';
    blurb: string = '';
    pageCount: number = 0;
    link: string = '';
    genre: number = 0;

    //book's status on our site
    rating: number = 0;
    isApproved: boolean = false;

    // Can initialise a book object with no information,
    // or with info about the book
    // IDs will be set when the book is sent to the table
    // Rating and isApproved will be set at a later date
    constructor(
        title: string = '',
        cover: string = '',
        blurb: string = '',
        pageCount: number = 0,
        link: string = '',
        genre: number = 0
    ){
        this.title = title;
        this.cover = cover;
        this.blurb = blurb;
        this.pageCount = pageCount;
        this.link = link;
        this.genre = genre;
    }
}