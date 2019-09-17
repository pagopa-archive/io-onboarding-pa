# IO Public Administrations Onboarding frontned

The repository contains the frontend code of the IO Public Administrations onboarding portal.

## Tools

* [Docker](https://www.docker.com/) and [Docker Compose](https://github.com/docker/compose)

## External software dependencies

The application usually interfaces with some additional components:

* The application backend, available at https://github.com/teamdigitale/io-onboarding-pa-api

* A working SPID test environment, available at https://github.com/italia/spid-testenv2

* Postgres, image available at https://hub.docker.com/_/postgres

For test puroposes, all these dependencies have been included in the form of Docker images through the *docker-compose.yaml* file, and are pulled once the test environment is built. See further sections for more details.

## Build the application

The application can potentially run anywhere, either directly on a bare-bone machine, or in a form of a Docker container. Every change to the code, triggers an automated image build on DockerHub.

Images are consumed by production deployments, where they're usually deployed on top of Kubernetes clusters. For more informations about IO production deployments and IO helm-charts, have a look at the [io-infrastructure-post-config repository](https://github.com/teamdigitale/io-infrastructure-post-config).

## Test the application locally

The application can be built and tested locally, either directly on the developer machine (directly using development tools, such as *yarn* or *parcel*), or as a Docker-based image.

To test the application, run in the root folder:

```shell
# Copy the SPID demo configurations folder from the application backend repository
git clone https://github.com/teamdigitale/io-onboarding-pa-api.git
cp -r io-onboarding-pa-api/certs .
cp -r io-onboarding-pa-api/testenv2 .
rm -rf io-onboarding-pa-api

# Bring up the Docker test environment (build the frontend, pull the backend and the SPID test environment)
docker-compose up
```

Then, point your browser to

* [http://localhost:8080](http://localhost:8080) for the frontend
* [http://localhost:8081](http://localhost:8081) to reach the backend

To bring down the test environment:

```shell
docker-compose down
```

Sometimes, it may be needed to re-built the frontend image, which is instead cached by Docker, once built the first time. To overcome this bahavior, run:

```shell
docker-compose up --build
```

## Configuration

Both the frontend and the backend applications need some environment variables defined in order to work. Environment variables can be customized as needed.

For demo purposes, some environment variables files are provided

* *.env.io-onboarding-pa.development* for the frontend (see the *Environment variables* section for more details)

* *.env.io-onboarding-pa-api.development* for the backend (a complete description of the variables is available at the [backend GitHub repository](https://github.com/teamdigitale/io-onboarding-pa-api/blob/master/README.md))

* *.env.io-onboarding-pa-api-postgres.development* for Postgres DB

## Environment variables

The table below describes all the Environment variables needed by the front end of the application.

| Variable name                          | Description                               | type   |
|----------------------------------------|-------------------------------------------|--------|
| IO_ONBOARDING_PA_API_HOST              | The hostname of the APIs url              | string |
| IO_ONBOARDING_PA_API_PORT              | The port for of APIs url                  | string |

### Environment variables run-time injection

The frontend container needs to adapt to different environments, reading at run-time environment variables values. For example, the application needs to know the address of the backend application. This is a non trivial task, since Javascript code runs on the client machine of the user executing the application, which prevents the application from directly reading the environment variables from the container.

To overcome this limitation, an *env.sh* bash script is executed every time the frontend application container starts. The script reads the environment variables and produces an *env-config.js* file that is then automatically copied together with the rest of the files to be served by the webserver. The *index.html* file (in the *public* folder of this repository) links already to *env-config.js*, which is read every time the user opens the application in a browser.

>**IMPORTANT**: The *env.sh* script reads and automatically injects in `env-config.js` all environment variables prefixed with *IO_ONBOARDING_PA*, for example *IO_ONBOARDING_PA_API_HOST*.

To read the variable values inside the frontend application, use `window._env_.IO_ONBOARDING_PA_YOUR_VAR`. 
