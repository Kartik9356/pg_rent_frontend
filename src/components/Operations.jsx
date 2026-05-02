import React from "react";
import "./style.css";

const Operations = () => (
  <div className="operations-container">

    {/* Table Section */}
    <div className="operations-section">
      <h3 className="section-title">Properties List</h3>

      <table className="operations-table">
        <thead className="table-header">
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr className="table-row">
            <td className="table-cell">
              <img
                src="YOUR_ROOM_IMAGE_URL"
                className="table-image"
                alt="Room A"
              />
            </td>

            <td className="table-name">Room A</td>
            <td className="table-location">Delhi</td>
            <td className="table-price">₹5000</td>

            <td>
              <button className="btn">Edit</button>
              <button className="btn">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Form Section */}
    <div className="operations-section">
      <h3 className="section-title">Add Property</h3>

      <form className="operations-form">
        <input type="text" placeholder="Name" className="form-input" />
        <input type="text" placeholder="Location" className="form-input" />
        <input type="text" placeholder="Price" className="form-input" />
        <input type="text" placeholder="Image URL" className="form-input" />

        <button type="button" className="form-button">
          Add Property
        </button>
      </form>
    </div>
  </div>
);

export default Operations;