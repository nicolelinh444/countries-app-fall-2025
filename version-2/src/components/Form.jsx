import { useState, useEffect } from "react";

function SavedCountriesForm() {
  const emptyFormState = { fullName: "", email: "", country: "", bio: "" };
  // stores form inputs
  const [formData, setFormData] = useState(emptyFormState);
  const [userInfo, setUserInfo] = useState(null);

  // update formData variable when user input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle form submission
  function handleSubmit(event) {
    // prevents page from reloading
    event.preventDefault();
    console.log(formData, "form was submitted");

    // turns form data into a string and saves it in local storage
    let formData_stringified = JSON.stringify(formData);
    localStorage.setItem("profile", formData_stringified);

    setUserInfo(formData);
    setFormData(emptyFormState);
  }

  // loads saved data on initial page load
  useEffect(() => {
    if (localStorage.getItem("profile")) {
      let profileDeStringified = JSON.parse(localStorage.getItem("profile"));
      setUserInfo(profileDeStringified);
    }
  }, []);

  return (
    <div className="form-container">
      {userInfo ? <h2>Welcome back, {userInfo.name}!</h2> : <h2></h2>}
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
