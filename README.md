# Workshop: Backend Fundamentals - Fitness Trackr

## Introduction

In this workshop, you'll be provided this GitHub repo with details for a full operational CRUD API that uses Express.JS, PostgreSQL, and other technologies that you've been trained on.

## Getting Started

Install Packages

    npm i

Initialize Database

    createdb fitness-dev

Start Server

    npm run start:dev

## Automated Tests

Currently, test suites must be run separately. I have not yet fixed this.

### DB Methods

    npm run test:watch db.spec

### API Routes (server must be running for these to pass)

    npm run test:watch api.spec

### Documentation

To edit the documentation, edit the `FitnessTrackr API Documentation.md` file, then copy the markdown content and use https://markdowntohtml.com/ to convert to html. Paste the html into `public/index.html` in the `div` with `id="doc-html"`.

## Problems to Solve

### Problem 1: Seed Database

Begin by seeding the database with the provided `seed.js` file. You can run this file with the following command:

    `npm run seed`

### Problem 2: GET all

Using Postman to test your API, create a GET route that returns all routines and activies available in the database. There shouldn't be any errors at this point.

Solution: 
```
[In postman] 
GET http://localhost:3000/api/routines 

RESULTS:
[
    {
        "id": 2,
        "creatorId": 1,
        "isPublic": true,
        "name": "Chest Day",
        "goal": "To beef up the Chest and Triceps!",
        "creatorName": "glamgal",
        "activities": [
            {
                "id": 3,
                "name": "bench press",
                "description": "Lift a safe amount, but push yourself!",
                "duration": 8,
                "count": 10,
                "routineActivityId": 3,
                "routineId": 2
            },
            {
                "id": 4,
                "name": "Push Ups",
                "description": "Pretty sure you know what to do!",
                "duration": 7,
                "count": 10,
                "routineActivityId": 4,
                "routineId": 2
            }
        ]
    },
    {
        "id": 4,
        "creatorId": 2,
        "isPublic": true,
        "name": "Cardio Day",
        "goal": "Running, stairs. Stuff that gets your heart pumping!",
        "creatorName": "albert",
        "activities": [
            {
                "id": 6,
                "name": "treadmill",
                "description": "running",
                "duration": 10,
                "count": 10,
                "routineActivityId": 8,
                "routineId": 4
            },
            {
                "id": 7,
                "name": "stairs",
                "description": "climb those stairs",
                "duration": 15,
                "count": 10,
                "routineActivityId": 9,
                "routineId": 4
            }
        ]
    },
]
```

### Problem 3: GET one by ID

Continuing to use Postman to test your API, you will encounter an error when trying to GET a single routine by ID. Fix this error.

Solution: 

```
[In postman] 
GET http://localhost:3000/api/routines/38

RESULT:
    {
        "id": 38,
        "creatorId": 3,
        "isPublic": true,
        "name": "back day",
        "goal": "lift lift lift",
    }
```

### Problem 4: POST new

You will need to configure authorization in Postman to test this route. After authorizing, you will encounter an error when trying to POST a new routine. Fix this error.

Solution: 

```
STEP 1. 
[In postman]
POST http://localhost:3000/api/users/login 

BODY:
{
  "username": "sandra",
  "password": "sandra123"
}

RESULT:
{
    "user": {
        "id": 3,
        "username": "sandra"
    },
    "message": "you're logged in!",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJzYW5kcmEiLCJpYXQiOjE2OTYxOTA3ODUsImV4cCI6MTY5Njc5NTU4NX0.bTOpemerNkgjAUgVeb_3oZfP5lnuV-fHdeat5MVr5Lo"
}

STEP 2. 
Copy the "token" and make a new POST request

[In postman]
POST http://localhost:3000/api/routines/

In the Authorization tab, set the type to 'Bearer Token' and paste the token you got from step 1.

BODY:
{
    "id": 38,
    "creatorId": 3,
    "isPublic": true,
    "name": "arm day",
    "goal": "lift those weights!!"
}
```

### Problem 5: PATCH one by ID

In this exercise, you will update a record using Postman. There should be no errors if your code is correct.

```
[In postman]
POST http://localhost:3000/api/routines/38
(Paste your Bearer Token in the Authorization tab)
```

### Problem 6: DELETE one by ID

Remove a record from the "rountine_activities" table. You will encounter an error. Fix this error.

Solution: 
```
Make sure the router.delete is correct 

router.delete('/:routineId', requireUser, async (req, res, next) => {
  try {
    const {routineId} = req.params;
    const routineToUpdate = await getRoutineById(routineId);
    if(!routineToUpdate) {
      next({
        name: 'NotFound',
        message: `No routine by ID ${routineId}`
      })
    } else if(req.user.id !== routineToUpdate.creatorId) {
      res.status(403);
      next({
        name: "WrongUserError",
        message: "You must be the same user who created this routine to perform this action"
      });
    } else {
      const deletedRoutine = await destroyRoutine(routineId)
      res.send({success: true, ...deletedRoutine});
    }
  } catch (error) {
    next(error);
  }
});

[In postman]
DELETE http://localhost:3000/api/routines/38
(make sure you still have authorization)

Terminal: DELETE /api/routines/1 403 4.026 ms - 195
User is set: { id: 3, username: 'sandra' }
```

### STRETCH GOAL: interactive frontend

Using ReactJS or HTML / CSS / JS, create a frontend that allows a user to interact with the API.
