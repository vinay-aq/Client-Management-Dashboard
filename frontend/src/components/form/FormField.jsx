import React from "react";

function FormField({ label, required = false, error, children }) {
  return (
    <div className="mb-5">
      <div>
        {label && (
          <label className="block mb-2 font-medium">
            {label}
            {required && <span className="text-red-500 ml-1" style={{color: 'red'}}>*</span>}
          </label>
        )}
      </div>
      {children}
      {error && <div className="mt-1 text-red-500 text-sm">{error}</div>}
    </div>
  );
}

export default FormField;
