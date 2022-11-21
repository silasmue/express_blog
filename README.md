# JavaScript Express Web Server

## General

This template consists of a NodeJS web server running a sample web application based on the Express framework and the HTML templating engine Handlebars.

The MySQL user is root
The MySQL user password is "" (empty)

Do not touch the `mariadb-data` folder if you run the project in a development container, as Docker uses this folder to store the data from the database.


## Running in a container

This template supports development containers.
This means, all dependencies and required applications are set up automatically and run inside one or more container(s) instead of directly on your machine.
In this case, two containers are created and started: the development container and a container for the MariaDB database.
Visual Studio Codes natively supports development containers.

As a requirement, you need:

- Docker (e.g., Docker Desktop on Windows and macOS or only docker on Linux-based distributions) - **Not needed if you use the IT Security Lab infrastructure**
- Visual Studio Code
- The "Remote Development" extension in VS Code (Docker in all cases and additionally SSH if you use the IT Security Lab infrastructure)

Just open the downloaded template as a folder in VS Code (so that the .devcontainer folder is directly inside the opened folder) and follow the recommendation to open the workspace in a container.
In case you missed the recommendation, open the command palette (F1) and type "Open Folder in Container" and choose the first suggestion.

First steps (run all commands in the container, i.e., in the VS Code terminal):

- Only if you're **not on the IT Security Lab infrastructure**: run `npm install`
- Create a database (e.g., "ponyfarm")
  - Connect to the MariaDB server: `mariadb -h db -u root`
  - Create the database: `CREATE DATABASE ponyfarm;`
  - Select the database using the command `USE ponyfarm`
  - Create the users table (optional): `CREATE TABLE users(id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) UNIQUE, password VARCHAR(255), name VARCHAR(255) UNIQUE);`
  - OTHER TABLES: `CREATE TABLE posts(id INT AUTO_INCREMENT PRIMARY KEY, author_id INT, text VARCHAR(1000), title VARCHAR(255), foreign key(author_id) references users(id));`
  `CREATE TABLE comments(id INT AUTO_INCREMENT PRIMARY KEY, post_id INT, text VARCHAR(1000), foreign key(post_id) references posts(id));`

  - Insert some data into the users table (optional): `INSERT INTO users (email, password, name) VALUES ('admin@example.com', 'password', 'Admin');`
  - `INSERT INTO posts (author_id, text, title) VALUES (1, 'TESHGJOSHDFGJHGJFDHJFSDJFJDSHFJjdfhhsdajkllfgsdajil', 'Test');`
  - `INSERT INTO comments (post_id, text) VALUES (1, 'Test comment');`
- Run the NodeJS server (must be closed and opened after each change):
  - Run the command `npm run start`
  - VS Code should automatically forward the web server on the container to your machine (usually port 3000. If it does not work, look it up in VS Code)
  - You can access your website on `localhost:3000` (or another port as mentioned above)
