import React, { useEffect, useState } from "react";
import axios from "axios";
import BootstrapModal from "../BootstrapModal";
import BootstrapTable from "../BootstrapTable";
import BootstrapViewGrid from "../BootstrapViewGrid";
import { getToken } from "../../utils/appUtils";

function ManageUserRoles() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState({ title: "", id: null, isOpen: false });

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://localhost:7110/UserRoles/ManageUserRoles", {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => {
        setDataSource(res.data.$values);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <BootstrapViewGrid>
        <div className="card">
          <div className="card-header">User Roles</div>
          <BootstrapTable
            columns={[
              { title: "ID", dataIndex: "$id" },
              { title: "Full Name", dataIndex: ["btUser", "fullName"] },
              { title: "Role", dataIndex: "usersRole" },
              {
                title: "Actions",
                key: "actions",
                render: (_, record) => (
                  <div className="d-flex gap-3">
                    <button
                      className="btn btn-link p-0"
                      aria-label={`Edit role for ${record.btUser?.fullName || "unnamed user"}, current role: ${record.usersRole || "no role"}`}
                      onClick={() => setDialog({ title: "Edit", id: record.id, isOpen: true })}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-link text-danger p-0"
                      aria-label={`Delete role for ${record.btUser?.fullName || "unnamed user"}, current role: ${record.usersRole || "no role"}`}
                      onClick={() => setDialog({ title: "Delete", id: record.id, isOpen: true })}
                    >
                      Delete
                    </button>
                  </div>
                ),
              },
            ]}
            loading={loading}
            dataSource={dataSource}
            caption="User roles with each user's name, assigned role, and available actions."
            tableLabel="User roles"
          />
        </div>
      </BootstrapViewGrid>
      {dialog.isOpen && (
        <BootstrapModal title={dialog.title} onClose={() => setDialog((current) => ({ ...current, isOpen: false }))}>
          <form onSubmit={(event) => event.preventDefault()}>
            <div className="mb-3">
              <label className="form-label" htmlFor="user-role">Role</label>
              <input id="user-role" className="form-control" />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="user-role-id">ID</label>
              <input id="user-role-id" className="form-control" value={dialog.id ?? ""} readOnly />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="user-role-select">Select</label>
              <select id="user-role-select" className="form-select" defaultValue="demo">
                <option value="demo">Demo</option>
              </select>
            </div>
            <button className="btn btn-primary" type="submit">Save</button>
          </form>
        </BootstrapModal>
      )}
    </>
  );
}

export default ManageUserRoles;
