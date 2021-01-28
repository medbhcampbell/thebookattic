// Users can see a specific book
// This DOES NOT check if the book has been approved
//   frontend needs to ensure that if the book is not
//   approved, only admins/the book's author can view it

import BookService from 'bookservicelayer';

interface BookEvent {
    path: string;
}

export const handler = async (event: BookEvent): Promise<any> => {
    let bookid = Number(event.path.substring(event.path.lastIndexOf('/')+1, event.path.length));
    const bookService = new BookService();
    const book = await bookService.getBookById(bookid);
    
    if(book) {
        console.log(JSON.stringify(book));
        return {statusCode: 200, body: JSON.stringify(book), headers: {'Access-Control-Allow-Origin': '*'}};
    } else {
        return {statusCode: 404, body: JSON.stringify({}), headers: {'Access-Control-Allow-Origin': '*'}};
    }
}