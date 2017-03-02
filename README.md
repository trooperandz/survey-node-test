# Online Random Survey Application

> This application presents randomly selected multiple choice survey questions to site visitors.  Visitors are never given a repeat question.  Answers are stored in a MySQL database.  The application features an admin interface which allows authorized users to add admin users, create and delete questions, and view visitors' answers.  It is built with Node.js and utilizes Express.js, Sequelize.js and Handlebars.js.

##### To view the live site demo, navigate to [http://www.survey.mtholla.com](http://survey.mtholla.com)

### Installation Instructions For Local Environment:

 * Clone the repository into your chosen directory:

```sh
$ cd survey-app
$ git clone git@github.com:trooperandz/survey-node-test.git
```

 * Install the node dependencies:

```sh
$ npm install
```

 * Create a /config folder in the program root directory with a config.json file and paste the following into it (include your personal database credentials):

```sh
    {
    "development": {
        "username": "root",
        "password": "",
        "database": "survey_development",
        "host": "localhost",
        "dialect": "mysql"
    },
    "test": {
        "username": "root",
        "password": "",
        "database": "survey_test",
        "host": "localhost",
        "dialect": "mysql"
    },
    "production": {
        "username": "root",
        "password": "",
        "database": "survey_production",
        "host": "localhost",
        "dialect": "mysql"
    }
}
```

 * Create three databases in your local MySQL GUI (one for development, one for testing and one for production). Make sure that your credentials match those in the config.json file

 ```sh
CREATE DATABASE survey_development;
CREATE DATABASE survey_test;
CREATE DATABASE survey_production;
 ```

 * Run the program in your chosen environment (the database tables will populate at this point):
    - For development: ```npm start```
    - For testing: ```npm run start-test```
    - For production: ```npm run start-production```


* Populate your chosen database environment with the initial authorized user (REQUIRED for initial access to the admin section).  Use the /seeders/user.sql file, and copy and run the SQL INSERT instruction located in that file in your MySQL GUI application:

```sh
INSERT INTO `Users` VALUES (1,'Matthew Holland','mtholland10@gmail.com','$2a$10$5g2v/mW2rN.g8NSHsVQJgektgyPSHjaHemRiHHSr2eIHOQbCIK1Nq','127.0.0.1',1,'2017-02-23 22:02:12','2017-02-23 22:02:12'),(2,'Guest','guest@guest.com','$2a$10$.hrFPZYDXaSuIQqnBEklIORP7/qMbUcQQuICBv7yRYPGl2b7ocURG','127.0.0.1',1,'2017-02-27 17:39:21','2017-02-27 17:39:21');
```

* Optional: If you wish to view a sampling of already existing questions and answers in your local environment without creating them yourself, you may also populate the remaining table INSERT instructions in the following order (/seeders directory, listed by file name):
    - ```guest.sql```
    - ```question.sql```
    - ```choice.sql```
    - ```answer.sql```


* At this point, you are ready to run and explore the application in your local environment. Navigate to http://localhost:5005/ in your chosen browser and enjoy!
 - To login, use the following: Email = ```guest@guest.com``` , Password = ```Password1#```

### Notes

 - [Node](https://nodejs.org/) version ```0.10.46``` was used for this project
 - The [Airbnb Javascript ES5](https://github.com/airbnb/javascript/tree/es5-deprecated/es5) style guide was followed
 - Application structure utilizes the MVC design pattern via the [Express Generator](https://expressjs.com/en/starter/generator.html) and [handlebars.js](http://handlebarsjs.com/) library
 - Bootstrap was used for this project (the Superhero theme via [Bootswatch](http://bootswatch.com/superhero/))
 - Session management was accomplished via the npm [express-session](https://www.npmjs.com/package/express-session) package
 - Only authorized users are allowed access to the admin pages
 - User passwords are encrypted using the npm [bcrypt-nodejs](https://www.npmjs.com/package/bcrypt-nodejs) package
 - AJAX was used for most form processing via [jQuery](https://jquery.com/)
 - Spinners are utilized to indicate system processing
 - All data is stored in a [MySQL](https://www.mysql.com/) database
 - All SQL tables and queries were managed via the [SequelizeJS](http://docs.sequelizejs.com/en/v3/) ORM
 - All forms contain error handling
 - Users may enter any number of choices for each question (minimum two required)

### ToDos

 - Create a clone application using [React.js](https://facebook.github.io/react)
 - Investigate possibility of replacing SequelizeJS ```hasMany``` assocation with the ```belongsToMany``` association
 - Investigate the optimization and possible alternatives of the ```getGuestAnswers()``` database query function located in the /services/services.js file
 - Fix the ordering of question choices on main index page (by id)
 - Show visitors incorrect/correct answer feedback
 - Add visible breaks between visitors on answers page
 - Show correct/incorrect answer stats on answers page