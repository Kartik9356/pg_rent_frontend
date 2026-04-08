const Analytics = () => (
  <div style={{ marginBottom: "30px" }}>
    {/* Stats Grid */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "30px" }}>
      {[
        { label: "Properties", val: "3" },
        { label: "Bookings", val: "5" },
        { label: "Users", val: "10" },
        { label: "Revenue", val: "₹30,000" }
      ].map((item, idx) => (
        <div key={idx} style={{ backgroundColor: "#fffaf0", padding: "25px", borderTop: "4px solid #d4af37", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
          <p style={{ margin: "0 0 10px 0", color: "#666", fontSize: "13px", fontWeight: "600", textTransform: "uppercase" }}>{item.label}</p>
          <h3 style={{ margin: 0, fontSize: "28px", fontWeight: "700" }}>{item.val}</h3>
        </div>
      ))}
    </div>

    {/* Monthly Revenue Chart Container */}
    <div style={{ backgroundColor: "white", padding: "30px", boxShadow: "0 2px 15px rgba(0,0,0,0.05)" }}>
      <h3 style={{ marginTop: 0, marginBottom: "20px" }}>Monthly Revenue</h3>
      <div style={{ height: "300px", width: "100%", backgroundColor: "#fdfdfd", border: "1px solid #eee", display: "flex", alignItems: "flex-end", padding: "20px", gap: "15px" }}>
        {/* Simple Bar Visualization to match screenshot */}
        {[5000, 8000, 6000, 9000, 12000].map((h, i) => (
          <div key={i} style={{ flex: 1, backgroundColor: "#d4af37", height: `${(h/12000)*100}%`, position: 'relative' }}>
            <span style={{ position: 'absolute', bottom: '-25px', width: '100%', textAlign: 'center', fontSize: '10px' }}>{['Jan', 'Feb', 'Mar', 'Apr', 'May'][i]}</span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
export default Analytics;