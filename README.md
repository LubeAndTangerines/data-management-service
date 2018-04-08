# Data-Management-Service.js
```                                                                                                                          


    ____        __              __  ___                                                  __       _____                 _         
   / __ \____ _/ /_____ _      /  |/  /___ _____  ____ _____ ____  ____ ___  ___  ____  / /_     / ___/___  ______   __(_)_______ 
  / / / / __ `/ __/ __ `/_____/ /|_/ / __ `/ __ \/ __ `/ __ `/ _ \/ __ `__ \/ _ \/ __ \/ __/_____\__ \/ _ \/ ___/ | / / / ___/ _ \
 / /_/ / /_/ / /_/ /_/ /_____/ /  / / /_/ / / / / /_/ / /_/ /  __/ / / / / /  __/ / / / /_/_____/__/ /  __/ /   | |/ / / /__/  __/
/_____/\__,_/\__/\__,_/     /_/  /_/\__,_/_/ /_/\__,_/\__, /\___/_/ /_/ /_/\___/_/ /_/\__/     /____/\___/_/    |___/_/\___/\___/ 
                                                     /____/                                                                       


```

Microservice to handle data for shopping list app


Todo
------------------

* [x] All routes
* [x] All controllers
* [x] All models
* [x] All queries
* [ ] Tests

Quick Start
------------------
```
$ git clone https://github.com/LubeAndTangerines/data-management-service.git
$ cd data-management-service
$ npm i
```

Starting service
------------------
* Run `npm start` to start the service.
* Run `npm watch` to start the service (PM2).


API
------------------

#### Healthcheck (GET)
**Url:** _/api/v1/healthcheck_

**Example Response**
```json
{
    "status": 200,
    "service": "data-management-service",
    "statusMessage": "OK. Service is running!",
    "reqID": "81b3f9de-56b7-440c-96dc-dd7d22901762",
    "postgres": {
        "resolved": true
    }
}
```