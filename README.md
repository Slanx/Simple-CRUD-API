# Simple-CRUD-API

## Script

- `npm run start:multi` - run application in cluster mode;
- `npm run start:prod` - run application in production mode;
- `npm run start:dev` - run application in development mode;
- `npm run test` - run application tests.

## Data

Pass the kind of JSON object :{
username — user's name (string, required)
age — user's age (number, required)
hobbies — user's hobbies (array of strings or empty array, required)
}

## Method

- **GET** `/api/person`
- **GET** `/api/person/${personId}`
- **POST** `/api/person`
- **PUT** `/api/person/{personId}`
- **DELETE** `/api/person/${personId}`

P.S. The PUT method can accept both several obligatory keys, and the entire object
