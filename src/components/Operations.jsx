const Operations = () => (
  <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
    {/* Table Section */}
    <div style={{ backgroundColor: "white", padding: "30px", boxShadow: "0 2px 15px rgba(0,0,0,0.05)" }}>
      <h3 style={{ marginTop: 0, marginBottom: "25px" }}>Properties List</h3>
      <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
        <thead>
          <tr style={{ color: "#999", borderBottom: "1px solid #eee", fontSize: "14px" }}>
            <th style={{ paddingBottom: "15px" }}>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Row A */}
          <tr style={{ borderBottom: "1px solid #f9f9f9" }}>
            <td style={{ padding: "15px 0" }}>
              <img src="YOUR_ROOM_IMAGE_URL" style={{ width: "60px", height: "40px", objectFit: "cover", borderRadius: "2px" }} alt="Room A" />
            </td>
            <td style={{ fontWeight: "600" }}>Room A</td>
            <td style={{ color: "#666" }}>Delhi</td>
            <td style={{ fontWeight: "700" }}>₹5000</td>
            <td>
              <button style={{ backgroundColor: "#d4af37", border: "none", padding: "8px 18px", fontWeight: "700", marginRight: "8px", cursor: "pointer" }}>Edit</button>
              <button style={{ backgroundColor: "#d4af37", border: "none", padding: "8px 18px", fontWeight: "700", cursor: "pointer" }}>Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    {/* Form Section */}
    <div style={{ backgroundColor: "white", padding: "30px", boxShadow: "0 2px 15px rgba(0,0,0,0.05)" }}>
      <h3 style={{ marginTop: 0, marginBottom: "30px" }}>Add Property</h3>
      <form style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}>
        <input type="text" placeholder="Name" style={{ border: "none", borderBottom: "2px solid #eee", padding: "10px 0", outline: "none" }} />
        <input type="text" placeholder="Location" style={{ border: "none", borderBottom: "2px solid #eee", padding: "10px 0", outline: "none" }} />
        <input type="text" placeholder="Price" style={{ border: "none", borderBottom: "2px solid #eee", padding: "10px 0", outline: "none" }} />
        <input type="text" placeholder="Image URL" style={{ border: "none", borderBottom: "2px solid #eee", padding: "10px 0", outline: "none" }} />
        <button type="button" style={{ backgroundColor: "#d4af37", border: "none", padding: "12px 40px", fontWeight: "700", width: "fit-content", cursor: "pointer" }}>Add Property</button>
      </form>
    </div>
  </div>
);
export default Operations;