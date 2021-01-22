export class Book {

    constructor(
        //IDs from SQL
        public bookId: number,
        public authorId: number,
        //Info about book
        public title: string,
        public cover: string,
        public blurb: string,
        public pageCount: number,
        public link: string,
        public genre: number,
        //book's status on our site
        public rating: number,
        public isApproved: boolean
    ){}
    
}