import React, { useEffect, useState } from "react";
import api from "../api";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(null);
  const [editForm, setEditForm] = useState({ title: "", description: "", price: "" });
  const [newService, setNewService] = useState({ title: "", description: "", price: "" });
  const [showAddForm, setShowAddForm] = useState(false);

  // Fetch all services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await api.get("/services");
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
        setMessage("❌ Failed to load services.");
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  // 🗑️ Delete Service
  const deleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await api.delete(`/services/${id}`);
      setServices(services.filter((s) => s._id !== id));
      setMessage("✅ Service deleted successfully.");
    } catch (err) {
      console.error("Error deleting service:", err);
      setMessage("❌ Failed to delete service.");
    }
  };

  // ✏️ Start Edit Mode
  const startEdit = (service) => {
    setEditing(service._id);
    setEditForm({
      title: service.title,
      description: service.description,
      price: service.price,
    });
  };

  // 💾 Save Edited Service
  const saveEdit = async (id) => {
    try {
      await api.put(`/services/${id}`, editForm);
      setServices(
        services.map((s) =>
          s._id === id ? { ...s, ...editForm } : s
        )
      );
      setEditing(null);
      setMessage("✅ Service updated successfully!");
    } catch (err) {
      console.error("Error updating service:", err);
      setMessage("❌ Failed to update service.");
    }
  };

  const cancelEdit = () => {
    setEditing(null);
    setEditForm({ title: "", description: "", price: "" });
  };

  // ➕ Add New Service
  const addService = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/services/add", newService);
      setServices([...services, res.data.service || res.data]);
      setNewService({ title: "", description: "", price: "" });
      setShowAddForm(false);
      setMessage("✅ New service added successfully!");
    } catch (err) {
      console.error("Error adding service:", err);
      setMessage("❌ Failed to add service.");
    }
  };

  if (loading) return <p className="text-center py-5">⏳ Loading services...</p>;

  return (
    <div className="container py-4">
      <h2 className="section-title text-center mb-4">🛠️ Manage Services</h2>
      {message && <p className="text-center text-info">{message}</p>}

      {/* Add New Service Toggle */}
      <div className="text-center mb-4">
        <button
          className="btn btn-success"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? "➖ Cancel" : "➕ Add New Service"}
        </button>
      </div>

      {/* Add Service Form */}
      {showAddForm && (
        <form onSubmit={addService} className="card p-3 mb-4 shadow-sm">
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Service Title"
                value={newService.title}
                onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                required
              />
            </div>
            <div className="col-md-5">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={newService.description}
                onChange={(e) =>
                  setNewService({ ...newService, description: e.target.value })
                }
                required
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={newService.price}
                onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                required
              />
            </div>
            <div className="col-md-1 d-flex align-items-center">
              <button type="submit" className="btn btn-brand w-100">
                Add
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Service Table */}
      {services.length === 0 ? (
        <p className="text-center text-muted">No services found.</p>
      ) : (
        <table className="table table-bordered table-striped shadow-sm">
          <thead style={{ background: "#c7a948", color: "#fff" }}>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price (₹)</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((s) => (
              <tr key={s._id}>
                {editing === s._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        className="form-control"
                        value={editForm.title}
                        onChange={(e) =>
                          setEditForm({ ...editForm, title: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <textarea
                        className="form-control"
                        rows="2"
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm({ ...editForm, description: e.target.value })
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        className="form-control"
                        value={editForm.price}
                        onChange={(e) =>
                          setEditForm({ ...editForm, price: e.target.value })
                        }
                      />
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => saveEdit(s._id)}
                      >
                        💾 Save
                      </button>
                      <button className="btn btn-secondary btn-sm" onClick={cancelEdit}>
                        ❌ Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td>{s.title}</td>
                    <td>{s.description}</td>
                    <td>{s.price}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => startEdit(s)}
                      >
                        ✏️ Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteService(s._id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
