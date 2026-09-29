# MongoDB Live Coding API

Mini API built with Express, MongoDB, and Mongoose.

## Requirements

- Node.js
- MongoDB
- npm

## Installation

```bash
npm install
```

## Run the API

Create a `.env` file with your MongoDB connection and port:

```env
MONGO_URI=mongodb://127.0.0.1:27017/live_mongoose
PORT=3000
```

Start the development server:

```bash
npm run dev
```

The API is available at `http://localhost:3000`.

## API routes

```text
GET  /api/categories
POST /api/categories
GET  /api/products
POST /api/products
```

Product filters are supported through query parameters:

```text
/api/products?name=laptop
/api/products?category=CATEGORY_ID
/api/products?minPrice=500&maxPrice=1500
```

## Documentation

The complete live coding guide, including setup steps, explanations, source code, and Postman examples is available here:

- [Live coding guide](docs/live-coding-guide.md)
- [PDF guide](docs/mongodb-live-coding-guide.pdf)

Regenerate the PDF with:

```bash
npm run docs:pdf
```
