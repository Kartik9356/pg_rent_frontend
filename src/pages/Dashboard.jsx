import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Cards from "../components/Cards";
import PropertyTable from "../components/PropertyTable";
import UserTable from "../components/UserTable";
import ReportTable from "../components/ReportTable"; // 🔥 Add this line!
import "../dashboard.css";

// Your API helper functions
import {
  fetchAdminProperties,
  fetchAdminUsers,
  fetchAdminReports,
  updateAdminPropertyStatus,
} from "../api/admin";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("Pending");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState([]);
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    users: 0,
    reports: 0,
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, page, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let responseData = null;

      if (activeTab === "users") {
        responseData = await fetchAdminUsers(page, 10, searchQuery);
      } else if (activeTab === "reports") {
        responseData = await fetchAdminReports(page, 10, searchQuery);
      } else if (["Pending", "Approved", "Rejected"].includes(activeTab)) {
        responseData = await fetchAdminProperties(
          activeTab,
          page,
          10,
          searchQuery,
        );
      }

      if (responseData) {
        // 🚀 THE FIX: Tell React exactly where to find the array based on your console log!
        let extractedArray = [];

        if (Array.isArray(responseData.data)) {
          extractedArray = responseData.data; // Matches your console log perfectly!
        } else if (Array.isArray(responseData)) {
          extractedArray = responseData;
        }

        setData(extractedArray);
        setTotalPages(responseData.pagination?.totalPages || 1);

        if (["Pending", "Approved", "Rejected"].includes(activeTab)) {
          setStats((prev) => ({
            ...prev,
            [activeTab.toLowerCase()]:
              responseData.pagination?.totalProperties ||
              responseData.count ||
              extractedArray.length ||
              0,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchQuery(searchInput);
  };

  const changePropertyStatus = async (id, newStatus) => {
    try {
      await updateAdminPropertyStatus(id, newStatus);
      alert(`Property marked as ${newStatus}`);
      fetchData();
    } catch (err) {
      console.error(err);
      alert("Failed to change status.");
    }
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f6f9" }}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setPage(1);
          setSearchQuery("");
          setSearchInput("");
        }}
      />

      <div
        className="main"
        style={{ flex: 1, padding: "20px", marginLeft: "250px" }}
      >
        <Topbar />

        {/* Overview Tab Cards */}
        {activeTab === "overview" && <Cards stats={stats} />}

        {activeTab !== "overview" && (
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <h2>
                {activeTab}{" "}
                {activeTab === "users" || activeTab === "reports"
                  ? ""
                  : "Properties"}
              </h2>

              <form
                onSubmit={handleSearch}
                style={{ display: "flex", gap: "10px" }}
              >
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ccc",
                    width: "250px",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "10px 15px",
                    background: "#333",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Search
                </button>
              </form>
            </div>

            {loading ? (
              <p style={{ textAlign: "center", padding: "50px" }}>
                Loading data...
              </p>
            ) : data.length === 0 ? (
              <p
                style={{ textAlign: "center", padding: "50px", color: "#888" }}
              >
                No data found in this category.
              </p>
            ) : (
              <>
                {["Pending", "Approved", "Rejected"].includes(activeTab) && (
                  <PropertyTable
                    properties={data}
                    changeStatus={changePropertyStatus}
                  />
                )}

                {activeTab === "users" && <UserTable users={data} />}

                {activeTab === "reports" && <ReportTable reports={data} />}
              </>
            )}

            {totalPages > 1 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "15px",
                  marginTop: "30px",
                }}
              >
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={{
                    padding: "8px 16px",
                    cursor: page === 1 ? "not-allowed" : "pointer",
                    background: "#eee",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  Previous
                </button>
                <span style={{ padding: "8px", fontWeight: "bold" }}>
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={{
                    padding: "8px 16px",
                    cursor: page === totalPages ? "not-allowed" : "pointer",
                    background: "#eee",
                    border: "none",
                    borderRadius: "4px",
                  }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
