# Tutorial

This covers a basic tutorial to get a simple blog app up and running with Newton Web (Newton).
If you haven't already, see the "Getting Started" section to install the Newton CLI.

## Creating a Project
Once you have the Newton CLI installed, you can start your new project via:

`newton-admin startproject blogTutorial`

This will create all of the files you need to start your project.
Then, change your directory into your project and run `npm install`.
For example:

```bash
cd blogTutorial
npm install
```

Once you are ready, you can run `nodemon app.js` (or whatever you use to automatically restart your Express.js server).

You should now be able to go to `localhost:8000` and see your project running!

## Configuring your Home Route
By default, your route at `localhost:8000` is configured in `blogTutorial/main/routes.js`.
If you change the code in your `mainRouter`'s first `app.get` to configure your home route to go wherever you want.
Change the string in the `response.send` to "Welcome to my Blog".
The `mainRouter` will take care of all of the routing for your project.

## Creating an App
The best practice is to create an app for each table you will have in your database.
So, since we are going to have blog posts, let's create a new app called blogs (we aren't calling it posts due to potential confusion with POST requests). In your terminal, run:

`newton-admin startapp blogs`

Then, in your `main/settings.js`, add 'blogs' to your `apps` array.
This is necessary for future functionality, such at views and models.

Let's make it so that we can access routes within your blogs app by using Express router.
There will be three steps:
1. Create a controller in your `blogs/controllers.js`
2. Create a route that calls your controller in your `blogs/routes.js`
3. Include the `blogs/routes.js` routes in your `main/routes.js`

In your `blogs/controllers.js`, write the following code:

```javascript
module.exports = {
    index: (request, response) => {
        response.send("Hello World");
    }
}
```

Then, your `blogs/routes.js` should look like this:
```javascript
const router = require('express').Router();
const blogsController = require('./controllers');

//Your routes go here
router.get('/', blogsController.index);

module.exports = router;
```

And finally, add the routes to your `main/routes.js`:

```javascript
const settings = require('./settings');
const blogRoutes = require('../blogs/routes');

mainRouter = (app) => {
    app.get('/', (request, response)=>{
        response.send(`Welcome to Newton! You are running your server at ${settings.port}`);
    });
    //Put your other routes/routers here
    app.use('/blogs', blogRoutes);
}

module.exports = mainRouter;

```

Go to `localhost:8000/blogs` and you should see "Hello World!".
Congratulations! You have just set up your first route.

## Add a View to your Controller
Within your 'blogs' app, create a 'views/blogs' folder, and a file called 'index.ejs' within the views directory.
If you plan on having view files with the same names in different apps, you must nest the files in another folder name.

Within your index.ejs, you can put whatever you want.
For example:

```html
<!DOCTYPE html>
<html lang="en" dir="ltr">
    <head>
        <meta charset="utf-8">
        <title></title>
    </head>
    <body>
        <h1>Hello World!</h1>
    </body>
</html>
```

Then, in 'blogs/controllers.js', change your response to:

```javascript
module.exports = {
    index: (request, response) => {
        response.render("blogs/index");
    }
}
```

Now, we can include html templates in our Newton project.
