/* --------------------------------
Server/API for Countries App Version 4

DB Fiddle Link: https://www.db-fiddle.com/f/rtajZVUpzxwZ6amdc1HBGw/48
----------------------------------*/

/*----------------------------------
Boilerplate Code to Set Up Server
----------------------------------*/

// importing Node Modules
import express from "express";
import pg from "pg"; // pg stands for PostgreSQL, for connecting to the database
import config from "./config.js"; // importing the connection string to our database hosted on Neon

//connecting to our PostgreSQL database, or db for short
const db = new pg.Pool({
  // new pg.Pool() creates a connection to the database
  connectionString: config.databaseUrl, // credentials to access the database. Keep private!
  ssl: true, // use SSL encryption when connecting to the database to keep data safe
});

const app = express(); // create an instance of the Express module, which gives us access to all of Express's functions, methods, useful superpowers

app.use(express.json()); // This server will receive and respond to requests with JSON data

const port = 3000; // Setting which port to listen or receive requests

app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});

/*----------------------------------
Helper Functions
----------------------------------*/

// Users

// 1. GET /get-newest-user
async function getNewestUser() {
  const data = await db.query(
    "SELECT * FROM users ORDER BY user_id DESC LIMIT 1"
  );
  return data.rows;
}

// 2. GET /get-all-users
async function getAllUsers() {
  const data = await db.query("SELECT * from users ORDER BY user_id ASC");
  return data.rows;
}

// 3. POST /add-one-user
async function addOneUser(name, country_name, email, bio) {
  await db.query(
    "INSERT INTO users (name, country_name, email, bio) VALUES ($1, $2, $3, $4)",
    [name, country_name, email, bio]
  );
}

// Saved Countries

// 1. GET /get-all-saved-countries
async function getAllSavedCountries() {
  const data = await db.query("SELECT * FROM saved_countries");
  return data.rows;
}

// 2. POST /save-one-country
async function saveOneCountry(country_name) {
  await db.query("INSERT INTO saved_countries (country_name) VALUES ($1)", [
    country_name,
  ]);
}

// 3. POST /unsave-one-country
async function unsaveOneCountry(country_name) {
  await db.query("DELETE FROM saved_countries WHERE country_name = ($1)", [
    country_name,
  ]);
}

// Country Counts

// 1. POST /update-one-country-count
async function updateOneCountryCount(country_name) {
  await db.query(
    "INSERT INTO country_counts (country_name, count) VALUES ($1, 1) ON CONFLICT (country_name) DO UPDATE SET count = country_counts.count + 1 RETURNING *",
    [country_name]
  );
}

/*----------------------------------
API Endpoints
----------------------------------*/

// Users

// 1. GET /get-newest-user
app.get("/get-newest-user", async (req, res) => {
  const newestUser = await getNewestUser();
  res.json(newestUser);
});

// 2. GET /get-all-users
app.get("/get-all-users", async (req, res) => {
  const allUsers = await getAllUsers();
  res.json(allUsers);
});

// 3. POST /add-one-user
app.post("/add-one-user", async (req, res) => {
  const { name, country_name, email, bio } = req.body;
  await addOneUser(name, country_name, email, bio);
  res.send("Success! A user was added.");
});

// Saved Countries

// 1. GET /get-all-saved-countries
app.get("/get-all-saved-countries", async (req, res) => {
  const allCountries = await getAllSavedCountries();
  res.json(allCountries);
});

// 2. POST /save-one-country
app.post("/save-one-country", async (req, res) => {
  const { country_name } = req.body;
  await saveOneCountry(country_name);
  res.send("Success! Country was saved.");
});

// 3. POST /unsave-one-country
app.post("/unsave-one-country", async (req, res) => {
  const { country_name } = req.body;
  await unsaveOneCountry(country_name);
  res.send("Success! Country was unsaved.");
});

// Country Counts

// 1. POST /update-one-country-count
app.post("/update-one-country-count", async (req, res) => {
  const { country_name } = req.body;
  await updateOneCountryCount(country_name);
  res.send("Success! Country count was updated.");
});
