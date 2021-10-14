## How to get started with the project (Linux ubuntu)
After cloning repository follow these steps:

1. Make sure you have installed **mongo** and **nodejs** in your system. You can check it by typing **_"mongo -version"_** and **_"node -v"_** in your command line. It is recommended to have at least **nodejs** version 14 or higher.
1. In order to restore the database files, type **_"mongorestore --db = [database name] --dir = [database directory path]"_**. You can find the database directory in _"/project"_ directory.
1. After opening the project, type **_"npm install"_** in both **_"front-end"_** and **_"back-end"_** directories to install the required modules for the project, thereafter type **_"npm audit fix"_** to fix the installed modules. 
1. Now you can start the server both on back-end (port 3000) and front-end (port 3500) sides by typing **_"npm start"_** in the terminal.
1. **Enjoy!**

**NOTE!** _There are some profiles already created in our database. You can login/out and test the functionalities of the application._

Password to all of following profiles is **12345678**.
* **username**: hadi123            
* **username**: ismail1                  
* **username**: spicy_noodles
* **username**: pontus1
* **username**: oskar1
* **username**: tom1
