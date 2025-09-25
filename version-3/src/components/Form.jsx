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

  async function storeUserData(data) {
    await fetch("https://backend-answer-keys.onrender.com/add-one-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.fullName,
        email: data.email,
        country_name: data.country,
        bio: data.bio,
      }),
    });
  }

  // handle form submission
  function handleSubmit(event) {
    // prevents page from reloading
    event.preventDefault();

    storeUserData(formData);
    // sets user info to form data
    setUserInfo(formData);
    // clear form now that the form is completed and data is captured
    setFormData(emptyFormState);
  }

  const getUser = async () => {
    const response = await fetch(
      "https://backend-answer-keys.onrender.com/get-newest-user"
    );
    const data = await response.json();
    const userData = data[0];
    console.log(userData);
    setUserInfo({
      fullName: userData.name,
      email: userData.email,
      country: userData.country_name,
      bio: userData.bio,
    });
  };

  // loads saved data on initial page load
  useEffect(() => {
    getUser();
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
