import React, { useEffect, useState } from "react";
import axios from "axios";
import { TicketsDelete } from "./TicketsDelete.js";
import { TicketsUpdate } from "./TicketsUpdate.js";
import BootstrapModal from "../BootstrapModal";
import BootstrapTable from "../BootstrapTable";
import BootstrapViewGrid from "../BootstrapViewGrid";

function TicketsRead() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [dlgModalInfo, setDlgModalInfo] = useState({
    modalTitle: "",
    id: 0,
    isShow: false,
  });

  useEffect(() => {
    setLoading(true);
    axios.get("https://localhost:7110/Tickets").then((res) => {
      setDataSource(res.data.$values);
      setLoading(false);
    });
  }, []);

  function showModal(modalTitle, id) {
    setDlgModalInfo({ modalTitle, id, isShow: true });
  }

  function closeModal() {
    setDlgModalInfo((current) => ({ ...current, isShow: false }));
  }

  return (
    <>
      <BootstrapViewGrid>
        <div className="card">
          <div className="card-header">Tickets</div>
          <BootstrapTable
            columns={[
              { title: "ID", dataIndex: "id" },
              { title: "Title", dataIndex: "title" },
              { title: "Description", dataIndex: "description" },
              {
                title: "Actions",
                key: "actions",
                render: (_, record) => (
                  <div className="d-flex gap-3">
                    <button className="btn btn-link p-0" onClick={() => showModal("Edit", record.id)}>
                      Edit
                    </button>
                    <button className="btn btn-link text-danger p-0" onClick={() => showModal("Delete", record.id)}>
                      Delete
                    </button>
                  </div>
                ),
              },
            ]}
            loading={loading}
            dataSource={dataSource}
          />
        </div>
      </BootstrapViewGrid>
      {dlgModalInfo.isShow && (
        <BootstrapModal title={dlgModalInfo.modalTitle} onClose={closeModal}>
          {dlgModalInfo.modalTitle === "Edit" ? (
            <TicketsUpdate id={dlgModalInfo.id} />
          ) : (
            <TicketsDelete id={dlgModalInfo.id} />
          )}
        </BootstrapModal>
      )}
    </>
  );
}

export default TicketsRead;
