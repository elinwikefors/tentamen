get = (req, res, next) => {
  let query;
  if(req.query.title) {
    query = req.models.Book.findOne({ 'title': req.query.title })
  }
  else
  {
    query = req.models.Book.find()
  }

  query.exec().then((books) => {
      return res.send(books);
    }).catch((error) => {
      next(error)
    })
}
postBook = (req, res, next) => {
  req.models.Book.create({
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    price: req.body.price,
    sellerEmail: req.body.sellerEmail,
    used: req.body.used,
    location: {
      city: req.body.location.city,
      street: req.body.location.street,
    }
  }).then((book) => {
    return res.status(201).send(book)
  }).catch((error) => {
    next(error)
  })
};

// .get:id 

getBookId = (req, res, next) => {
	req.models.Book.findById(req.params.id).then((books) => {
		return res.send(books)
	})
}

// .delete

deleteBook = async (req, res, next) => {
  try {
    const deleted = await req.models.Book.findByIdAndDelete(req.params.id);
    if (deleted) {
      console.log(deleted);
      return res.send(deleted);
    }
    return res.sendStatus(204);
  } catch (error) {
    return next(error);
  }
}

putBook = (req, res, next) => {
	req.models.Book.updateOne({_id: req.params.id}, 
		{
      isbn: req.body.isbn,
      title: req.body.title,
      author: req.body.author,
      price: req.body.price,
      selleremail: req.body.selleremail,
      used: req.body.used,
      location: {
        city: req.body.location.city,
        street: req.body.location.street,
			}
		},
		{
			new: true,
			upsert: true,
			runvalidators: true,
		}).then((status) => {
			console.log('status:', status)
				if (status.upserted)
					res.status(201) // created
				else if (status.unModified)
					res.status(200) // upadated
				else 
				res.status(204) // not change
			res.send()
		}).catch((error) => next(error))
}

module.exports = {
  get, get,
  postBook, postBook,
  getBookId, getBookId,
  deleteBook, deleteBook,
  putBook, putBook,
}
