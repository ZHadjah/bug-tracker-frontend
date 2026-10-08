import React, { useEffect, useState } from "react";
import axios from "axios";

export function TicketsUpdate({ id }) {
  const baseUrl = "https://localhost:7110/Tickets";
  const [details, setDetails] = useState(null);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    axios.get(`${baseUrl}/Details/${id}`).then((res) => setDetails(res.data));
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitError("");
    try {
      await axios.put(`${baseUrl}/Update/${id}`, {});
    } catch (error) {
      setSubmitError(error.response?.data?.message || error.message || "Could not update ticket.");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {submitError && <div className="alert alert-danger" role="alert">{submitError}</div>}
      <div className="mb-3">
        <label className="form-label" htmlFor="update-ticket-id">ID</label>
        <input id="update-ticket-id" className="form-control" value={details?.id ?? ""} readOnly />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="update-ticket-title">Title</label>
        <input id="update-ticket-title" className="form-control" defaultValue={details?.title ?? ""} required />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="update-ticket-project">Project</label>
        <input id="update-ticket-project" className="form-control" defaultValue={details?.project?.name ?? ""} required />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="update-ticket-description">Description</label>
        <textarea id="update-ticket-description" className="form-control" defaultValue={details?.description ?? ""} rows="3" required />
      </div>
      <div className="row g-3">
        <div className="col-12 col-md-4">
          <label className="form-label" htmlFor="update-ticket-priority">Priority</label>
          <input id="update-ticket-priority" className="form-control" defaultValue={details?.ticketPriority?.name ?? ""} required />
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label" htmlFor="update-ticket-status">Status</label>
          <input id="update-ticket-status" className="form-control" defaultValue={details?.ticketStatus?.name ?? ""} required />
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label" htmlFor="update-ticket-type">Type</label>
          <input id="update-ticket-type" className="form-control" defaultValue={details?.ticketType?.name ?? ""} required />
        </div>
      </div>
      <div className="my-3">
        <label className="form-label" htmlFor="update-ticket-comments">Comments</label>
        <textarea id="update-ticket-comments" className="form-control" rows="3" />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="update-ticket-upload">Attachments</label>
        <input id="update-ticket-upload" className="form-control" type="file" multiple />
      </div>
      <button className="btn btn-primary" type="submit">Update</button>
    </form>
  );
}
