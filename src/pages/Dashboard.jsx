import React, { useState, useEffect } from "react";
import api from "../api/api";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import Cards from "../components/Cards";
import PropertyTable from "../components/PropertyTable";
import UserTable from "../components/PropertyTable";
import "../dashboard.css";
import VisitorsTable from "../components/VisitorsTable";

import {
  fetchAdminProperties,
  fetchAdminUsers,
  fetchAdminReports,
  fetchVisitors,
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
  }, [activeTab, page, searchQuery]);

  const fetchData = async () => {
    setLoading(true);
    try {
      let responseData = null;

      if (activeTab === "users") {
        responseData = await fetchAdminUsers(page, 10, searchQuery);
      } else if (activeTab === "reports") {
        responseData = await fetchAdminReports(page, 10, searchQuery);
      } else if (activeTab === "visitors") {
        responseData = await fetchVisitors();
      } else if (["Pending", "Approved", "Rejected"].includes(activeTab)) {
        responseData = await fetchAdminProperties(
          activeTab,
          page,
          10,
          searchQuery
        );
      }

      if (responseData) {
        setData(responseData.data || []);
        setTotalPages(responseData.pagination?.totalPages || 1);

        if (["Pending", "Approved", "Rejected"].includes(activeTab)) {
          setStats((prev) => ({
            ...prev,
            [activeTab.toLowerCase()]:
              responseData.pagination?.totalProperties ||
              responseData.count,
          }));
        }
      }
    } catch (error) {
      console.error(error);
      alert("Failed to load data.");
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
    <div className="dashboard-container">

      <Sidebar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setPage(1);
          setSearchQuery("");
          setSearchInput("");
        }}
      />

      <div className="main">

        <Topbar />

        {activeTab === "overview" && <Cards stats={stats} />}

        {activeTab !== "overview" && (
          <div className="content-box">

            <div className="header-bar">
              <h2>
                {activeTab}{" "}
                {activeTab === "users" || activeTab === "visitors" || activeTab === "reports"
                  ? ""
                  : "Properties"}
              </h2>

              <form onSubmit={handleSearch} className="search-form">
                <input
                  type="text"
                  placeholder={`Search ${activeTab}...`}
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="search-input"
                />
                <button type="submit" className="search-btn">
                  Search
                </button>
              </form>
            </div>

            {loading ? (
              <p className="loading">Loading data...</p>
            ) : data.length === 0 ? (
              <p className="empty">No data found.</p>
            ) : (
              <>
                {["Pending", "Approved", "Rejected"].includes(activeTab) && (
                  <PropertyTable
                    properties={data}
                    changeStatus={changePropertyStatus}
                  />
                )}

                {activeTab === "users" && <UserTable users={data} />}

                {activeTab === "reports" && (
                  <p>Reports Table Goes Here</p>
                )}
                {activeTab === "visitors" && (
                  <VisitorsTable visitors={data} />
                )}
              </>
            )}

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>

                <span>
                  Page {page} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={page === totalPages}
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