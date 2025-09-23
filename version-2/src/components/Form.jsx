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

  // handle form submission
  function handleSubmit(event) {
    // prevents page from reloading
    event.preventDefault();
    // turns form data into a string and saves it in local storage
    let formData_stringified = JSON.stringify(formData);
    // saves string under "profile" in local storage
    localStorage.setItem("profile", formData_stringified);

    // sets user info to form data
    setUserInfo(formData);
    // clear form now that the form is completed and data is captured
    setFormData(emptyFormState);
  }

  // loads saved data on initial page load
  useEffect(() => {
    // check if profile exists in local storage
    if (localStorage.getItem("profile")) {
      // parse string back into profile object
      let profileDeStringified = JSON.parse(localStorage.getItem("profile"));
      // updates user info state with parsed profile object
      setUserInfo(profileDeStringified);
    }
    // run once on page load
  }, []);

  return (
    <div className="form-container">
      {userInfo && <h2>Welcome back, {userInfo.name}!</h2>}
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
        <button className="button" type="Submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default SavedCountriesForm;
