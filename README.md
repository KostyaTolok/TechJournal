# TechJournal
The project is a website that allows users to view news sorted into categories and leave comments
The architecture of a web application consists of three main components:
- Client
- Server
- Database

Python and Django were used to create the server side. Rest Framework was used to create the API. When developing authorization, JWT (JSON Web Token) and the Simple JWT package were used.

The backend consists of the following applications: [news](news/), [categories](categories/), [comments](comments/), [jwt_auth](jwt_auth/), [users](users/). The server is configured in a file [settings.py](TechJournal/settings.py)

[Client part](client/) developed with the React library. Postgresql was used as the database

A Docker compose file was developed for the application, which allows you to run all three main components of the application in separate containers.

## Main page

When you enter the site, the main page opens with a list of all news and a list of categories.

![Main-page](screenshots/main.jpg)

When you click on a category in the list of all news, the news belonging to this category is displayed.

![Category](screenshots/category.jpg)

## View news

When you click on the news, the page for viewing the news is displayed. It displays the image of the news, the text of the news and the list of comments
under the news. You must be logged in to leave a comment.

![News-view](screenshots/news-view.jpg)

## Leaving a comment

![Comment](screenshots/news-view-2.jpg)

## Login page

The login page requires you to enter your username and password.

![Login](screenshots/login.jpg)

## Registration Page

If the user does not have an account, then you need to go to the registration page where you need to enter your login, email and password.

![Register](screenshots/register.jpg)

## Profile

After logging into the account, access to the user's profile appears. In your profile, you can change your login and email, as well as upload
user image.

![Profile](screenshots/profile.jpg)

## Administration Page

The administrator has access to the administration page. The administration page displays a list of all news, categories and users.
It also allows you to edit, delete and add news and categories. The administrator can also block users from logging into the account.

![Admin](screenshots/admin-main.jpg)

## News list

![News-list](screenshots/admin-news-1.jpg)

## Page for adding and editing news

On the page for adding or editing news, you must enter the news title, news text and select the news category.
You also need to upload an image of the news.

![Add-news](screenshots/admin-news-2.jpg)

![Add-news](screenshots/admin-news-3.jpg)

## User administration page

The user edit page allows the administrator to view user information and block
user accounts.

![Users](screenshots/admin-user.jpg)

## Install with Docker compose

  **1. Install Docker and Docker compose**
  
  **2. Download the latest docker compose file and put it in a separate directory**
  
  **3. Create .env file and set these variables: DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, SUPER_USERNAME, SUPERUSER_EMAIL, SUPERUSER_PASSWORD**
  
  **4. Run this command in terminal**
  ```
  docker compose up
  ```
  **5. Visit localhost:3000 to see the result**
