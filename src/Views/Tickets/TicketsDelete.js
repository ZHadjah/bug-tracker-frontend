import React, { useEffect, useState } from "react";
import axios from "axios";

export function TicketsDelete({ id }) {
  const baseUrl = "https://localhost:7110/Tickets";
  const [details, setDetails] = useState(null);
  const [deleteError, setDeleteError] = useState("");
  const [deleted, setDeleted] = useState(false);

  useEffect(() => {
    axios.get(`${baseUrl}/Details/${id}`).then((res) => setDetails(res.data));
  }, [id]);

  async function deleteTicket() {
    setDeleteError("");
    try {
      await axios.delete(`${baseUrl}/Delete/${id}`);
      setDeleted(true);
    } catch (error) {
      setDeleteError(error.response?.data?.message || error.message || "Could not delete ticket.");
    }
  }

  return (
    <div>
      {deleteError && <div className="alert alert-danger" role="alert">{deleteError}</div>}
      {deleted ? (
        <div className="alert alert-success" role="status">Ticket deleted.</div>
      ) : (
        <>
          <p>Are you sure you want to delete this ticket?</p>
          <dl className="row">
            <dt className="col-sm-3">ID</dt><dd className="col-sm-9">{details?.id}</dd>
            <dt className="col-sm-3">Title</dt><dd className="col-sm-9">{details?.title}</dd>
            <dt className="col-sm-3">Project</dt><dd className="col-sm-9">{details?.project?.name}</dd>
            <dt className="col-sm-3">Description</dt><dd className="col-sm-9">{details?.description}</dd>
            <dt className="col-sm-3">Priority</dt><dd className="col-sm-9">{details?.ticketPriority?.name}</dd>
            <dt className="col-sm-3">Status</dt><dd className="col-sm-9">{details?.ticketStatus?.name}</dd>
            <dt className="col-sm-3">Type</dt><dd className="col-sm-9">{details?.ticketType?.name}</dd>
          </dl>
          <button className="btn btn-danger" type="button" onClick={deleteTicket}>Delete Ticket</button>
        </>
      )}
    </div>
  );
}
