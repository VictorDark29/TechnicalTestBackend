
## Description

Technical test for CRUD repository, WebSockets (Socket.io), RABBITMQ, and email sending, all using the NestJS framework of Node.js.

## Requirements

Node.js must be installed.

## How to run the test

First, configure the environment variables for the app to function correctly. One variable is the URL for accessing the RABBITMQ service, and another is the email address of the user who will perform the test. To enable email sending, set the SEND property to true (Be careful, a randomly generated temperature might trigger multiple emails to the user). All these settings should be placed in the .env configuration file in the project's base directory.

## Running the app

Make sure the RABBITMQ service is running. If it's not, you can run it in Docker with the following command:
```bash
$ docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management
```

Run the following command in the root path to install dependencies:

```bash
$ npm install
```

Finally, once everything is running and installed, start the app in the backend base directory:
```bash
$ npm run start
```

## License

Nest is [MIT licensed](LICENSE).
