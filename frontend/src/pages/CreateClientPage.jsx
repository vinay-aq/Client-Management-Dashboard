import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createClient } from "../features/clients/clientSlice";

function CreateClientPage() {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.clients);

  async function handleSubmit(e) {
    e.preventDefault();

    const result = await dispatch(createClient(formData));
    if (createClient.fulfilled.match(result)) {
      navigate("/clients");
    }
  }

  function handleChange(e) {
    setFormData(prev => ({...prev, [e.target.name]: e.target.value }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Client</h2>
      <label>Name: </label>
      <input
        type="text"
        name="name"
        onChange={handleChange}
        value={formData.name}
        placeholder="Name"
      />
      <br />
      <br />
      <label>Email: </label>
      <input
        type="text"
        name="email"
        onChange={handleChange}
        value={formData.email}
        placeholder="Email"
      />
      <br />
      <br />
      <label>Company: </label>
      <input
        type="text"
        name="company"
        onChange={handleChange}
        value={formData.company}
        placeholder="Company"
      />
      <br />
      <br />
      <label>Phone: </label>
      <input
        type="text"
        name="phone"
        onChange={handleChange}
        value={formData.phone}
        placeholder="Phone"
      />
      <br />
      <br />
      <label>Status: </label>
      <select name="status" onChange={handleChange}>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
        <option value="pending">Pending</option>
        <option value="suspended">Suspended</option>
      </select>
      <br />
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "loading..." : "Create Client"}{" "}
      </button>

      {error && <p>{error}</p>}
    </form>
  );
}

export default CreateClientPage;
