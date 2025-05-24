# Book-Review-API
Build a RESTful API using Node.js (with Express) for a basic Book Review system.

---

## 🚀 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB + Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Tools**: Postman (Testing), dotenv

---

## 📦 Project Setup Instructions

### 1. Clone the Repository

- git clone https://github.com/AarDG10/Book-Review-API.git

### 2. Install Dependencies

- npm install -y

### 3. Environment Variables

Create a `.env` file in the root directory and configure the following:

PORT=3000 <br>
MONGO_URI=yourmongourisetup<br>
JWT_SECRET=yourSuperSecretKey 


> ⚠️ Make sure MongoDB is running locally or use a cloud instance like MongoDB Atlas (Have Used Atlas for this task, setup using aws free tier).

### 4. Run the Server

- npm run dev

It is to be noted that the main server file is server.js that conducts the server start and linking with mongodb etc..
After The Server is Up and Running , Further Testing can be done via Postman or Curl Req. (Have Used Postman for this task)

## 📬 API Endpoints & Sample Requests (Testing of Endpoints done via Postman)

### 🔐 Authentication

#### `POST /signup` – Register

- Endpoint: http://localhost:3000/auth/signup

JSON Body Has to be added indicating needed credentials as:
{
  "username": "yourusername",
  "password": "yourpassword"
}


#### `POST /login` – Login and Get Token

- Endpoint: http://localhost:3000/auth/login

JSON Body Has to be added indicating login credentials as:
{
  "username": "yourusername",
  "password": "yourpassword"
}

---

### 📚 Book Review

#### `POST /books` – Add Book (Auth Required)

- Endpoint: http://localhost:3000/books

JSON Body Has to be added indicating book details as:
{
  "title": "book_title",
  "author": "book_author",
  "genre": "book_genre"
}


#### `GET /books` – Get All Books (with filters + pagination)

- Endpoint: http://localhost:3000/books

example usage: http://localhost:3000/books?page=1&limit=5&author=James&genre=Self-help

#### `GET /books/:id` – Get Book by ID (with avgRating + reviews)

- Endpoint: http://localhost:3000/books/BOOK_ID

Remember to replace BOOK_ID var with a valid book id

example usage: http://localhost:3000/books/6831581c0d774f3ede4fa09e

---

### ✍️ Review Management

#### `POST /books/:id/reviews` – Submit Review (Auth Required)

- Endpoint: http://localhost:3000/books/BOOK_ID/reviews
Make sure while testing that under headers in Postman you add a Key: "Authorization: Bearer your_token"
Herein your_token implies the JWT token received on login

JSON Body Has to be added indicating review details as:
{
  "rating": 5,
  "comment": "Life-changing insights."
}

example usage: http://localhost:3000/books/6831581c0d774f3ede4fa09e/reviews

#### `PUT /reviews/:id` – Update Review

- Endpoint: http://localhost:3000/reviews/REVIEW_ID
Make sure while testing that under headers in Postman you add a Key: "Authorization: Bearer your_token"
Herein your_token implies the JWT token received on login

JSON Body Has to be added indicating review details as:
{
  "rating": 4,
  "comment": "Changed my mind, still good."
}

example usage: http://localhost:3000/reviews/68315d6ae363c2441f226798

#### `DELETE /reviews/:id` – Delete Review

- Endpoint: http://localhost:3000/reviews/REVIEW_ID
Make sure while testing that under headers in Postman you add a Key: "Authorization: Bearer your_token"
Herein your_token implies the JWT token received on login

example usage: http://localhost:3000/reviews/68315d6ae363c2441f226798

---

### 🔍 Search

#### `GET /search?query=Atomic` – Search by title/author (any keyword)

- Endpoint: http://localhost:3000/search?query=Atomic

example usage: http://localhost:3000/books/search?query=Habits

No Auth. Required here, can search without auth.

---

## 🧠 Design Decisions & Assumptions

- A user can review a book **only once**, can be altered but locked in for control check cases of spam review.
- Pagination is applied to both books and reviews using `page` and `limit`.
- Search is **case-insensitive** and supports partial matches.
- JWT is used for secure, stateless authentication.
- MongoDB is chosen for flexible schema and fast and ease of development.
- Assuming 'genre' attribute that is part of the book schema is not really required since some books may not have genres

---

## 🧩 Database Schema (MongoDB with Mongoose)

### User

```js
{
  username: String,
  password: String, // hashed
}
```

### Book

```js
{
  title: String,
  author: String,
  genre: String,
  reviews: [ObjectId], // references Review
}
```

### Review

```js
{
  user: ObjectId,   // references User
  book: ObjectId,   // references Book
  rating: Number,   // 1 to 5
  comment: String,
  createdAt: Date
}
```

---