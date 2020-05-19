mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  isbn: {
    type: String,
  },
  title: {
    type: String,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
  },
  sellerEmail: {
    type: String,
  },
  used: {
    type: Boolean,
  },
	location: {
		city: {
			type: String,
		},
		street: {
			type: String,
		}
	}
});


const Book = mongoose.model('Book', bookSchema);

module.exports = Book;