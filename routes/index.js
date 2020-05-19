const express = require('express')
const router = express.Router()

const book = require('./book.js')

router.get("/books", book.get)
router.get("/books/:id", book.getBookId)
router.post("/books", book.postBook)
router.put("/books/:id", book.putBook)
router.delete("/books/:id", book.deleteBook)

module.exports = router