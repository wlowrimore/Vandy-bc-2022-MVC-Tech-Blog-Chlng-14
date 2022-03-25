# (MVC) Tech Blog

![badge](https://img.shields.io/badge/license-MIT-lime)<br />

## Description

This is a full-stack Model View Controller (MVC) application that was created in the form of a blog. Once the user is logged in, they will experience the joy of Creating, Reading, Updating, and Deleting posts. If the user is new to the blog, and doesn't have login credentials, they can easily sign up. Their newly created username, email, and password will be saved, and they will be free to participate. However, the user had best keep moving! The session is timed, and after 2 minutes of idle time, the user is automatically signed out and must sign back in to continue. Each post can receive comments from other users, and displays the posts user's username and timestamp of the date the post was created.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

### Installation:

The user will need to create their own .env file that should include:<br>

- DB_NAME='tech_blog_db',<br>
- DB_USER='---',<br>
- DB_PW='---'<br>

---

<br>

- In the computer's terminal, type: mysql -u (your username) -p<br>
- Type in your mysql password, if prompted
- run the command: use tech_blog_db
- run the command: source db/schema.sql
- quit<br><br>

---

<br>

- In Bash, type: node seeds (if you want to pre-populate some posts)
- In Bash, type: node server

### Usage:

<img src="public\Images\screenshot-1.png" alt="landing page">
<img src="public\Images\screenshot-2.png" alt="login page">
<img src="public\Images\screenshot-3.png" alt="create post">
<img src="public\Images\screenshot-4.png" alt="sign-in page">
<img src="public\Images\screenshot-5.png" alt="edit post / comment"><br><br>

## You Are <a href= "https://github.com/wlowrimore/Vandy-bc-2022-MVC-Tech-Blog-Chlng-14/tree/main" target= "_blank" rel= "noreferrer">Here</a>!

## See It On <a href= "https://serene-springs-59438.herokuapp.com/" target= "_blank" rel= "noreferrer">HEROKU</a>!

### License:

This project is licensed under:<br />
MIT

### Contributing:

Create a pull request, work your magic, and submit your ideas/contributions back to the repository. Your submition will be reviewed for conisderation, and you will be contacted via email.

### Questions:

You can directly email me with any questions or comments.<br><br>

### Other Related Information:

This project was built using the following languages:<br />
HTML<br> CSS<br> JavaScript<br> Node<br> MySql<br>

The following packages are also a part of this application:<br>
MySQL2<br> Express (handlebars, session, connect-session-sequelize)<br> Sequelize<br> dotenv<br> bcrypt<br>

See all of my projects on my GitHub page: https://github.com/wlowrimore

Contact me at my LinkedIn page: http://www.linkedin.com/in/william-lowrimore-21778310

You can also email me at: wlowrimore@gmail.com
