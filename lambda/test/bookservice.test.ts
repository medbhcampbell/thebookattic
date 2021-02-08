const { handler } = require('../bookService/addBook');

jest.mock('bookservicelayer', () => ({
    BookService: {
        addBook: jest.fn()
    }
}));
const mockBSL = require('bookservicelayer');

describe('Tests for addBook', () => {
    test('That addBook returns the added book when layer returns true', async ()=> {
        expect(mockBSL.BookService.addBook).not.toHaveBeenCalled();
        //const { handler } = require('../bookService/addBook');
        const bookEvent = {"body": JSON.stringify({"authorid":1,"title":"test Title","cover":"testUrl","blurb":"test blurb","page_count":432,"link":null,"genreid":1})};
        console.log(bookEvent);
        mockBSL.BookService.addBook.mockResolvedValue(true);
        const res = await handler(bookEvent);
        expect(mockBSL.BookService).toHaveBeenCalledTimes(1);
        expect(mockBSL.BookService.addBook).toHaveBeenCalledTimes(1);
        expect(res).toBe({statusCode: 201, body: bookEvent, headers: {'Access-Control-Allow-Origin': '*'}})
        expect(mockBSL.addBook).toHaveBeenCalledTimes(1);
    });
});
