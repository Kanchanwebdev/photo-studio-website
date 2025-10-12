import React, { useEffect, useState } from "react";
import api from "../api";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Fetch all bookings
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings");
        setBookings(res.data);
      } catch (err) {
        console.error("Error fetching bookings:", err);
        setMessage("❌ Failed to load bookings.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  // Delete booking
  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    try {
      await api.delete(`/bookings/${id}`);
      setBookings(bookings.filter((b) => b._id !== id));
      setMessage("✅ Booking deleted successfully.");
    } catch (err) {
      console.error("Error deleting booking:", err);
      setMessage("❌ Failed to delete booking.");
    }
  };

  // Export bookings to Excel
  const exportToExcel = () => {
    if (bookings.length === 0) {
      alert("No bookings available to export!");
      return;
    }

    const worksheet = XLSX.utils.json_to_sheet(bookings);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Bookings");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(fileData, `Bookings_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };

  if (loading) return <p className="text-center py-5">⏳ Loading bookings...</p>;

  return (
    <div className="container py-4">
      <h2 className="section-title text-center mb-4">📋 All Bookings</h2>
      {message && <p className="text-center text-info">{message}</p>}

      <div className="text-center mb-3">
        <button onClick={exportToExcel} className="btn btn-success me-2">
          📤 Export to Excel
        </button>
      </div>

      {bookings.length === 0 ? (
        <p className="text-center text-muted">No bookings found.</p>
      ) : (
        <table className="table table-bordered table-striped shadow-sm">
          <thead style={{ background: "#c7a948", color: "#fff" }}>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Service</th>
              <th>Date</th>
              <th>Venue</th>
              <th>Budget (₹)</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.name}</td>
                <td>{b.phone}</td>
                <td>{b.email}</td>
                <td>{b.service}</td>
                <td>{b.date}</td>
                <td>{b.venue}</td>
                <td>{b.budget}</td>
                <td>{b.message}</td>
                <td className="text-center">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteBooking(b._id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
