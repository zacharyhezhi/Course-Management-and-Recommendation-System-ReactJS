## How to **build and setup dependencies** for running our project:

  

### Preparation:

  

#### Before running the website, you need to install MongoDB and Node.js at first.

  

1. Install MongoDB.  
- Please click the following link to install [MongoDB Community Edition](https://docs.mongodb.com/manual/administration/install-community/) and there are three editions: Windows, Linux and macOS.  
- If you are using **macOS**, please strictly follow the instructions in this [link](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/). We **strongly recommend** you **install MongoDB with Homebrew** and remember to **set permissions**.  
- After MongoDB is installed, please run **`mongod`** to start the server (if permission denied, you can run **`sudo mongod`**). Then, open another terminal and run **`mongo`** to ensure MongoDB can be successfully connected.  
- Please **ENSURE** the MongoDB successfully installed and it can work properly.

  

2. Install npm & Node  
- Since npm is installed with Node.js, please click this [link](https://www.npmjs.com/get-npm) to download Node.js and npm package.
  

#### Setup and Run project on localhost:

  

1. Type **`mongod`** in your Terminal to ensure you open the MongoDB.

  

2. Please open another Terminal in your own laptop and type:**`git clone https://git@bitbucket.org/fiveangrymen/comp9323-react-express-mongodb.git `**
to download our project repository.

  

3. Then, type **`cd comp9323-react-express-mongodb/`** to enter the folder.

  

4. Type: **`npm install`** to install our server-side dependencies.

  

5. Type: **`npm run client-install`** to install our client-side dependencies.

  

6. Type: **`cd Datamodel`** to enter the folder **`comp9323-react-express-mongodb/Datamodel/`**.

  

7. Type **`node plz_run_me_only.js`**, it will insert the dummy data into the database. If there is no error shown in the terminal, this means success.

  

8. Type **`cd ..`** to go back to the upper folder **comp9323-react-express-mongodb**.

  

9. If you use **macOS**, type **`pwd`** to ensure you are under this path **`<YOUR_PATH>/comp9323-react-express-mongodb/`**.

  

10. Type: **`npm run dev`** to run the client & server with concurrently.

  

11. If the chrome window does not pop up, please open your own browser and type **`http://127.0.0.1:3000`** in the address bar.

  

12. If you want to stop running our project, please press **Ctrl + C** to interrupt the program.
