# Full-Stack Application with React, Nest.js, and MySQL

This project is a full-stack application that includes a React frontend, a Nest.js backend, and MySQL for data storage. The entire stack is containerized using Docker, making it simple to build and run.

## Features

- **User Registration & Login:** Users can sign up and log in using their email or phone number.
- **User Validation:** Each user must have a unique email or phone number. Duplicate entries are not allowed.
- **User Data Viewing:** After logging in, users can view their personal data.
- **Authentication:** Secure authentication is provided using either phone number or email with a password.

## Prerequisites

You need to have the following installed to run the project:

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Getting Started

To get the project running locally, follow these steps.

### 1. Clone the Repository

  ```sh
  git clone https://github.com/andrii-shpontak/full-stack-crm-app.git
  ```

### 2. Navigate to the project directory:

  ```sh
      cd full-stack-crm-app/
  ```

### 3. Start the application using Docker:

  ```sh
      docker-compose up
  ```

### 4. Open link:

  ```link
      http://localhost:3000/
  ```