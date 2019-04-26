To launch this project in the local machine.

First create a .env file in `./server` directory with the following details.

```js
MONGO_DB=mongodb://localhost:27017/ies-db

NODE_ENV=development

```

Then - run `npm install` in both the `./server` and `./client` directories separately, to install all the npm packages for server and client respectively.

Then, start mongodb service with `sudo service mongod start` and then finally run the following command

- `npm run dev`

Which will start both the client (port 3000) and server (port 5000) and launch the site in port 3000. Then navigate to one of the below.

Then navigate to the public or the private (only for logged-in user) site

The site is running at - [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

#### To run the tests

`cd client` and then `npm test`

