const Book = require('../models/Book');
const Review = require('../models/Review');

exports.createBook = async (req, res) => {  //Create a Book
  try {
    const { title, author, genre } = req.body;
    const book = await Book.create({ title, author, genre });
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const { page = 1, limit = 5, author, genre } = req.query;  //5 Books per page (pagination eff.)
    const query = {};
    if (author) query.author = new RegExp(author, 'i');
    if (genre) query.genre = new RegExp(genre, 'i');

    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate({
      path: 'reviews',
      populate: { path: 'user', select: 'username' }
    });

    if (!book) return res.status(404).json({ message: 'Book not found' });

    const ratings = book.reviews.map((r) => r.rating);
    const avgRating = ratings.length
      ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2)   //avg rating calci.
      : 'No ratings yet';

    res.json({ ...book.toObject(), avgRating });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
