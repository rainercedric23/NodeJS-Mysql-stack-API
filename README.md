# Timesheet API (Unfinished Project)

NodeJS and MySQL stack

## Overview
Timesheet API server was generated using the [OpenAPI Generator](https://openapi-generator.tech) project.

## Getting Started

### Prerequisites
- NodeJS >= 12.9.1
- NPM >= 6.10.0
- Docker >= 18.09.8
- MySQL >= 5.7

## Installation

Load dependencies thru:

```
npm install
```

Rename `.env.example` to `.env` and edit the properties that you need ie. if you don't want to use docker MYSQL and run your own service

### Running the server
To run the server, run:

```
npm dev // This will run both npm install, tsc and nodemon for development (will watch your files)
```

or

```
npm start // This will run both npm install, tsc and node 
```

### Getting Started

Please refer to [OpenAPI Specifiction](https://swagger.io/docs/specification/about/) to better understand how it works

Basically the router is tied up on the open api Yaml file and will also validate parameters on the fly.

#### Creating New Controllers and Services Base on Operation ID

Basically you'll have three main parameters from HTTP Post request that is necessary
before proceeding `operationId`, `x-openapi-router-controller` and `x-openapi-router-service` 
these three will be validated by the router if it exists

First the router:

```
import Controller from "@controllers/Controller";

class AuthController {
    service: any;

    constructor(Service) {
        this.service = Service;
    }

    async loginUser(request, response) {
        await Controller.handleRequest(request, response, this.service.loginUser);
    }
}

export default Controller;
```

Then update the `index.ts` under the controller directory:

```
import UserController from "@controllers/AuthController";

export default {
    AuthController,
};

```

This will register all the controllers for the router. Next is the service:

```
import Service from "@services/Service";

class AuthService {
	    static loginUser(params) {
        return new Promise(
            async (resolve) => {
                try {
                	// Your code goes here
                } catch (e) {
                	// catch errors
                }
            },
        );
    }
}

export default AuthService;

```

Then register the service on the `index.ts` file also:

```
import AuthService from "@services/AuthService";

export default {
    AuthService,
};

```


That's it you can now implement any logic inside the service

### View and test the API
You can see the API documentation, and check the available endpoints by going to http://localhost:3000/api-docs/.  Endpoints that require security need to have security handlers configured before they can return a successful response. At this point they will return [ a response code of 401](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/401).

### Other Documents that you may have missed

* [Creating New auth middleware for your new services (December 16, 2019)](./docs/middleware.md)
