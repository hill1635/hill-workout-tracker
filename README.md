# Workout Tracker

## Table of Contents
* Purpose
* API Routes
* MongoDB & Mongoose
* MongoDB Atlas & Heroku
* Future Developments
* Screenshots

## Purpose
The purpose of this assignment was to create the back-end database and model structure for a workout tracker app with the given front-end html and javascript.  The Mongoose NoSQL framework was used for the database and model-structure for the workouts and was deployed using MongoDB Atlas to keep data on the cloud and Heroku was used to deploy the app.

## API Routes
API endroutes were created to GET workout data, POST (create) new workouts, PUT (update) the latest workout and GET workouts from the previous seven days.  The POST endroute was pretty straight forward by using the create method in conjunction with the request body from the newly created workout in the app and then sending the data in a JSON response.

Updating the latest exercise was a little more involved.  The findOneandUpdate method was used with the Workout model to find the specific workout based on the imported ID number in the request parameters.  The new exercises were pushed into the exercises property of the workout and the edited response was sent.

The big challenge here was using the Mongoose aggregate function to create a new totalDuration field for the latest workout and the workouts from the past seven days.  First, the workouts were sorted in descending order based on the day property of the workouts.  For the latest workout, the search was limited to the first entry and to the first seven entries.  The $addFields stage was added to both to add the totalDuration property and the $sum operator was used in the value field to add up all the duration properties of the workout's exercises.  The biggest hurdle with the aggregate function was finding out that .limit, .find, and .sort did not work in conjunction with .aggregate, and those functions needed to be ran within the aggregate function.  After that it was pretty straightforward.

## MongoDB/Mongoose
MongoDB was used to create and manage the database and Mongoose provided the framework for the data modeling.  The structure for creating a schema was similar to Sequelize and pretty straight-forward with properties and property types.  Property types and functions (used in API routes discussed above) had slightly different wording, but had pretty much the same utility so that was an easy transition.  The biggest variation was using Mongoose operators and stages to return and make changes to the documents, but had the same functionality so it was mostly a matter of syntax. 


## MongoDB Atlas & Heroku
A good portion of the time spent on this assignment was setting up and navigating MongoDB Atlas to move the database onto the cloud.  After initially creating an account, a project was created for the app in Atlas, followed by a Cluster, which contains the database and its collection.

Deploying the application with Heroku involved linking Atlas and Heroku, otherwise Heroku would not be able to connect to the database.  This involved getting the KEY and VALUE from Atlas and adding it to Config Vars in the Heroku app settings.  Once that was established, the Mongoose connection in the server file needed to be updated to connect to the MongoDB Atlas database.

## Future Developments
As with most of these assignments, getting rid of bloat and making the code more lean and mean is a goal for the future.

The other challenge that came up when deploying MongoDB Atlas was that the database seed was not importing into the MongoDB Atlas database, so the app starts with a blank slate.

## Screenshots