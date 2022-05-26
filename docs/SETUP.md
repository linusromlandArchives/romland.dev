# Setup guide

This is the setup guide for the project. It will guide you through the steps to build and run the project.

## Clone the project

Before you can start the setup, you need to clone the project to your local machine.

```bash
# Clone the repository:
git clone https://github.com/linusromland/romland.dev.git

# Navigate to the project folder:
cd romland.dev
```

## Dependencies

### Node.js & NPM

This project uses [Node.js](https://nodejs.org/) and [NPM](https://www.npmjs.com/).

Make sure you have both Node.js and NPM installed on your machine.

### MySQL database

The project also uses MySQL for its database.

Make sure you have MySQL installed on your machine or have access to a database server.

## Building Frontend

The first thing you need to do is to navigate to the `frontend` folder:

```bash
# Navigate to the frontend folder:
cd frontend
```

Next you need to install all the necessary dependencies used by the frontend.

```bash
# Install all the dependencies:
npm install
```

Now you can build the frontend.

```bash
# Build the frontend:
npm run build
```

Thats everything you need to do to build the frontend.

## Starting the Server

Start by navigating to the `backend` folder

**_Note:_** If you are doing this after building the frontend, you need to navigate back to the root of the project first. Do this with `cd ..`

```bash
# Navigate to the backend folder:
cd backend
```

Next you need to install all the necessary dependencies used by the backend.

```bash
# Install all the dependencies:
npm install
```

### **_Optional step_** `.env` setup:

First create you `.env` file

```bash
# Create a `.env` file:
touch .env
```

Then add the following lines to the `.env` file:

```bash
PORT=3000
SECRET_KEY=secret
MYSQLHOST=localhost
MYSQLUSER=root
MYSQLPASS=12345
MYSQLDB=devDB
```

Change all the values to your own.

**_Note:_** All the variables in the `.env` file are optional. If you don't want to use them, just leave the line empty and the default value will be used.

Now you can start the server.

```bash
# Start the server:
npm run start
```

This will start the server on port 3000 (or the port you specified in the `.env` file).

To stop the server, use `CTRL + C`

That's all you need to do to build and run the project.
