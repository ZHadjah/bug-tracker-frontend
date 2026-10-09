import React, { useEffect, useState } from "react";
import axios from "axios";
import BootstrapModal from "../BootstrapModal";
import BootstrapTable from "../BootstrapTable";
import BootstrapViewGrid from "../BootstrapViewGrid";

function CompaniesRead() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get("https://localhost:7110/companies").then((res) => {
      setDataSource(res.data.$values);
      setLoading(false);
    });
  }, []);

  return (
    <BootstrapViewGrid>
      <div className="card">
        <div className="card-header">Companies</div>
        <BootstrapTable
          columns={[
            { title: "ID", dataIndex: "id" },
            { title: "Name", dataIndex: "name" },
            { title: "Description", dataIndex: "description" },
            { title: "Members", dataIndex: "members" },
            {
              title: "Actions",
              key: "actions",
              render: (_, company) => (
                <div className="d-flex gap-3">
                  <button
                    className="btn btn-link p-0"
                    aria-label={`Edit ${company.name}, description: ${company.description || "no description"}`}
                    onClick={() => setAction({ name: "Edit", id: company.id })}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-link text-danger p-0"
                    aria-label={`Delete ${company.name}, description: ${company.description || "no description"}`}
                    onClick={() => setAction({ name: "Delete", id: company.id })}
                  >
                    Delete
                  </button>
                </div>
              ),
            },
          ]}
          loading={loading}
          dataSource={dataSource}
          caption="Companies with their IDs, names, descriptions, member counts, and available actions."
          tableLabel="Companies"
        />
      </div>
      {action && (
        <BootstrapModal title={`${action.name} Company`} onClose={() => setAction(null)}>
          <p className="mb-0">Company {action.id} {action.name.toLowerCase()} is not available yet.</p>
        </BootstrapModal>
      )}
    </BootstrapViewGrid>
  );
}

export default CompaniesRead;
