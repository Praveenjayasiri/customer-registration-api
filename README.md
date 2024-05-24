# Customer Registration API

This project is a simple Customer Registration API built using Node.js and SQLite. It provides an endpoint to register customers and store their information in an SQLite database.

## Prerequisites

Before you begin, ensure you have met the following requirements:

- You have installed Node.js and npm.
- You have installed SQLite3.

## Installation

To install the necessary dependencies, run the following command:
npm install

Usage
To start the server, run the following command:
node server.js

The server will start and listen on http://127.0.0.1:8080

## API Endpoints
Register a Customer
URL: /register

Method: POST

Content-Type: application/json

Request Body:
{
    "name": "John Doe",
    "address": "123 Main St",
    "email": "john.doe@example.com",
    "dateOfBirth": "1990-01-01",
    "gender": "Male",
    "age": 30,
    "cardHolderName": "John Doe",
    "cardNumber": "123456781234",
    "expiryDate": "2024-12",
    "cvv": "123",
    "timeStamp": "2024-05-25T10:00:00Z"
}

## Response:

- 201 Created: If the customer is successfully registered.
{
    "message": "Customer John Doe has registered",
    "customerId": 1
}

- 400 Bad Request: If there is an error with the input data.
{
    "error": "Invalid email address"
}
or
{
    "error": "Invalid credit card number"
}
