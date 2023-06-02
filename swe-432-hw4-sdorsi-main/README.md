# SWE-432 HW-4 Starter Application

## Submission Information

### Student Information

*Please fill in this information before submission*

* **Student Name: Simon D'Orsi** 
* **Student G-Number: G01194005** 
* **Heroku Deployment URL: https://simon-dorsi-swe432-hw4.herokuapp.com/ **

### Documentation of your Web App and React Components

*Here please describe your (at least) 5 different React components as well as the overall purpose of your web application. We provide an example below of what we expect this documentation to look like.*

**General App Description:** This web application allows a user to search for songs using a database from the website "Songsterr". The user can add or remove songs from a favorites list, view what was recently added (50 most recent songs), view a recommendation based on artists, and go to Songsterr's webpage to view the musical TABS for the corresponding part unless the requsted part does not exist. If the latter is the case, it will take the user to the default part for the song.

* **React Component 1:** Navbar for users to control what they are viewing.
  * *Functionality:* Displays corresponding list of songs based on the tab selected.
  * *Interactivity:* The user can click on the word to display the proper page. Possible pages include "Home" for searching list, "Favorites" to see added list, "Recommended" to see a list based on authors from the favorites, and "History" for a list of recently added songs.

* **React Component 2:** Search bar for user input.
  * *Functionality:* Fetches the searched term onChange using the Songsterr API to retrieve a list.
  * *Interactivity:* The user can type in the bar and the list in Component 3 will dynamically change based on this input. When the user begins to type, the page will be set to "Home".

* **React Component 3:** Song list for a display of information the user requested.
  * *Functionality:* Displays list based on user input and page selected.
  * *Interactivity:* User can use this list to find the desired song from the name or artist searched, and scroll vertically or horizontally as necessary to see the returned songs.

* **React Component 4:** Action list that a user can do with the song that each entry is attached to.
  * *Functionality:* Depending on the current page, this allows for a user to add or remove a song from favorites, as well as view the instrument TABS for the corresponding song from Component 3.
  * *Interactivity:* The user can click on the add("+") and remove("-") buttons, as well as clickable links to the Songsterr website for TABS of guitar, bass, and drum parts.

* **React Component 5:** Recently added list for a user to interact with previously added items.
  * *Functionality:* This is a list that is always visible and shows everything that has been added, even if it was also removed afterwards. The difference between the "History" page and this component is that the page allows you to view the TABS and add the song to the favorites list again. This component, on the other hand, lets you remove the song based on its title and is always visible to the user so they can do this on any page.
  * *Interactivity:* The user can click the remove("-") button on any page to remove that song from favorites. 

## Project Overview

This repo contains a barebones React app with a single component. You will use this as the "base" version of your Interactive Front-end application for HW Assignment #4. You will simply create a copy of this repo through GitHub classroom and then work in that repo. 

## Homework Assignment 3 Detailed Instructions

You can find the deatiled instructions for HW Assignment #4 on the [course webpage](https://kpmoran.cs.gmu.edu/swe-432-f22/hw4-tutorial/). Please read these carefully before getting started.

## Running this Project Locally

Make sure you have [Node.js](http://nodejs.org/) and (optionally) the [Heroku CLI](https://cli.heroku.com/) installed. You only need the Heroku CLI installed if you plan to deploy the project from the CLI instead of the Heroku web interface. See the [HW Assignment #4 instructions](https://kpmoran.cs.gmu.edu/swe-432-f22/hw4-tutorial/) for more details.

*Note the following commands assume a Unix-based enviornment. If you are on windows, you may need to use something such as Windows Subsystem for Linux (https://docs.microsoft.com/en-us/windows/wsl/about).*

```sh
$ git clone <repo-name>
$ cd <repo-name>
$ npm install
$ npm start
```

After executing these commands, your React frontend should now be running on [localhost:3000](http://localhost:3000/). You can visit this page in your web browser to view your front-end user interface.

## Deploying to Heroku

Check out [our instructions](https://kpmoran.cs.gmu.edu/swe-432-f22/hw4-tutorial/) for deploying your application to Heroku. You can use the button below for quick access to your Heroku account.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Testing with Continuous Integration

**Note that you are not required to test your project with Jest for HW3, however, we have enabled this functionality in case you would like to use it. If you would like to remove the tests, you can remove the `.github` directory from the repo.**

Currently, this repo is set up to run the Jest tests in the `App.test.js` file upon each commit to the `main` branch of the repository. If any of the tests fail, the CI process will fail and this will be indicated with red "X" on the main page of your repo, and GitHub will likely also send you a notification email that your automated tests have failed.

Currently, the tests are configured to run by getting deployed to a remote virtual server with an Ubuntu operating system, where the `npm install` and `npm test` commands are executed.

Note that we have included the [`jest-dom`](https://testing-library.com/docs/ecosystem-jest-dom/) library for your tests. This allows you to check DOM elements in your tests.

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
