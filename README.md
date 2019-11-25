# IO Public Administrations Onboarding frontend

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

## Building Prerequisites

### Dependencies

First we install the libraries used by the project:

```
$ yarn install
```

### Generating translations and types

The second step is to generate the definitions from the YAML translations and from OpenApi specs.

To generate the definitions from the YAML translations:

```
$ yarn generate:locales
```

To generate the definitions from the OpenApi specs:

```
$ yarn generate:locales
```

These commands can be run together using:

```
$ yarn generate:all
```

## Test the application locally

The application can be built and tested locally, either directly on the developer machine (directly using development tools, such as *yarn* or *parcel*), or as a Docker-based image.

### Test locally with mocked APIs

To test the frontend application locally, on developer machine, against some mocked APIs, run in the root folder

```shell
yarn start-with-mock
```

Then, point your browser to

* [http://localhost:1234](http://localhost:1234) for the frontend
* [http://localhost:3000](http://localhost:3000) to reach the mocked backend

The project uses the [json-server package](https://github.com/typicode/json-server) to mock the REST API.

### Test with Docker

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

| Variable name                          | Description                                                                                      | type   |
|----------------------------------------|--------------------------------------------------------------------------------------------------|--------|
| IO_ONBOARDING_PA_API_HOST              | The hostname of the APIs url                                                                     | string |
| IO_ONBOARDING_PA_API_PORT              | The port for of APIs url                                                                         | string |
| IO_ONBOARDING_PA_SHOW_FAKE_IDP         | Show or hide fake IDP button in SPID dropdown button (0 to hide, 1 to show)                      | string |
| IO_ONBOARDING_PA_IS_MOCK_ENV           | Front end is running with mock backend or with real APIs (0 for real APIs, 1 for mock backend)   | string |

### Environment variables run-time injection

The frontend container needs to adapt to different environments, reading at run-time environment variables values. For example, the application needs to know the address of the backend application. This is a non trivial task, since Javascript code runs on the client machine of the user executing the application, which prevents the application from directly reading the environment variables from the container.

To overcome this limitation, an *env.sh* bash script inside `scripts` folder is executed every time the frontend application container starts. The script reads the environment variables and produces an *env-config.js* file that is then automatically copied together with the rest of the files to be served by the webserver. The *index.html* file (in the *public* folder of this repository) links already to *env-config.js*, which is read every time the user opens the application in a browser.

>**IMPORTANT**: The *env.sh* script reads and automatically injects in `env-config.js` all environment variables prefixed with *IO_ONBOARDING_PA*, for example *IO_ONBOARDING_PA_API_HOST*.

To read the variable values inside the frontend application, use `window._env_.IO_ONBOARDING_PA_YOUR_VAR`. 

## Internationalization

For multi-language support the application uses:

* [react-i18next](https://github.com/i18next/react-i18next) for the integration of translations with user preferences
* [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector) to automatically detect user language
* YAML files in the directory `locales`
* A YAML-to-typescript conversion script (`generate:locales`).

To add a new language you must:

1. Create a new directory under [locales](locales) using the language code as the name (e.g. `es` for Spanish, `de` for German, etc...).
1. Copy the content from the base language (`en`).
1. Proceed with the translation by editing the YAML and eventual Markdown files.
1. Run the Typescript code generation script (`yarn generate:locales`).
1. New languages will be automatically used if detected as user languages by `LanguageDetector` used in `src/i18n.ts`
1. Where user language should be detected and order used in searching is defined by `order` array in `languageDetectorOptions` in the same file
