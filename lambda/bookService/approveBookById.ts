// Admins can approve books

import BookService from 'bookservicelayer';

interface BookEvent {
    path: string;
}

export const handler = async (event: BookEvent): Promise<any> => {
    let bookid = Number(event.path.substring(event.path.lastIndexOf('/')+1, event.path.length));
    const bookService = new BookService();
    const approvedBooks = await bookService.approveBookById(bookid);
    
    if(approvedBooks) {
        console.log(JSON.stringify(approvedBooks));
        return {statusCode: 200, body: JSON.stringify(approvedBooks), headers: {'Access-Control-Allow-Origin': '*'}};
    } else {
        return {statusCode: 404, body: JSON.stringify({}), headers: {'Access-Control-Allow-Origin': '*'}};
    }
}