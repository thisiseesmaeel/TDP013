## How to get started with laboration 2. 
After cloning repository follow these steps:

1. Make sure you have installed **mongo** and **nodejs** in your system. You can check it by typing **_"mongo -version"_** and **_"node -v"_** in your command line. It is recommended to have at least **nodejs** version 14 or higher.
1. In order to restore the database files, type **_"mongorestore --db = [database name] [database directory path]"_**. You can find the database directory in _"/lab2/database"_ directory. The database name is "tdp013". **OBS!** Make sure to restore this database to get correct result while running tests.
1. After opening the project, type **_"npm install"_** to install the required modules for the project, thereafter type **_"npm audit fix"_** to fix the installed modules. 
1. Now you can start the server (port 3000) by typing **_"npm start"_** in the terminal.
1. **Enjoy!**


## Testing

1. In order to begin testing the program, type **_"npm test"_** and test will run shortly. 
1. After each time you run the test, you need to delete the data in **mongodb** which was generated from the test because it will conflict with the expected results next time you want to run the test.
1. To see the code coverage results, type **_"npm run coverage"_** in the terminal which you can then find in **_coverage_** folder. 

