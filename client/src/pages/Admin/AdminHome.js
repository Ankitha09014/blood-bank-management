import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <Layout>
      <div className="container">
        <div className="d-felx flex-column mt-4">
          <h1>
            Welcome  <i className="text-success">{user?.name}</i>
          </h1>
          <h3>Manage Blood Bank App </h3>
          <hr />
          <p>
           This Database enables the management of blood bank system more effectively. As a admin, you can edit and have the full access to the database.The donors, organisation or hospitals registered under this database can be removed by the admin for the smooth functioning of the database.

      
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
