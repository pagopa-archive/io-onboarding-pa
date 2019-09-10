# io-onboarding-pa
This repository contains the code of the front end used by the onboarding portal for public administrations of the IO project.

## How to run the application

### Dependencies

* [Docker](https://www.docker.com/) and [Docker Compose](https://github.com/docker/compose)

To fully simulate the SPID authentication process we use the images provided by the
[spid-testenv2](https://github.com/italia/spid-testenv2) project.

A Linux/macOS environment is required at the moment.

### Installation steps

1. clone the project
2. go to the project's folder
3. at the root level of your project create the folders `certs` and `testenv2/conf` and from the 
`io-onboarding-pa-api` project ([https://github.com/teamdigitale/io-onboarding-pa-api/](https://github.com/teamdigitale/io-onboarding-pa-api/))
copy in these folders the content of
[https://github.com/teamdigitale/io-onboarding-pa-api/tree/master/certs](https://github.com/teamdigitale/io-onboarding-pa-api/tree/master/certs) and 
[https://github.com/teamdigitale/io-onboarding-pa-api/tree/master/testenv2/conf](https://github.com/teamdigitale/io-onboarding-pa-api/tree/master/testenv2/conf)
respectively
4. run `docker-compose up --build` to start the containers
6. point your browser to [http://localhost:8080](http://localhost:8080) to view the front end;
you can find the backend at [http://localhost:8081](http://localhost:8081)

### Configuration
The project is already shipped with default environment variables; you can find them in
the `.env.*` files at the root level of the project.  
The `.env.io-onboarding-pa-api.*` files contains environment variables for the backend container;
for a complete description of these variables please refer to 
[https://github.com/teamdigitale/io-onboarding-pa-api/blob/master/README.md](https://github.com/teamdigitale/io-onboarding-pa-api/blob/master/README.md)   
The file `.env.io-onboarding-pa.development` contains environmental variables for the front end that are used when locally
testing with docker, see next section for a complete description of these variables.  
These variables are injected into the front end running env.sh script, that creates a `env-config.js` file into `/public` folder and is 
used inside `index.html` in the same folder. To get the value of these variables in your code, use
`window._env_.**variable_name**`.  
***To be added to the `env-config.js` file by the script, variable name inside `.env.io-onboarding-pa.development` file 
must start with the substring IO_ONBOARDING_PA***


### Environment variables

The table below describes all the Environment variables needed by the front end of the application.

| Variable name                          | Description                               | type   |
|----------------------------------------|-------------------------------------------|--------|
| IO_ONBOARDING_PA_API_HOST              | The hostname of the APIs url              | string |
| IO_ONBOARDING_PA_API_PORT              | The port for of APIs url                  | string |
