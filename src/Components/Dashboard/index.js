import { Card, Statistic, Table } from "antd";
import { Typography } from "antd";
import React, { useEffect } from "react";
import {
  DatabaseOutlined,
  UserOutlined,
  UsergroupDeleteOutlined,
  ProjectOutlined,
  TabletOutlined,
} from "@ant-design/icons";
import { Space } from "antd";
import { useState } from "react";
import { GetAllTickets, GetDashboardNumbers} from "../../API";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from 'axios'
import data from '../../ChartExample.json'

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
    <Space style={{ display: 'flex', alignItems: 'start', justifyContent: 'center', backgroundColor: 'white' }} size={60} direction="vertical">
      <Space style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: "20px"}} direction="horizontal">
        <DashboardCard id="testing"
          bgColor={"#01D2FE"}
          icon={
            <TabletOutlined
              style={{ color: "black"}}
            />
          }
          title={"Tickets"}
          value={entityNumbers.tickets}
        ></DashboardCard>
        <DashboardCard 
          bgColor={"#fba80f"}
          icon={
            <ProjectOutlined
              style={{ color: "black" }}
            />
          }
          title={"Projects"}
          value={entityNumbers.projects}
        ></DashboardCard>
        <DashboardCard 
          bgColor={"#d81414"}
          icon={
            <UsergroupDeleteOutlined
              style={{ color: "black"}}
            />
          }
          title={"Companies"}
          value={entityNumbers.companies}
        ></DashboardCard>
        <DashboardCard 
          bgColor={"#40ba40"}
          icon={
            <UserOutlined
              style={{ color: "black" }}
            />
          }
          title={"Users"}
          value={entityNumbers.users}
        ></DashboardCard>
      </Space>
      <Space>

        {/* overall tickets chart */}
        <Chart 
          firstRecord={entityNumbers.tickets}   firstTitle={"Tickets"} 
          secondRecord={entityNumbers.projects} secondTitle={"Projects"}
          thirdRecord={entityNumbers.companies} thirdTitle={"Companies"}
          fourthRecord={entityNumbers.users}    fourthTitle={"Users"}
          fifthRecord={null}                         fifthTitle={null}

        />

        {/* Ticket Status chart */}
        <Chart 
          firstRecord={entityNumbers.newStatus} firstTitle={"New Status"}         
          secondRecord={entityNumbers.developmentStatus} secondTitle={"Development Status"}
          thirdRecord={entityNumbers.testingStatus} thirdTitle={"Testing Status"}
          fourthRecord={entityNumbers.resolvedStatus} fourthTitle={"Resolved Status"}
          fifthRecord={null}                         fifthTitle={null}
        />

        {/* Ticket Priority chart */}
        <Chart 
          firstRecord={entityNumbers.mediumPriority} firstTitle={"Medium Priority"}         
          secondRecord={entityNumbers.highPriority}  secondTitle={"High Priority"}
          thirdRecord={entityNumbers.urgentPriority} thirdTitle={"Urgent Priority"}
          fourthRecord={entityNumbers.lowPriority}   fourthTitle={"Low Priority"}
          fifthRecord={null}                         fifthTitle={null}
        />

        {/* Ticket Type chart */}
        
        <Chart 
            firstRecord={entityNumbers.defectType}        firstTitle={"Defect Type"}         
            secondRecord={entityNumbers.newDevType}       secondTitle={"New Development Type"}
            thirdRecord={entityNumbers.workTaskType}      thirdTitle={"Work Task Type"}
            fourthRecord={entityNumbers.enhancementType}  fourthTitle={"Enhancement Type"}
            fifthRecord={entityNumbers.changeRequestType} fifthTitle={"Change Request Type"}
            options={{
              responsive: true,
              maintainAspectRatio: true,
            }}
          />
      </Space>

      <Space>
        <RecentTickets />
      </Space>
    </Space>
  );
}

function Chart({ firstRecord, secondRecord, thirdRecord, fourthRecord, fifthRecord,
                 firstTitle, secondTitle, thirdTitle, fourthTitle, fifthTitle }){

  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: [
        firstTitle,
        secondTitle,
        thirdTitle,
        fourthTitle,
        fifthTitle !== null ? fifthTitle : null 
    ],
    datasets: [
        {
            data: [
              firstRecord,    
              secondRecord,       
              thirdRecord,       
              fourthRecord,
              fifthRecord !== null ? fifthRecord : null 
            ],
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


  return(
    <>
      <Card bodyStyle={{border : "1px solid black", width: 500, height: 350}}> <Pie width={474} height={260} data={data} /> </Card>
    </>
  )
}

function RecentTickets() {
  const [dataSource, setDataSoruce] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    GetAllTickets().then((res) => {
      setDataSoruce(res.$values.splice(0,4));
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Table
        columns={[
          {
            title: "id",
            dataIndex: "id",
          },
          {
            title: "title",
            dataIndex: "title",
          },
          {
            title: "description",
            dataIndex: "description",
          },
        ]}
        loading={loading}
        dataSource={dataSource}
        pagination={false}
      ></Table>
    </>
  );
}

function DashboardCard({ bgColor, icon, value, title }) {
  return (
    <Card className="Dashboard-Card" bodyStyle={{ backgroundColor: bgColor }}>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

export default Dashboard;
