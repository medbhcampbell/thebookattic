// Users can add a book to their 'to read' list

import BookService from 'bookservicelayer';

interface BookEvent {
    body: string;
    path: string;
}

export const handler = async (event: BookEvent): Promise<any> => {
    const bookService = new BookService();
    console.log('Beginning to add Book to HaveRead');
    console.log(`parsing ${event.body}`);
    console.log(`body: ${JSON.parse(event.body).bookid}`);

    const bookid: number = Number(JSON.parse(event.body).bookid);
    const username = event.path.substring(event.path.lastIndexOf('/')+1, event.path.length);

    const added = await bookService.addBookToJoinTable(username, bookid, 'haveread');
    bookService.deleteBookFromJoinTable(username, bookid, 'toread');

    if(added) {
        return {statusCode: 201, body: JSON.stringify({}), headers: {'Access-Control-Allow-Origin': '*'}};
    } else {
        return {statusCode: 404, body: JSON.stringify({}), headers: {'Access-Control-Allow-Origin': '*'}};
    }
}