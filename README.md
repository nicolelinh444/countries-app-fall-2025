# 📝 Nicole's Countries App

## 📌 Project Description & Purpose

This project is a full-stack app that shows world countries. Users can create a profile and save their favorite countries.

This project is the culmination of what I learned over the past year, going from someone who barely dabbled in tech to someone who has created multiple full-stack applications!

## 🚀 Live Site

Check out the app:
Frontend: https://countries-app-v5.netlify.app/

Backend: https://countries-app-fall-2025.onrender.com

## 🖼️ Screenshots

<img width="1376" height="781" alt="Screenshot of countries app" src="https://github.com/user-attachments/assets/0bbb32b4-cd90-4726-9bf7-736b39680520" />

<!-- Here is where you'll include a screenshot of your project to show it off!

Your instructor will walk you through this process with the rest of the class. Please be patient until the time comes! In the meantime, you can fill out all other sections of this template.

1. Use `Command + Control + Shift + 4` to take a screenshot of your site and copy the screenshot to your clipboard
2. Find your Github README.md file on the Github website
3. Edit the site by clicking on the Pencil icon ✏️
4. Move your cursor to the position where you want to paste the screenshot, then paste it. Github will convert the pasted screenshot into an `<img>` tag
5. Select "Commit changes..." to save your changes -->

## ✨ Features

This is what you can do on the app:

- Create a profile
- Save a country
- View details about each country

## 🛠️ Tech Stack

**Frontend**

- **Languages:** \***\*HTML, CSS, Javascript\*\***
- **Framework:** \***\*React\*\***
- **Deployment:** \***\*Netlify\*\***
- **Other:** \***\*Vite\*\***

**Server/API**

- **Languages:** \***\*Node.js\*\***
- **Framework:** \***\*Express\*\***
- **Deployment:** \***\*Render\*\***
- **Other:** \***\*Postman\*\***

**Database**

- **Languages:** \***\*PostgreSQL\*\***
- **Deployment:** \***\*Neon\*\***

## 🔹 API Documentation

These are the API endpoints I built:

1. /get-all-users
2. /get -newest-user
3. /add-one-user
4. /update-one-country-count
5. /get-all-saved-countries
6. /save-one-country

Learn more about the API endpoints here: _**[https://github.com/AnnieCannons/countries-app-instructions/blob/main/version-4/api-documentation.md]**_

## 🗄️ Database Schema

Here's the SQL I used to create my tables:

```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  name VARCHAR NOT NULL,
  country_name VARCHAR NOT NULL,
  email VARCHAR UNIQUE NOT NULL,
  bio VARCHAR
);

CREATE TABLE saved_countries (
  saved_country_id SERIAL PRIMARY KEY,
  country_name VARCHAR UNIQUE NOT NULL);

  CREATE TABLE country_counts (
  country_count_id SERIAL PRIMARY KEY,
  country_name VARCHAR UNIQUE NOT NULL,
  count INTEGER NOT NULL
);
```

## 💭 Reflections

**What I learned:** I learned how to build a full stack app with multiple versions.

**What I'm proud of:** I'm proud of working on this app over time, showing up every day and getting it done.

**What challenged me:** One of my challenges was figuring out how to refactor the save country button into a heart.

**Future ideas for how I'd continue building this project:**

1. Filter by region
2. Dark mode
3. Add sparkles

## 🙌 Credits & Shoutouts

Thanks to **Arianna** from AnnieCannons for \***being an awesome instructor.\***!

Our **teaching assistants** in class.

And thanks to **my fellow classmates** for completing this journey with me!\!
