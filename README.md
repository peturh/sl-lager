# SL Lager hantering

## Dependencies 

* nodejs 4.4.2+ (and npm)
* webpack 1.12.9
* pm2
* mongodb

Install nodejs for your environment from [NodeJS.org](www.nodejs.org)

## Develop 

Begin with `npm install` in root directory. Depending on your installation `sudo` might be needed.
    
Run it form a terminal with this command: `. config.sh`

Start webpack server with `nodejs webpack-server.js`
Start the api server with `nodejs server.js`

Open browser and go to `localhost:9098`

Initiate the database, creating a user with username `admin` and password `admin` by accessing `localhost:9098/initiateDatabase`.

## Build the project and run "production"

To build the project, make sure you have webpack  and pm2 installed and that you run `npm install`, sude might be needed depending on your installation.
 
Run `webpack` (To get minified version type `webpack -p`). A folder called `dist/` will be created. 
Some warnings probably, but they doesn't matter.

Then run `pm2 start server.js`

The production environment will be exposed on port `9090`.

Initiate the database, creating a user with username `admin` and password `admin` by accessing `[url of the server]:9090/initiateDatabase`. Remember to change the password of the admin.

## My environment

This project is tested on Linux 3.19.0-33-generic Ubuntu 15.04 x86_64 with Chrome 50.0.2661 and FireFox 44.0 
