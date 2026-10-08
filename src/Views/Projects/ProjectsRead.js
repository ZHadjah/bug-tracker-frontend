import React, { useEffect, useState } from "react";
import axios from "axios";
import BootstrapModal from "../BootstrapModal";
import BootstrapTable from "../BootstrapTable";
import BootstrapViewGrid from "../BootstrapViewGrid";

function ProjectsRead() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get("https://localhost:7110/projects").then((res) => {
      setDataSource(res.data.$values);
      setLoading(false);
    });
  }, []);

  return (
    <BootstrapViewGrid>
      <div className="card">
        <div className="card-header">Projects</div>
        <BootstrapTable
          columns={[
            { title: "ID", dataIndex: "id" },
            { title: "Name", dataIndex: "name" },
            { title: "Tickets", dataIndex: "tickets" },
            { title: "Members", dataIndex: "members" },
            { title: "Company", dataIndex: "company" },
            {
              title: "Actions",
              key: "actions",
              render: (_, project) => (
                <div className="d-flex gap-3">
                  <button className="btn btn-link p-0" onClick={() => setAction({ name: "Edit", id: project.id })}>Edit</button>
                  <button className="btn btn-link text-danger p-0" onClick={() => setAction({ name: "Delete", id: project.id })}>Delete</button>
                </div>
              ),
            },
          ]}
          loading={loading}
          dataSource={dataSource}
        />
      </div>
      {action && (
        <BootstrapModal title={`${action.name} Project`} onClose={() => setAction(null)}>
          <p className="mb-0">Project {action.id} {action.name.toLowerCase()} is not available yet.</p>
        </BootstrapModal>
      )}
    </BootstrapViewGrid>
  );
}

export default ProjectsRead;
