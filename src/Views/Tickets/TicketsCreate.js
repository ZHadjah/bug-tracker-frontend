import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../API";
import BootstrapViewGrid from "../BootstrapViewGrid";
import { getToken } from "../../utils/appUtils";

function TicketsCreate() {
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketPriorities, setTicketPriorities] = useState([]);
  const [ticketStatus, setTicketStatus] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [data, setData] = useState({
    title: "",
    description: "",
    project: "",
    type: "",
    status: "",
    priority: "",
    owner: "",
    developer: "",
    comments: "",
  });

  useEffect(() => {
    axios.get(`${baseUrl}/TicketTypes/Options`).then((res) => setTicketTypes(res.data));
    axios.get(`${baseUrl}/TicketPriorities/Options`).then((res) => setTicketPriorities(res.data));
    axios.get(`${baseUrl}/TicketStatus/Options`).then((res) => setTicketStatus(res.data));
    axios.get(`${baseUrl}/Projects`).then((res) => setProjects(res.data.$values));
    axios
      .get(`${baseUrl}/UserRoles/GetAllUsersInCompany`, {
        headers: { Authorization: `Bearer ${getToken()}` },
      })
      .then((res) => setUsers(res.data));
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setData((current) => ({ ...current, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setSubmitError("");
    setSubmitSuccess(false);

    const payload = {
      title: data.title,
      Description: data.description,
      Project: data.project,
      ticketType: data.type,
      ticketPriority: data.priority,
      ticketStatus: data.status,
      Owner: data.owner,
      Developer: data.developer,
      Comments: data.comments,
    };

    try {
      await axios.post(`${baseUrl}/Tickets/Create`, payload);
      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(error.response?.data?.message || error.message || "Could not create ticket.");
    }
  }

  return (
    <BootstrapViewGrid contentClassName="col-12 col-xl-10">
      <div className="card">
        <div className="card-header">
          <h1 id="create-ticket-heading" className="h4 mb-0">Create Ticket</h1>
        </div>
        <div className="card-body">
          <form
            onSubmit={onSubmit}
            aria-labelledby="create-ticket-heading"
            aria-describedby={submitError ? "create-ticket-error" : undefined}
          >
            {submitError && (
              <div id="create-ticket-error" className="alert alert-danger" role="alert">
                {submitError}
              </div>
            )}
            {submitSuccess && <div className="alert alert-success" role="status">Ticket created.</div>}
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="ticket-title">Title</label>
                <input id="ticket-title" className="form-control" name="title" value={data.title} onChange={handleChange} required />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="ticket-project">Project</label>
                <select id="ticket-project" className="form-select" name="project" value={data.project} onChange={handleChange} required>
                  <option value="">Select a project</option>
                  {projects.map((project) => <option key={project.id} value={project.id}>{project.name}</option>)}
                </select>
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="ticket-description">Description</label>
                <textarea id="ticket-description" className="form-control" name="description" rows="3" value={data.description} onChange={handleChange} required />
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="ticket-type">Ticket Type</label>
                <select id="ticket-type" className="form-select" name="type" value={data.type} onChange={handleChange} required>
                  <option value="">Select a type</option>
                  {ticketTypes.map((type, index) => <option key={type.id ?? index} value={type.Value}>{type.Value}</option>)}
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="ticket-priority">Ticket Priority</label>
                <select id="ticket-priority" className="form-select" name="priority" value={data.priority} onChange={handleChange} required>
                  <option value="">Select a priority</option>
                  {ticketPriorities.map((priority, index) => <option key={priority.id ?? index} value={priority.Value}>{priority.Value}</option>)}
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="ticket-status">Ticket Status</label>
                <select id="ticket-status" className="form-select" name="status" value={data.status} onChange={handleChange} required>
                  <option value="">Select a status</option>
                  {ticketStatus.map((status, index) => <option key={status.id ?? index} value={status.Value}>{status.Value}</option>)}
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="ticket-owner">Owner</label>
                <select id="ticket-owner" className="form-select" name="owner" value={data.owner} onChange={handleChange} required>
                  <option value="">Select an owner</option>
                  {users.map((user, index) => <option key={user.id ?? index} value={user.FullName}>{user.FullName}</option>)}
                </select>
              </div>
              <div className="col-12 col-md-6">
                <label className="form-label" htmlFor="ticket-developer">Developer</label>
                <select id="ticket-developer" className="form-select" name="developer" value={data.developer} onChange={handleChange} required>
                  <option value="">Select a developer</option>
                  {users.map((user, index) => <option key={user.id ?? index} value={user.FullName}>{user.FullName}</option>)}
                </select>
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="ticket-comments">Comments</label>
                <textarea id="ticket-comments" className="form-control" name="comments" rows="3" value={data.comments} onChange={handleChange} />
              </div>
              <div className="col-12">
                <label className="form-label" htmlFor="ticket-upload">Attachments</label>
                <input id="ticket-upload" className="form-control" type="file" multiple />
              </div>
              <div className="col-12">
                <button className="btn btn-primary" type="submit">Create Ticket</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </BootstrapViewGrid>
  );
}

export default TicketsCreate;
