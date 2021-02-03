// Authors can add a book

import BookService, { Book } from 'bookservicelayer';

interface BookEvent {
    body: string;
}

export const handler = async (event: BookEvent): Promise<any> => {
    const bookService = new BookService();
    console.log('Beginning to add Book');

    console.log(`parsing ${event.body}`);
    console.log(`that's ${JSON.parse(event.body)}`);

    let book: Book = JSON.parse(event.body) as Book;
    console.log(`adding book ${JSON.stringify(book)}`);

    const added = await bookService.addBook(book);

    if(added) {
        return {statusCode: 201, body: JSON.stringify(book), headers: {'Access-Control-Allow-Origin': '*'}};
    } else {
        return {statusCode: 404, body: JSON.stringify({}), headers: {'Access-Control-Allow-Origin': '*'}};
    }
}