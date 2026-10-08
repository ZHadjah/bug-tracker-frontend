import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../API";
import BootstrapViewGrid from "../BootstrapViewGrid";

function ProjectsCreate() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/Companies`).then((res) => setCompanies(res.data.$values));
  }, []);

  function onSubmit(event) {
    event.preventDefault();
  }

  return (
    <BootstrapViewGrid contentClassName="col-12 col-lg-10 col-xl-8">
      <div className="card">
        <div className="card-header">Create Project</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="mb-3">
              <label className="form-label" htmlFor="project-name">Project Name</label>
              <input id="project-name" className="form-control" name="project" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="project-description">Description</label>
              <textarea id="project-description" className="form-control" name="Description" rows="3" required />
            </div>
            <div className="mb-3">
              <label className="form-label" htmlFor="project-company">Company</label>
              <select id="project-company" className="form-select" name="company" required defaultValue="">
                <option value="" disabled>Select a company</option>
                {companies.map((company) => (
                  <option value={company.id} key={company.id}>{company.name}</option>
                ))}
              </select>
            </div>
            <button className="btn btn-primary" type="submit">Submit</button>
          </form>
        </div>
      </div>
    </BootstrapViewGrid>
  );
}

export default ProjectsCreate;
