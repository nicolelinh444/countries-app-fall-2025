# 📝 Your Project's Title — Replace this with your app's name!

## 📌 Project Description & Purpose

This project is \***\*\_\_\_\*\***

## 🚀 Live Site

Check out the app: https://countries-app-v5.netlify.app/

## 🖼️ Screenshots

Here is where you'll include a screenshot of your project to show it off!

Your instructor will walk you through this process with the rest of the class. Please be patient until the time comes! In the meantime, you can fill out all other sections of this template.

1. Use `Command + Control + Shift + 4` to take a screenshot of your site and copy the screenshot to your clipboard
2. Find your Github README.md file on the Github website
3. Edit the site by clicking on the Pencil icon ✏️
4. Move your cursor to the position where you want to paste the screenshot, then paste it. Github will convert the pasted screenshot into an `<img>` tag
5. Select "Commit changes..." to save your changes

## ✨ Features

This is what you can do on the app:

- Create a profile
- Save a country
- View details about each country

## 🛠️ Tech Stack

**Frontend**

- **Languages:** \***\*HTML\CSS\Javascript\*\***
- **Framework:** \***\*React\*\***
- **Deployment:** \***\*Netlify\*\***

**Server/API**

- **Languages:** \***\*\_\_\_\*\***
- **Framework:** \***\*\_\_\_\*\***
- **Deployment:** \***\*\_\_\_\*\***

**Database**

- **Languages:** \***\*\_\_\_\*\***
- **Deployment:** \***\*\_\_\_\*\***

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

**What I learned:** \***\*\_\_\_\*\***

**What I'm proud of:** \***\*\_\_\_\*\***

**What challenged me:** \***\*\_\_\_\*\***

**Future ideas for how I'd continue building this project:**

1. ***
2. ***
3. ***

## 🙌 Credits & Shoutouts

Thanks to **\_\_\_\_** for \***\*\_\_\*\***!
And thanks to **\_\_\_\_** for \***\*\_\_\*\***!
