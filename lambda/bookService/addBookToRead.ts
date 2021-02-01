// Users can add a book to their 'to read' or 'have read' list

import BookService from 'bookservicelayer';

interface BookEvent {
    body: string;
    path: string;
}

export const handler = async (event: BookEvent): Promise<any> => {
    const bookService = new BookService();

    const bookid: number = Number(JSON.parse(event.body).bookid);
    const username = event.path.substring(event.path.lastIndexOf('/')+1, event.path.length);
    let tablename = 'toread';
    if(event.path.includes('haveread')) {
        tablename = 'haveread';
        bookService.deleteBookFromJoinTable(username, bookid, 'toread');
    }

    console.log(`adding book ${bookid} to ${username}'s ${tablename} list`);
    const added = await bookService.addBookToJoinTable(username, bookid, tablename);

    if(added) {
        return {statusCode: 201, body: JSON.stringify({}), headers: {'Access-Control-Allow-Origin': '*'}};
    } else {
        return {statusCode: 404, body: JSON.stringify({}), headers: {'Access-Control-Allow-Origin': '*'}};
    }
}