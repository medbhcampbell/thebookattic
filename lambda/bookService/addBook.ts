// Authors can add a book

import BookService, { Book } from 'bookservicelayer';

interface BookEvent {
    body: string;
}

export const handler = async (event: BookEvent): Promise<any> => {
    const bookService = new BookService();

    let book: Book = JSON.parse(event.body) as Book;
    console.log(`adding book ${JSON.stringify(book)}`);

    const added = await bookService.addBook(book);

    if(added) {
        return {statusCode: 201, body: JSON.stringify(book)};
    } else {
        return {statusCode: 404, body: JSON.stringify({})};
    }
}