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

//connecting to our PostgreSQL database, or db for short
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true, // use SSL encryption when connecting to the database
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

// 1. GET getNewestUser();
async function getNewestUser() {
  try {
    const data = await db.query(
      "SELECT * FROM users ORDER BY user_id DESC LIMIT 1"
    );
    return data.rows;
  } catch (error) {
    console.error("Error in getNewestUser():", error);
    return data.rows[0];
  }
}

// 2. GET getAllUsers();
async function getAllUsers() {
  try {
    const data = await db.query("SELECT * from users ORDER BY user_id ASC");
    return data.rows;
  } catch (error) {
    console.error("Error in getAllUsers():", error);
    return false;
  }
}

// 3. POST addOneUser();
async function addOneUser(name, country_name, email, bio) {
  try {
    const result = await db.query(
      "INSERT INTO users (name, country_name, email, bio) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, country_name, email, bio]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in addOneUser():", error);
    return false;
  }
}

// Saved Countries

// 1. GET getAllSavedCountries();
async function getAllSavedCountries() {
  try {
    const data = await db.query("SELECT * FROM saved_countries");
    return data.rows;
  } catch (error) {
    console.error("Error in getAllSavedCountries():", error);
    return false;
  }
}

// 2. POST saveOneCountry();
async function saveOneCountry(country_name) {
  try {
    const result = await db.query(
      "INSERT INTO saved_countries (country_name) VALUES ($1) RETURNING *",
      [country_name]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in saveOneCountry():", error);
    return false;
  }
}

// 3. POST unsaveOneCountry();
async function unsaveOneCountry(country_name) {
  try {
    const result = await db.query(
      "DELETE FROM saved_countries WHERE country_name = ($1) RETURNING *",
      [country_name]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in unsaveOneCountry():", error);
    return false;
  }
}

// Country Counts

// 1. POST updateOneCountryCount();
async function updateOneCountryCount(country_name) {
  try {
    const result = await db.query(
      "INSERT INTO country_counts (country_name, count) VALUES ($1, 1) ON CONFLICT (country_name) DO UPDATE SET count = country_counts.count + 1 RETURNING *",
      [country_name]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error in updateOneCountryCount():", error);
    return false;
  }
}

/*----------------------------------
API Endpoints
----------------------------------*/

// Users

// 1. GET /get-newest-user
app.get("/get-newest-user", async (req, res) => {
  try {
    const newestUser = await getNewestUser();

    if (!newestUser) {
      return res.status(404).json({ error: "No users found" });
    }

    res.json(newestUser);
  } catch (error) {
    console.error("Error in /get-newest-user endpoint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 2. GET /get-all-users
app.get("/get-all-users", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    if (allUsers === false) {
      return res.status(500).json({ error: "Database error" });
    }

    if (allUsers.length === 0) {
      return res.status(404).json({ error: "No users found" });
    }

    res.json(allUsers);
  } catch (error) {
    console.error("Error in /get-all-users endpoint:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 3. POST /add-one-user
app.post("/add-one-user", async (req, res) => {
  const { name, country_name, email, bio } = req.body;

  try {
    const newUser = await addOneUser(name, country_name, email, bio);

    if (!newUser) {
      return res.status(500).json({ error: "Failed to add user" });
    }
    return res.status(201).json({
      message: "Success! User was added.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Saved Countries

// 1. GET /get-all-saved-countries
app.get("/get-all-saved-countries", async (req, res) => {
  try {
    const allSavedCountries = await getAllSavedCountries();
    if (allSavedCountries === false) {
      return res.status(500).json({ error: "Database error" });
    }

    if (allSavedCountries.length === 0) {
      return res.status(404).json({ error: "No countries found" });
    }

    res.json(allSavedCountries);
  } catch (error) {
    console.error("Error in /get-all-saved-countries endpoint", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// 2. POST /save-one-country
app.post("/save-one-country", async (req, res) => {
  const { country_name } = req.body;

  try {
    const newSavedCountry = await saveOneCountry(country_name);

    if (!newSavedCountry) {
      return res.status(500).json({ error: "Failed to add country" });
    }

    return res.status(201).json({
      message: "Success! Country was added.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// 3. POST /unsave-one-country
app.post("/unsave-one-country", async (req, res) => {
  const { country_name } = req.body;

  try {
    const unsavedCountry = await unsaveOneCountry(country_name);

    if (!unsavedCountry) {
      return res.status(500).json({ error: "Failed to unsave country" });
    }

    return res.status(200).json({
      message: "Success! Country was unsaved.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

// Country Counts

// 1. POST /update-one-country-count
app.post("/update-one-country-count", async (req, res) => {
  const { country_name } = req.body;

  try {
    const updatedCountry = await updateOneCountryCount(country_name);

    if (!updatedCountry) {
      return res.status(500).json({ error: "Failed to update country count" });
    }

    return res.status(200).json({
      message: "Success! Country count was updated.",
      count: updatedCountry.count,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
