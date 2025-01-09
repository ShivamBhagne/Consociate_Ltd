// Import necessary libraries
import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "./App.css";

const App = () => {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phoneNumber: "",
    country: "",
    state: "",
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  // Fetch countries on component mount
  useEffect(() => {
    axios
      .get("https://countriesnow.space/api/v0.1/countries")
      .then((response) => {
        setCountries(response.data.data.map((country) => country.country));
      })
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  // Fetch states when a country is selected
  useEffect(() => {
    if (formData.country) {
      axios
        .post("https://countriesnow.space/api/v0.1/countries/states", {
          country: formData.country,
        })
        .then((response) => {
          setStates(response.data.data.states || []);
        })
        .catch((error) => console.error("Error fetching states:", error));
    }
  }, [formData.country]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.address) newErrors.address = "Address is required";
    if (!formData.phoneNumber) newErrors.phoneNumber = "Phone number is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (!formData.state) newErrors.state = "State is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmittedData(formData);
      setFormData({
        name: "",
        address: "",
        phoneNumber: "",
        country: "",
        state: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">User Form</h1>
      <form onSubmit={handleSubmit} className="shadow p-4 bg-light rounded">
        <div className="form-group mb-3">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="address">Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={`form-control ${errors.address ? "is-invalid" : ""}`}
          ></textarea>
          {errors.address && (
            <div className="invalid-feedback">{errors.address}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`form-control ${
              errors.phoneNumber ? "is-invalid" : ""
            }`}
          />
          {errors.phoneNumber && (
            <div className="invalid-feedback">{errors.phoneNumber}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="country">Country:</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className={`form-control ${errors.country ? "is-invalid" : ""}`}
          >
            <option value="">Select a country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
          {errors.country && (
            <div className="invalid-feedback">{errors.country}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label htmlFor="state">State:</label>
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={handleChange}
            className={`form-control ${errors.state ? "is-invalid" : ""}`}
          >
            <option value="">Select a state</option>
            {states.map((state) => (
              <option key={state.name} value={state.name}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.state && (
            <div className="invalid-feedback">{errors.state}</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Submit
        </button>
      </form>

      {submittedData && (
        <div className="mt-5 shadow p-4 bg-white rounded">
          <h2>Submitted Data</h2>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p><strong>Address:</strong> {submittedData.address}</p>
          <p><strong>Phone Number:</strong> {submittedData.phoneNumber}</p>
          <p><strong>Country:</strong> {submittedData.country}</p>
          <p><strong>State:</strong> {submittedData.state}</p>
        </div>
      )}
    </div>
  );
};

export default App;
