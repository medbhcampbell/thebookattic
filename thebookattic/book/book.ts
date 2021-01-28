export class Book {
    //IDs from SQL
    id: number = 0;
    authorid: number = 0;

    //Info about book
    title: string = '';
    cover: string = '';
    blurb: string = '';
    page_count: number = 0;
    link: string = '';
    genreid: number = 0;

    //book's status on our site
    rating: number = 0;
    approved: boolean = false;

    // Can initialise a book object with no information,
    // or with info about the book
    // IDs will be set when the book is sent to the table
    // Rating and isApproved will be set at a later date
    constructor(
        title: string = '',
        cover: string = '',
        blurb: string = '',
        page_count: number = 0,
        link: string = '',
        genreid: number = 0
    ) {
        this.title = title;
        this.cover = cover;
        this.blurb = blurb;
        this.page_count = page_count;
        this.link = link;
        this.genreid = genreid;
    }
}
