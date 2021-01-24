export class Book {

    //ID from SQL
    public id: number = 0;

    //book's status on our site
    public rating: number = 0;
    public isApproved: boolean = false;

    constructor(
        //IDs from SQL
        public authorId: number,
        //Info about book
        public title: string,
        public cover: string,
        public blurb: string,
        public pageCount: number,
        public link: string,
        public genre: number
    ){}
    
}