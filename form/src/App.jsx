import React from "react";
import RegistrationForm from "./pages/FormPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">
            Welcome to Our Service
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Please fill in your information to get started
          </p>
        </div>
        <RegistrationForm />
      </div>
    </div>
  );
}

export default App;
