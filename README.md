# Overview
The **Nadim Database Migration** project focuses on migrating a lawyer office management database using MySQL. Follow the steps below to set up the project and perform seamless database migration.

## Prerequisites
Before you begin, ensure that you have the following prerequisites installed:

1. **Node.js**: Install Node.js on your system. You can download it from the official website [here](https://nodejs.org/en/download/).
2. **MySQL (XAMPP)**: Set up MySQL using XAMPP. You can download XAMPP for Windows from [here](https://www.apachefriends.org/download.html).
3. **DB-Schema**: Install DB-Schema, a powerful database design and management tool. You can download it from [here](https://dbschema.com/download.html).

## Getting Started
Follow these steps to get started with the project:
1. **Create MySQL Database**:
   - Create a MySQL database named "nadim_db" using your preferred MySQL management tool (e.g., phpMyAdmin, MySQL Workbench).

2. **Project Setup**:
   - Clone this repository to your local machine using this command:
     ```bash
     git clone https://github.com/Zakariathr22/NadimDB.git
     ```
   - Open the project in Visual Studio Code (or any other code editor).
   - In the terminal, run the following commands:

   ***install the mysql2 package as a dependency***:
     ```bash
     npm install mysql2 --save
     ```
   ***execute database migrations***:
     ```bash
     npx sequelize-cli db:migrate
     ```

4. **Schema Visualization**:
   - Open DBSchema and connect it to your database for a better schema visualization. You can download DBSchema from [here](https://dbschema.com/download.html).
