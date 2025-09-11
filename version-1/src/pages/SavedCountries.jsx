// pages/SavedCountries.jsx
import { useState } from "react";

// a form where users can save profile info
function SavedCountries() {
  // stores form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    bio: "",
  });

  // update formData variable when user input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // handle form submission
  function handleSubmit(event) {
    // prevents page from reloading
    event.preventDefault();
    // logs submitted data to the console
    console.log(formData, "formData");
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
