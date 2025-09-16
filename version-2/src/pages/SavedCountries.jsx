// pages/SavedCountries.jsx
import { useState, useEffect } from "react";

// a form where users can save profile info
function SavedCountries() {
  // stores form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    bio: "",
  });

  // loads saved data on initial page load
  useEffect(() => {
    const savedData = localStorage.getItem("formData");
    if (savedData) {
      let destring = JSON.parse(savedData);
      setFormData(destring);
    }
  }, []);

  // update formData variable when user input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle form submission
  function handleSubmit(event) {
    // prevents page from reloading
    event.preventDefault();

    // turns form data into a string and saves it in local storage
    let formData_stringified = JSON.stringify(formData);
    localStorage.setItem("formData", formData_stringified);

    // resets form data after submission
    setFormData({
      name: "",
      email: "",
      country: "",
      bio: "",
    });
  }

  return (
    <div className="saved-countries-page">
      <h2>My Saved Countries</h2>
      {formData && <h2>Welcome, {formData.name}!</h2>}
      <div className="form-container">
        <h2>My Profile</h2>
        <br />
        {/* profile form  */}
        <form onSubmit={handleSubmit}>
          {/* full name input */}
          <input
            required
            placeholder="Full Name"
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
          <br />
          {/* email input */}
          <input
            required
            placeholder="Email"
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          {/* country input */}
          <input
            required
            placeholder="Country"
            type="text"
            name="country"
            id="country"
            value={formData.country}
            onChange={handleChange}
          />
          <br />
          {/* bio input */}
          <textarea
            rows="15"
            cols="60"
            placeholder="Bio"
            type="text"
            name="bio"
            id="bio"
            value={formData.bio}
            onChange={handleChange}
          />
          <br />
          <br />
          {/* submit button */}
          <button className="button" type="Submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

// exports SavedCountries so that it can be used in App.jsx
export default SavedCountries;
