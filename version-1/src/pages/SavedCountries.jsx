// pages/SavedCountries.jsx
import { useState } from "react";

function SavedCountries({ countriesData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    bio: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(formData, "formData");
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
      <form onSubmit={handleSubmit}>
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
        <textarea
        rows="15"
        cols="60"
        placeholder="Bio"
        type="text"
        name="bio"
        id="bio"
        value={formData.bio}
        onChange={handleChange}/>
        <br /><br />
        <button className="button" type="Submit">
            Submit
          </button>
      </form>
    </div>
    </div>
  );
}

export default SavedCountries;
