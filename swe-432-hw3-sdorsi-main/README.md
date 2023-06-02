# SWE-432 HW-3 Starter Application

## Submission Information

### Student Information

*Please fill in this information before submission*

* **Student Name: Simon D'Orsi** 
* **Student G-Number: G01194005** 
* **Heroku Deployment URL: https://simon-dorsi-swe432-hw3.herokuapp.com/**

### Documentation of your Web App and React Components

*Here please describe your (at least) 3 different React components as well as the overall purpose of your web application. We provide an example below of what we expect this documentation to look like.*

**General App Description:** This web application provides a list of the top 5 songs from each artist in the default set. It then displays each song sorted by title and author, as well as a link to TABS for the guitar, bass, and drum parts using Songsterr's API. (Order of display: Sorted by Songs | Show All Tabs | Sorted by Artist)

* **Endpoint 1:** Retrieve the songs from firebase based on the title.
  * API Endpoint: GET /bySong
  * Example: GET /bySong
  * Expected Output: JSON list of songs beginning with "A" from fire base, then "B", and so on.

  * **Endpoint 2:** Retrieve the songs from firebase based on the artist's name.
  * API Endpoint: GET /byArtist
  * Example: GET /byArtist
  * Expected Output: JSON list of songs , sorted by the artist's names beginning with "A" from firebase, then "B", and so on.

* **Component 1:** Sort by Song Component
	* API Endpoint(s):
  		* GET /bySong
  * Expected display: An html list of the songs contained within the Firebase database in alphabetical order.

  * **Component 2:** Sort by Artist Component
	* API Endpoint(s):
  		* GET /byArtist
  * Expected display: An html list of the songs contained within the Firebase database using the artist's name to sort in alphabetical order.

  * **Component 3:** By Tabs Component
	* API Endpoint(s):
  		* GET /bySong
  * Expected display: An html list of the songs contained within the Firebase database with a group of links attached to take the user to different instrument parts. It gives TABS for guitar, bass, and drums using Songsterr's API.

## Project Overview

This repo contains a barebones Node.js app using [Express 4](http://expressjs.com/) and a barebones React app with a single component. You will use this as the "base" version of your Microserivce + Front-end application for HW Assignment #3. You will simply create a copy of this repo through GitHub classroom and then work in that repo. 

## Homework Assignment 3 Detailed Instructions

You can find the deatiled instructions for HW Assignment #3 on the [course webpage](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f22/hw3). Please read these carefully before getting started.

## Running this Project Locally

Make sure you have [Node.js](http://nodejs.org/) and (optionally) the [Heroku CLI](https://cli.heroku.com/) installed. You only need the Heroku CLI installed if you plan to deploy the project from the CLI instead of the Heroku web interface. See the [HW Assignment #3 instructions](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f22/hw3) for more details.

*Note the following commands assume a Unix-based enviornment. If you are on windows, you may need to use something such as Windows Subsystem for Linux (https://docs.microsoft.com/en-us/windows/wsl/about).*

```sh
$ git clone <repo-name>
$ cd <repo-name>
$ npm install
$ npm run setup
$ npm start
```

You can also indepedently start the express and React servers using the following commands:

```sh
$ npm run start-express
$ npm run start-react
```

After executing these commands, your express backend should now be running on [localhost:6000](http://localhost:6000/) and your React frontend should now be running at [localhost:3000](http://localhost:3000/). You can visit this page in your web browser to view your front-end user interface. You can also access your microservice endpoints (e.g., [localhost:6000/cities](http://localhost:6000/cities). Please see the [HW #3 instructions](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f22/hw3) for more information on how this works.

## Deploying to Heroku

Check out [our instructions](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f22/hw3) for deploying your application to Heroku. You can use the button below for quick access to your Heroku account.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Testing with Continuous Integration

**Note that you are not required to test your project with Jest for HW3, however, we have enabled this functionality in case you would like to use it. If you would like to remove the tests, you can remove the `.github` directory from the repo.**

Currently, this repo is set up to run the Jest tests in the `app.test.js` file upon each commit to the `main` branch of the repository. If any of the tests fail, the CI process will fail and this will be indicated with red "X" on the main page of your repo, and GitHub will likely also send you a notification email that your automated tests have failed.

Currently, the tests are configured to run by getting deployed to a remote virtual server with an Ubuntu operating system, where the `npm install` and `npm test` commands are executed.

You can find the [GitHub Actions](https://github.com/features/actions) script for this CI job [here](.github/workflows/ci.yml) if you want to learn more.

## Additional Resources

For more information about using Node.js on Heroku, see these Heroku Dev Center articles:

- [React Tutorial](https://reactjs.org/tutorial/tutorial.html)
- [Express Documentation](https://expressjs.com/en/5x/api.html)
- [Supertest Documentation](https://www.npmjs.com/package/supertest)
- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
