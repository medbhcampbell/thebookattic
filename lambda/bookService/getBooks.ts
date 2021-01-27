// Gets all books

import BookService from 'bookservicelayer';

export const handler = async (): Promise<any> => {
    const bookService = new BookService();
    const books = await bookService.getBooks();
    
    if(books) {
        console.log(JSON.stringify(books));
        return {statusCode: 200, body: JSON.stringify(books), headers: {'Access-Control-Allow-Origin': '*'}};
    } else {
        return {statusCode: 404, body: JSON.stringify({}), headers: {'Access-Control-Allow-Origin': '*'}};
    }
}