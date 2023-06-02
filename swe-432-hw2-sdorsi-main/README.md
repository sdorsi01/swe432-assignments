# SWE-432 HW-2 Starter Application

## Submission Information

### Student Information

*Please fill in this information before submission*

* **Student Name: Simon D'Orsi** 
* **Student G-Number: G01194005** 
* **Heroku Deployment URL: (https://simon-dorsi-swe432-hw2.herokuapp.com)**

### Documentation of your 7 Scenarios

*Here please describe your 7 scenarios complete with details about the endpoint and expected output. We provide one example below. If using route parameters, please provide an example API query*

* Returns a list of 20 songs with similar title to ":search"
  * API Endpoint: GET /songs/:search
  * Example: GET /songs/fire
  * Expected Output: List of 20 custom Song objects where the title or artist contains the word "fire".

* Returns a list of 10 songs from the specified artist in :artistName
  * API Endpoint: GET /artist/:artistName
  * Example: GET /artist/Metallica
  * Expected Output: List of 10 custom Song objects, all with the artist as "Metallica"

* Returns a url for the tabs of the specied part in a query (options: bass, drum, or default guitar)
  * API Endpoint: GET /:title/tabs OR /:title/tabs?part=[bass,drum,drums]
  * Example: GET /"Stairway to heaven"/tabs?part=drums
  * Expected Output:"https://www.songsterr.com/a/wsa/led%20zeppelin-stairway%20to%20heaven%20(guitar%20solo)-drum-tab-s393733"

* Returns a single song based on the title ":name" given
  * API Endpoint: GET /song/:name
  * Example: GET /song/"Stairway to heaven"
  * Expected Output: {"name":"Stairway To Heaven (Guitar Solo)","name_id":393733,"artist":"Led Zeppelin","artist_id":25}

* Returns a list of recently searched songs from /:title/tabs or /song/:name
  * API Endpoint: GET /recent
  * Example: GET /recent (After searching for Symphony of Destruction, Motorbreath,and Stairway to heaven)
  * Expected Output: List of all songs searched from when using the other endpoints listed => [{"name":"Symphony Of Destruction","name_id":487,"artist":"Megadeth","artist_id":212},{"name":"Motorbreath","name_id":12192,"artist":"Metallica","artist_id":20},{"name":"Stairway To Heaven (Guitar Solo)","name_id":393733,"artist":"Led Zeppelin","artist_id":25}]

* Allows a list of names given to be used to as recommendations instead
  * API Endpoint: POST /recommended
  * Example: POST /recommended
  * Expected Output: Without a list given, it will use the preloaded data of songs (Can also be seeen with GET /recommended)

* Adds a song to the list of favorites, to be implemented with persistant data
  * API Endpoint: POST /favorites
  * Example: POST /favorites
  * Expected Output: [] (Will currently return an empty list until a front end allows for user addition of songs)
  
## Project Overview

This repo contains a barebones Node.js app using [Express 4](http://expressjs.com/). You will use this as the "base" version of your Microserivce application for HW Assignment #2. You will simply create a copy of this repo through GitHub classroom and then work in that repo. 

## Homework Assignment #2 Detailed Instructions

You can find the deatiled instructions for HW Assignment #2 on the [course webpage](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f21/hw2). Please read these carefully before getting started.

## Running this Project Locally

Make sure you have [Node.js](http://nodejs.org/) and (optionally) the [Heroku CLI](https://cli.heroku.com/) installed. You only need the Heroku CLI installed if you plan to deploy the project from the CLI instead of the Heroku web interface. See the [HW Assignment #2 instructions](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f21/hw2) for more details.

*Note the following commands assume a Unix-based enviornment. If you are on windows, you may need to use something such as Windows Subsystem for Linux (https://docs.microsoft.com/en-us/windows/wsl/about).*

```sh
$ git clone <repo-name>
$ cd <repo-name>
$ npm install
$ npm start
```

After executing these commands, your app should now be running on [localhost:3000](http://localhost:3000/). You can visit this in your browser to see your 

## Deploying to Heroku

Check out [our instructions](https://cs.gmu.edu/~kpmoran/teaching/swe-432-f21/hw2) for deploying your application to Heroku. You can use the button below for quick access to your Heroku account.

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Testing with Continuous Integration

Currently, this repo is set up to run the Jest tests in the `app.test.js` file upon each commit to the `main` branch of the repository. If any of the tests fail, the CI process will fail and this will be indicated with red "X" on the main page of your repo, and GitHub will likely also send you a notification email that your automated tests have failed.

Currently, the tests are configured to run by getting deployed to a remote virtual server with an Ubuntu operating system, where the `npm install` and `npm test` commands are executed. We don't anticpate you needing to change this configuration, as it is fine to keep all of your tests in the `app.test.js` for this assignment. 

We expect that all of your (at least) 12 unit tests will have passed via the command line by the time you turn in the assignment.

You can find the [GitHub Actions](https://github.com/features/actions) script for this CI job [here](.github/workflows/ci.yml) if you want to learn more.

## Additional Resources

For more information about using Node.js on Heroku, see these Heroku Dev Center articles:

- [Getting Started on Heroku with Node.js](https://devcenter.heroku.com/articles/getting-started-with-nodejs)
- [Heroku Node.js Support](https://devcenter.heroku.com/articles/nodejs-support)
- [Node.js on Heroku](https://devcenter.heroku.com/categories/nodejs)
- [Best Practices for Node.js Development](https://devcenter.heroku.com/articles/node-best-practices)
