# 📚 Library-Management-System
- This repository contains the backend API for a Library Management System, built with Express.js, Node.js, Mongoose, and MongoDB. It offers functionalities for both admins and users.

## 📒 Index
- [Pre-Requisites](#notebook-pre-requisites)
- [Installation and Development Environment](#electric_plug-installation-and-development-environment)
- [File Structure](#file_folder-file-structure)

### :notebook: Pre-Requisites
List all the pre-requisites the system needs to develop this project.
- [Node.js](https://nodejs.org/en)
- [Git](https://git-scm.com/)
- IDLE or code editor of your choice.

###  :electric_plug: Installation and Development Environment
- Click the "Fork" button to create your own copy of the repository.
- Clone your forked repository: Open a terminal window and run the following command, replacing *<your_username>* with your GitHub username:
```
$ git clone https://github.com/<your_username>/Library-Management-System.git
```
- Then navigate to the project directory using the following command :
```
$ cd Library-Management-System
```
- Then you need to install the dependenciesc by executing the following command in bash, terminal or your prefered means :
```
$ npm install -y
```
- Then to run your Project you have to execute the following command :
```
$ node index.js
```

###  :file_folder: File Structure
Add a file structure here with the basic details about files, below is an example.

```
.
├── middleware
│   ├── admin.js
│   └── users.js
│
├── Routes
│   ├── Admin_routes.js
│   └── Users_routes.js     
│
├── db
│   └── models.js 
│
├── index.js
├── package.json
├── package-lock.json
└── README.md
```
