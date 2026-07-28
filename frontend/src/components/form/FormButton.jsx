import React from "react";

function FormButton({ loading, children, ...props }) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="rounded bg-blue-600 px-2 py-2 text-white"
      {...props}
    >
      {loading ? "Saving..." : children}
    </button>
  );
}

export default FormButton;
