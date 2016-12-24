# avhs-test
A little test project for avhs

## Dependencies 

* nodejs 4.4.2+ (and npm)
* webpack 1.12.9

Install nodejs for your environment from [NodeJS.org](www.nodejs.org)

## Develop 

Begin with `npm install` in root directory. Depending on your installation `sudo` might be needed.

Make sure you have a `config.sh` file in the root directory of this project that exports password and usernames from the environment variables. 
 
 It should look like this:
 
     # !/bin/bash
 
     export username=YourUserName
     export password=YourPassword
     export url=TheAPIURL
     
    
Run it form a terminal with this command: `. config.sh`

Start webpack server with `nodejs webpack-server.js`
Start the api server with `nodejs server.js`

Open browser and go to `localhost:9098`

## Build the project and run "production"

To build the project, make sure you have webpack installed and that you are exposing the needed environment variables described in "Develop" section.
 
Run `webpack` (To get minified version type `webpack -p`). A folder called `dist/` will be created. 
Some warnings probably, but they doesn't matter.

Then run `nodejs server.js`

Open browser and go to `localhost:9090`

## My environment

This project is tested on Linux 3.19.0-33-generic Ubuntu 15.04 x86_64 with Chrome 50.0.2661 and FireFox 44.0 