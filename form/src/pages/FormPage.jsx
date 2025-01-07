import React, { useState, useEffect } from "react";
import Input from "../components/InputField";
import Select from "../components/SelectField";
import Checkbox from "../components/CheckboxField";
import Button from "../components/Button";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    age: "",
    country: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({}); // Track touched fields
  const [isFormValid, setIsFormValid] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const countries = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
  ];

  // Load existing data from localStorage on component mount
  useEffect(() => {
    const savedFormData = localStorage.getItem("registrationData");
    if (savedFormData) {
      try {
        const parsedData = JSON.parse(savedFormData);
        setFormData(parsedData);
      } catch (error) {
        console.error("Error parsing saved form data:", error);
      }
    }
  }, []);

  // Validation functions
  const validateField = (name, value) => {
    switch (name) {
      case "fullName":
        return value.length >= 3
          ? ""
          : "Full name must be at least 3 characters";
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Please enter a valid email address";
      case "password":
        return /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/.test(
          value
        )
          ? ""
          : "Password must be at least 8 characters with one number and one special character";
      case "phoneNumber":
        return /^\d{10}$/.test(value)
          ? ""
          : "Phone number must be exactly 10 digits";
      case "age":
        const parsedAge = parseInt(value, 10); // Explicitly specify radix 10 (decimal)
        if (isNaN(parsedAge)) {
          return "Age must be a number"; // Error if not a valid number
        }
        return parsedAge >= 18 && parsedAge <= 65
          ? ""
          : "Age must be between 18 and 65";
      case "country":
        return value ? "" : "Please select a country";
      case "agreeToTerms":
        return value ? "" : "You must agree to the terms";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));

    setTouched((prev) => ({
      ...prev,
      [name]: true, // Mark the field as touched
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, newValue),
    }));

    // Clear submit message when form is modified
    if (submitMessage) {
      setSubmitMessage("");
    }
  };

  const saveToLocalStorage = (data) => {
    try {
      // Get existing submissions array or initialize new one
      const existingData = localStorage.getItem("registrationSubmissions");
      let submissions = existingData ? JSON.parse(existingData) : [];

      // Add new submission with timestamp
      submissions.push({
        ...data,
        submissionDate: new Date().toISOString(),
      });

      // Save updated submissions array
      localStorage.setItem(
        "registrationSubmissions",
        JSON.stringify(submissions)
      );

      // Also save current form state
      localStorage.setItem("registrationData", JSON.stringify(data));

      return true;
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid) {
      const saved = saveToLocalStorage(formData);

      if (saved) {
        console.log("Form submitted and saved:", formData);
        setSubmitMessage(
          "Registration successful! Your information has been saved."
        );

        // Optional: Clear form after successful submission
        setFormData({
          fullName: "",
          email: "",
          password: "",
          phoneNumber: "",
          age: "",
          country: "",
          agreeToTerms: false,
        });
      } else {
        setSubmitMessage("Error saving your information. Please try again.");
      }
    }
  };

  // Validate form on every change
  useEffect(() => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) return;
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    console.log({ newErrors });

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  }, [formData]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Registration Form</h2>

      {submitMessage && (
        <div
          className={`mb-4 p-3 rounded ${
            submitMessage.includes("Error")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {submitMessage}
        </div>
      )}

      <Input
        label="Full Name"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        error={touched.fullName && errors.fullName} // Show error only if touched
        required
        helperText="Enter at least 3 characters"
      />

      <Input
        label="Email Address"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        error={touched.email && errors.email} // Show error only if touched
        required
        helperText="Enter a valid email address"
      />

      <Input
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        error={touched.password && errors.password} // Show error only if touched
        required
        helperText="Minimum 8 characters, 1 number, 1 special character"
      />

      <Input
        label="Phone Number"
        name="phoneNumber"
        value={formData.phoneNumber}
        onChange={handleChange}
        error={touched.phoneNumber && errors.phoneNumber} // Show error only if touched
        required
        helperText="Enter 10 digits"
      />

      <Input
        label="Age"
        name="age"
        type="number"
        value={formData.age}
        onChange={handleChange}
        error={touched.age && errors.age} // Show error only if touched
        required
        helperText="Must be between 18 and 65"
        min="18"
        max="65"
      />

      <Select
        label="Country"
        name="country"
        options={countries}
        value={formData.country}
        onChange={handleChange}
        error={touched.country && errors.country} // Show error only if touched
        required
        helperText="Select your country"
      />

      <Checkbox
        label="I agree to the terms and conditions"
        name="agreeToTerms"
        checked={formData.agreeToTerms}
        onChange={handleChange}
        error={touched.agreeToTerms && errors.agreeToTerms} // Show error only if touched
        required
        helperText="You must agree to continue"
      />

      <div className="mt-6">
        <Button type="submit" disabled={!isFormValid} className="w-full">
          Submit
        </Button>
      </div>
    </form>
  );
};

export default RegistrationForm;
