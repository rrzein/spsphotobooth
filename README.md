Photobooth sharing app for Social Print Studio

To run, download/clone this repo to your local drive.

You will need PostgreSQL on your computer to run the database. Download it at: http://www.postgresql.org/.

Navigate to the folder in terminal and create the database by entering "rake db:create" in your terminal, followed by "rake db:migrate".

Enter "rails s" to start the app. Navigate to "http://localhost:3000" in your browser to enter the web app.

When taking pictures, be sure to save all photos immediately to the folder "/spsphotobooth/public/photos". The app will automatically detect any new images entered into this folder and will display them appropriately in the web app.

