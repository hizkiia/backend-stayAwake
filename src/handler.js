const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    if (name === undefined) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. Mohon isi nama buku"
        })
        response.code(400);
        return response;
    } else if (pageCount < readPage) {
        const response = h.response({
            status: "fail",
            message: "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
        })
        response.code(400);
        return response;
    }
    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    let finished = undefined;
    if (pageCount === readPage) { finished = true; }
    else { finished = false; }


    const newBook = {
        name, year, author, summary, publisher, pageCount, readPage, finished, reading, id, insertedAt, updatedAt,
    };
    books.push(newBook);

    const response = h.response({
        status: "success",
        message: "Buku berhasil ditambahkan",
        data: {
            bookId: id
        },
    });
    response.code(201);
    return response;

    // const response = h.response({
    //     status: 'fail',
    //     message: "Gagal menambahkan buku. Mohon isi nama buku",
    // });
    // response.code(500);
    // return response;
};

const getAllBooksHandler = (request) => {
    const { reading, finished, name } = request.query;

    let filteredBooks = [...books];

    if (reading === '0') {
        filteredBooks = filteredBooks.filter(book => !book.reading);
    } else if (reading === '1') {
        filteredBooks = filteredBooks.filter(book => book.reading);
    }

    if (finished === '0') {
        filteredBooks = filteredBooks.filter(book => !book.finished);
    } else if (finished === '1') {
        filteredBooks = filteredBooks.filter(book => book.finished);
    }

    if (name) {
        const searchName = new RegExp(name, 'i');
        filteredBooks = filteredBooks.filter(book => searchName.test(book.name));
    }

    const responseData = {
        status: 'success',
        data: {
            books: filteredBooks.map(book => ({ id: book.id, name: book.name, publisher: book.publisher }))
        },
    };

    return responseData;
};

const getBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const book = books.find((book) => book.id === bookId);

    if (!book) {
        const response = h.response({
            status: 'fail',
            message: 'Buku tidak ditemukan',
        });
        response.code(404);
        return response;
    }

    return {
        status: 'success',
        data: {
            book,
        },
    };
};

const editBookByIdHandler = (request, h) => {
    const { bookId } = request.params;


    const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload;
    if (name === undefined) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. Mohon isi nama buku"
        })
        response.code(400);
        return response;
    } else if (pageCount < readPage) {
        const response = h.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"
        })
        response.code(400);
        return response;
    }
    const index = books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        books[index] = {
            ...books[index],
            name, year, author, summary, publisher, pageCount, readPage, reading,
        };
        const response = h.response({
            status: 'success',
            message: "Buku berhasil diperbarui",
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
};

const deleteBookByIdHandler = (request, h) => {
    const { bookId } = request.params;

    const index = books.findIndex((book) => book.id === bookId);
    if (index !== -1) {
        books.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: "Buku berhasil dihapus",
        });
        response.code(200);
        return response;
    }
    const response = h.response({
        status: 'fail',
        message: "Buku gagal dihapus. Id tidak ditemukan",
    });
    response.code(404);
    return response;
};

module.exports = {
    addBookHandler,
    getAllBooksHandler,
    getBookByIdHandler,
    editBookByIdHandler,
    deleteBookByIdHandler,
};
