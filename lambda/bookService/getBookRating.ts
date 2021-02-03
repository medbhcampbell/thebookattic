import BookService from 'bookservicelayer';

interface BookEvent {
    path: string;
}

export const handler = async (event: BookEvent): Promise<any> => {
    let bookid = Number(event.path.substring(event.path.lastIndexOf('/')+1, event.path.length));
    const bookService = new BookService();
    const book = await bookService.getBookRating(bookid);
    
    if(book) {
        console.log(book);
        return {statusCode: 200, body: book.toString(), headers: {'Access-Control-Allow-Origin': '*'}};
    } else {
        return {statusCode: 404, body: JSON.stringify({}), headers: {'Access-Control-Allow-Origin': '*'}};
    }
}