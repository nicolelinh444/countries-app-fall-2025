import { useState, useEffect } from "react";

function SavedCountriesForm() {
  // initial form state (starts as empty strings)
  const emptyFormState = { fullName: "", email: "", country: "", bio: "" };
  // stores form inputs
  const [formData, setFormData] = useState(emptyFormState);
  const [userInfo, setUserInfo] = useState(null);

  // update formData object when user changes input field
  const handleChange = (event) => {
    // gets input field's name and value
    const { name, value } = event.target;
    // updates matching field in form data
    setFormData({ ...formData, [name]: value });
  };

  const storeUserData = async () => {
    const response = await fetch(
      "https://backend-answer-keys.onrender.com/add-one-user",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.fullName,
          country_name: formData.country,
          email: formData.email,
          bio: formData.bio,
        }),
      }
    );
  };

  // handle form submission
  const handleSubmit = (event) => {
    // prevents page from reloading
    event.preventDefault();
    console.log(formData);

    storeUserData();
    // sets user info to form data
    setUserInfo(formData);
    // clear form now that the form is completed and data is captured
    setFormData(emptyFormState);
  };

  const getNewestUser = async () => {
    const response = await fetch(
      "https://backend-answer-keys.onrender.com/get-newest-user"
    );
    const data = await response.json();
    console.log(data);
    const newestUserFromAPI = data[0];
    setUserInfo({
      fullName: newestUserFromAPI.name,
      email: newestUserFromAPI.email,
      country: newestUserFromAPI.country,
      bio: newestUserFromAPI.bio,
    });
  };

  // loads saved data on initial page load
  useEffect(() => {
    getNewestUser();
  }, []);

  return (
    <div className="form-container">
      {userInfo && <h2>Welcome back, {userInfo.fullName}!</h2>}
      <h2>My Profile</h2>
      <br />
      {/* profile form  */}
      <form onSubmit={handleSubmit}>
        {/* full name input */}
        <input
          required
          placeholder="Full Name"
          type="text"
          name="fullName"
          id="fullName"
          value={formData.fullName}
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
          rows="10"
          cols="45"
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
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SavedCountriesForm;
