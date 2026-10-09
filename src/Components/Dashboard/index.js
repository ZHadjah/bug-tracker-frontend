import React, { useEffect, useState } from "react";
import { GetAllTickets } from "../../API";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import BootstrapTable from "../../Views/BootstrapTable";

function Dashboard() { 
  const [entityNumbers, setEntityNumbers] = useState({
    tickets: 0,
    projects: 0,
    companies: 0,
    users: 0,

    newStatus: 0,
    developmentStatus: 0,
    testingStatus: 0,
    resolvedStatus: 0, 

    urgentPriority: 0,
    highPriority: 0,
    mediumPriority: 0,
    lowPriority: 0,

    newDevType: 99,
    workTaskType: 0,
    defectType: 0,
    enhancementType: 0,
    changeRequestType: 0

   });

   useEffect(() => {
    axios.get('https://localhost:7110/home').then(res => {
      setEntityNumbers({
        tickets: res.data.NumberOfTickets, 
        projects: res.data.NumberOfProjects,
        companies: res.data.NumberofCompanies,
        users: res.data.NumberOfUsers,

        newStatus: res.data.NumberOfTicketsInNewStatus,
        developmentStatus: res.data.NumberOfTicketsInDevelopmentStatus,
        testingStatus: res.data.NumberOfTicketsInTestingStatus,
        resolvedStatus: res.data.NumberOfTicketsInResolvedStatus,

        urgentPriority: res.data.NumberOfTicketsInUrgentPriority,
        highPriority: res.data.NumberOfTicketsInHighPriority,
        mediumPriority: res.data.NumberOfTicketsInMediumPriority,
        lowPriority: res.data.NumberOfTicketsInLowPriority,

        newDevType: res.data.NumberOfTicketsInNewDevType,
        workTaskType: res.data.NumberOfTicketsInWorkTaskType,
        defectType: res.data.NumberOfTicketsInDefectType,
        enhancementType: res.data.NumberOfTicketsInEnhancementType,
        changeRequestType: res.data.NumberOfTicketsInChangeRequestType
      })      
    })
  }, [])   


  return (
    <div className="container-fluid bg-white py-3">
      <h1 className="visually-hidden">Dashboard</h1>
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <DashboardCard bgColor="#01D2FE" icon="T" title="Tickets" value={entityNumbers.tickets} />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <DashboardCard bgColor="#fba80f" icon="P" title="Projects" value={entityNumbers.projects} />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <DashboardCard bgColor="#d81414" icon="C" title="Companies" value={entityNumbers.companies} />
        </div>
        <div className="col-12 col-sm-6 col-xl-3">
          <DashboardCard bgColor="#40ba40" icon="U" title="Users" value={entityNumbers.users} />
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-6 col-xxl-3">
          <Chart title="All Entities" records={[
            [entityNumbers.tickets, "Tickets"],
            [entityNumbers.projects, "Projects"],
            [entityNumbers.companies, "Companies"],
            [entityNumbers.users, "Users"],
          ]} />
        </div>
        <div className="col-12 col-md-6 col-xxl-3">
          <Chart title="Ticket Status" records={[
            [entityNumbers.newStatus, "New"],
            [entityNumbers.developmentStatus, "Development"],
            [entityNumbers.testingStatus, "Testing"],
            [entityNumbers.resolvedStatus, "Resolved"],
          ]} />
        </div>
        <div className="col-12 col-md-6 col-xxl-3">
          <Chart title="Ticket Priority" records={[
            [entityNumbers.mediumPriority, "Medium"],
            [entityNumbers.highPriority, "High"],
            [entityNumbers.urgentPriority, "Urgent"],
            [entityNumbers.lowPriority, "Low"],
          ]} />
        </div>
        <div className="col-12 col-md-6 col-xxl-3">
          <Chart title="Ticket Type" records={[
            [entityNumbers.defectType, "Defect"],
            [entityNumbers.newDevType, "New Development"],
            [entityNumbers.workTaskType, "Work Task"],
            [entityNumbers.enhancementType, "Enhancement"],
            [entityNumbers.changeRequestType, "Change Request"],
          ]} />
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <RecentTickets />
        </div>
      </div>
    </div>
  );
}

function Chart({ title, records }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: records.map(([, label]) => label),
    datasets: [
        {
            data: records.map(([value]) => value),
            backgroundColor: [
                "blue",
                "yellow",
                "red",
                "green",
                "orange"
            ],
            hoverBackgroundColor: [
                "#1919ff",
                "#ffff7f",
                "#ff6f6f",
                "#4ca64c",
                "#ffc04d"
            ],
            hoverBorderColor: "#fff"
        }]
}


  return (
    <section className="card h-100" aria-labelledby={`chart-title-${title.replace(/\s+/g, "-").toLowerCase()}`}>
      <h2 id={`chart-title-${title.replace(/\s+/g, "-").toLowerCase()}`} className="card-header fs-6">{title}</h2>
      <div className="card-body" style={{ height: 320 }}>
        <Pie
          data={data}
          role="img"
          tabIndex={0}
          aria-label={`${title} chart: ${records.map(([value, label]) => `${label}, ${value}`).join("; ")}`}
          options={{ responsive: true, maintainAspectRatio: false }}
        />
      </div>
      <ul className="list-group list-group-flush" aria-label={`${title} chart values`}>
        {records.map(([value, label]) => (
          <li
            className="list-group-item d-flex justify-content-between"
            key={label}
            tabIndex={0}
            aria-label={`${label}: ${value}`}
          >
            <span>{label}</span>
            <span className="fw-semibold">{value}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RecentTickets() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    GetAllTickets().then((res) => {
      setDataSource(res.$values.slice(0, 4));
      setLoading(false);
    });
  }, []);

  return (
    <section className="card" aria-labelledby="recent-tickets-heading">
      <h2 id="recent-tickets-heading" className="card-header fs-6">Recent Tickets</h2>
      <BootstrapTable
        columns={[
          { title: "ID", dataIndex: "id" },
          { title: "Title", dataIndex: "title" },
          { title: "Description", dataIndex: "description" },
        ]}
        loading={loading}
        dataSource={dataSource}
        pageSize={4}
        caption="Recent tickets: the four most recently returned tickets."
        tableLabel="Recent tickets"
      />
    </section>
  );
}

function DashboardCard({ bgColor, icon, value, title }) {
  return (
    <div
      className="card h-100 border-0 shadow-sm"
      role="group"
      tabIndex={0}
      style={{ backgroundColor: bgColor }}
    >
      <div id={`dashboard${title}Card`} className="card-body d-flex align-items-center gap-3" aria-label={`${title}: ${value}`}>
        <span className="rounded-circle bg-white bg-opacity-50 d-inline-flex align-items-center justify-content-center fw-bold"
          style={{ width: 44, height: 44 }} aria-hidden="true">
          {icon}
        </span>
        <div>
          <h2 className="fs-6 mb-1">{title}</h2>
          <p className="fs-3 mb-0">{value}</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
