import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { toast, ToastContainer } from "react-toastify"; // Import toast and ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const OrgList = () => {
  const [data, setData] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteEmail, setDeleteEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Fetch organisation records
  const getOrganisations = async () => {
    try {
      const { data } = await API.get("/admin/org-list");
      if (data?.success) {
        setData(data?.orgData);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch organisation data.");
    }
  };

  useEffect(() => {
    getOrganisations();
  }, []);

  // Show modal with record details
  const confirmDelete = (id, email) => {
    setDeleteId(id);
    setDeleteEmail(email);
    setShowModal(true);
  };

  // DELETE FUNCTION
  const handleDelete = async () => {
    try {
      const { data } = await API.delete(`/admin/delete-donar/${deleteId}`, {
        data: { email: deleteEmail },
      });
      // Show success message using toast
      toast.success(data?.message || "Organisation deleted successfully!");
      setShowModal(false);
      getOrganisations(); // Refresh the data after deletion
    } catch (error) {
      console.log(error);
      toast.error("An error occurred while deleting the organisation.");
    }
  };

  return (
    <Layout>
      
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Date</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((record) => (
            <tr key={record._id}>
              <td>{record.organisationName}</td>
              <td>{record.email}</td>
              <td>{record.phone}</td>
              <td>{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => confirmDelete(record._id, record.email)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal d-block" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Deletion</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this organisation?</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </Layout>
  );
};

export default OrgList;
