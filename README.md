# IO Onboarding portal frontend

This repository contains the code of the frontend application of the IO Public
Administrations onboarding portal.

## What is IO?

More informations can be found on the [IO project website](https://io.italia.it).

## Prerequisites

* [Bash](https://www.gnu.org/software/bash/) or [GitBash](https://gitforwindows.org/)
* [Docker](https://www.docker.com/)
* [Docker Compose](https://github.com/docker/compose)

## Dependencies

The application needs to call the REST API provided by the [IO onboarding portal
backend](https://github.com/teamdigitale/io-onboarding-pa-api): to test the
frontend locally, you need to start the backend by running its docker-compose
stack first. See the [backend manual](https://github.com/teamdigitale/io-onboarding-pa-api)
for futher instructions.

## Environment variables

See the [env.example](./env.example) file for a list of common settings.

The table below describes all the Environment variables needed by the front end
of the application.

| Variable name                          | Description                                                                                      | type   |
|----------------------------------------|--------------------------------------------------------------------------------------------------|--------|
| IO_ONBOARDING_PA_API_HOST              | The hostname of the APIs url                                                                     | string |
| IO_ONBOARDING_PA_API_PORT              | The port for of APIs url                                                                         | string |
| IO_ONBOARDING_PA_SHOW_FAKE_IDP         | Show or hide fake IDP button in SPID dropdown button (0 to hide, 1 to show)                      | string |
| IO_ONBOARDING_PA_IS_MOCK_ENV           | Front end is running with mock backend or with real APIs (0 for real APIs, 1 for mock backend)   | string |
| IO_ONBOARDING_PA_SESSION_TOKEN_DOMAIN  | Session token domain used to delete the token when logging out                                   | string |

### Environment variables run-time injection

The frontend container needs to adapt to different environments, reading at
run-time environment variables values. For example, the application needs to
know the address of the backend application. This is a non trivial task, since
Javascript code runs on the client machine of the user executing the
application, which prevents the application from directly reading the
environment variables from the container.

To overcome this limitation, an *env.sh* bash script inside `scripts` folder is
executed every time the frontend application container starts. The script reads
the environment variables and produces an *env-config.js* file that is then
automatically copied together with the rest of the files to be served by the
webserver. The *index.html* file (in the *public* folder of this repository)
links already to *env-config.js*, which is read every time the user opens the
application in a browser.

>**IMPORTANT**: The *env.sh* script reads and automatically injects in
>`env-config.js` all environment variables prefixed with *IO_ONBOARDING_PA*, for
>example *IO_ONBOARDING_PA_API_HOST*.

To read the variable values inside the frontend application, use
the [`getConfig()`](../src/utils/config.ts) method.

## Production deployment

The frontend docker image is deployed in production on top of a Kubernetes
cluster.

For more informations about IO production deployments and helm-charts, see
[io-infrastructure-post-config
repository](https://github.com/teamdigitale/io-infrastructure-post-config).

Currently an Azure development pipeline is configured in order to deploy the
master branch of this repository into the IO infrastructure staging environment;
the process is triggered by every push into master.

The deployed frontend is reachable at
[https://pa-onboarding.dev.io.italia.it/](https://pa-onboarding.dev.io.italia.it/).

## Test the application locally

Set up your environment variables first:

```shell
cp env.example .env
# edit .env file
```

### Develop the frontend

To run the frontend application locally, prepare the environment first:

```shell
chmod +x ./scripts/yarn.sh
# launch the docker NodeJS image 
# and run yarn inside the docker container
./scripts/yarn.sh install
./scripts/yarn.sh generate

# run docker-compose up
yarn dev:docker
```

Point your browser to

* [http://localhost:1234](http://localhost:1234) for the frontend
* [http://localhost:3000](http://localhost:3000) to reach the mocked backend

The project uses the [json-server
package](https://github.com/typicode/json-server) to mock the REST API.

#### Skip docker

If you run a suitable environment (ie. a Linux machine with NodeJS and yarn installed),
you can avoid using docker and run the frontend application directly:

```shell
yarn install
yarn generate
yarn dev:local
```

## Internationalization

For multi-language support the application uses:

* [react-i18next](https://github.com/i18next/react-i18next) for the integration
  of translations with user preferences
* [i18next-browser-languageDetector](https://github.com/i18next/i18next-browser-languageDetector)
  to automatically detect user language
* YAML files in the directory `locales`
* A YAML-to-typescript conversion script (`generate:locales`).

To add a new language you must:

1. Create a new directory under [locales](locales) using the language code as
   the name (e.g. `es` for Spanish, `de` for German, etc...).
1. Copy the content from the base language (`en`).
1. Proceed with the translation by editing the YAML and eventual Markdown files.
1. Run the Typescript code generation script (`yarn generate:locales`).
1. New languages will be automatically used if detected as user languages by
   `LanguageDetector` used in `src/i18n.ts`
1. Where user language should be detected and order used in searching is defined
   by `order` array in `languageDetectorOptions` in the same file
