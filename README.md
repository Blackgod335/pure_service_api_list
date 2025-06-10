# Pure Service

A Node.js RESTful API for managing users, customers, technicians, and tags, built with Express and MongoDB.

## Features

- User authentication (signup, login, password reset)
- Customer and technician management (CRUD operations)
- Tag management and assignment to customers
- Data fetching with aggregation and pagination
- JWT-based route protection
- Input validation using Zod
- Email sending via SendGrid

## Project Structure

```
.
├── app.js
├── router.js
├── common/
│   ├── common_function.js
│   └── fetchData.js
├── controller/
│   ├── customer.js
│   ├── fetch.js
│   ├── tag.js
│   ├── technician.js
│   └── user.js
├── model/
│   ├── customer.js
│   ├── tags.js
│   ├── technician.js
│   └── user.js
├── router/
│   ├── customer.js
│   ├── fetch.js
│   ├── tag.js
│   ├── technician.js
│   └── user.js
├── validation/
│   ├── customer.js
│   ├── technicain.js
│   └── user.js
├── .env
├── package.json
└── ...
```

## API Endpoints

- `/api/user` - User authentication routes
- `/api/customer` - Customer management routes
- `/api/technician` - Technician management routes
- `/api/tag` - Tag management routes
- `/api/fetch` - Aggregated data fetch

## Technologies Used

- Node.js
- Express.js
- MongoDB & Mongoose
- JWT for authentication
- Zod for validation
- SendGrid for email
- Prettier, ESLint, Stylelint for code quality
  
## Dependencies

- bcryptjs(password hashing)
- dotenv
- jsonwebtoken
- mongoose
- zod
- @sendgrid/mail

## Dev Dependencies

- nodemon
- eslint

> Developed by Blackgod
