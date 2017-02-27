# Online Random Survey Application

> This application presents randomly selected multiple choice survey questions to site visitors.  Visitors are never given a repeat question.  Answers are stored in a MySQL database.  The application features an admin interface which allows authorized users to add admin users, create questions, view questions and view visitors' answers.  It is built on Node.js and utilizes Express.js, Sequelize.js and Handlebars.js.

###Installation Instructions For Local Environment:
 * Clone the repository into your chosen directory: git clone [repository GitHub link]
 * Install the node dependencies: npm install
 * Create a /config folder in the program root directory with a config.json file and paste the following into config.json (include your personal database credentials):

        ```
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

    * Run the program in your chosen environment (the database tables will generate at this point):
        - For development: ```npm start``` or ```npm run start-development``
        - For testing: ```npm run start-test```
        - For production: ```npm run start-production```

    * Populate your chosen database environment with the initial authorized user (REQUIRED for initial access to the admin section).  Use the /seeders/user.sql file, copy and run the SQL INSERT instruction located in that file in your MySQL GUI application.

    * Optional: If you wish to view a sampling of already existing questions and answers in your local environment without creating them yourself, you may also populate the remaining table INSERT instructions in the following order (/seeders directory, listed by file name):
        - guest.sql
        - question.sql
        - choice.sql
        - answer.sql

    * At this point, you are ready to run and explore the application in your local environment! Navigate to http://localhost:3000/ in your chosen browser and enjoy.
