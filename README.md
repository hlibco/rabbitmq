# RabbitMQ

This project is a trial to **publish** items to a queue and **consume** then afterwards.

It is necessary to create a `.env` file based on `.env-template`. For a quick test I'd recommend to use [cloudamqp](https://cloudamqp.com) instead of installing RabbitMQ in your local machine.


### Setup

1. Create a `.env` file in the root of the project using `.env-template` as the template. A RabbitMQ server running is required.

```
## EXTERNAL SERVICES CREDENTIALS
## ------------------------------------
RABBITMQ_AMQP_URL=amqp://...
```

2. Install dependencies `yarn install`


### Run

1. Start the trial in one terminal (`yarn start`)

or

2. Open 2 terminals and run Publisher and Consumer side by side

  - `yarn pub`
  - `yarn con`


### Commands

`yarn scripts` to list all scripts (commands) available

| yarn     | Description                                                               |
|----------|---------------------------------------------------------------------------|
| build    | (Trash and re)build the library                                           |
| client   | Run the example client (setup the `.env` file and `npm start` beforehand)  |
| cov      | Run tests and generate coverage report                                    |
| cov:html | Run tests, generate the HTML coverage report, and open it in a browser    |
| lint     | Lint all typescript source files                                           |
| start    | Start the service                                                         |
| tdd      | Watch source files, rebuild library on changes and run tests on watch mode |
| test     | Test source files without compiling                                        |
| unit     | Build the library, tests and run unit tests                               |
| pub      | Publish messages to the queue                                             |
| con      | Consume messages from the queue                                           |
