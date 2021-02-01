// Gets all books

import BookService from 'bookservicelayer';

interface BookEvent {
    path: string;
}

export const handler = async (event: BookEvent): Promise<any> => {
    const username = event.path.substring(event.path.lastIndexOf('/')+1, event.path.length);
    const bookService = new BookService();
    console.log(`username ${username}, table 'toread'`);
    const books = await bookService.getBooksFromJoinTable(username, 'toread');
    console.log(JSON.stringify(books));

    if(books) {
        console.log(JSON.stringify(books));
        return {statusCode: 200, body: JSON.stringify(books), headers: {'Access-Control-Allow-Origin': '*'}};
    } else {
        return {statusCode: 404, body: JSON.stringify({}), headers: {'Access-Control-Allow-Origin': '*'}};
    }
}