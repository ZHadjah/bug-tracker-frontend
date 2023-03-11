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
      })      
    })
  }, [])   


  return (
    <Space style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} size={60} direction="vertical">
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
        <RecentTickets />


        <Chart 
          firstRecord={entityNumbers.tickets}   firstTitle={"Tickets"} 
          secondRecord={entityNumbers.projects} //secondTitle={"Projects"}
          // thirdRecord={entityNumbers.companies} thirdTitle={"Companies"}
          // fourthRecord={entityNumbers.users}    fourthTitle={"Users"}
        />


        <Chart 
          // firstRecord={entityNumbers.newStatus} firstTitle={"New Status"}         
          // secondRecord={entityNumbers.developmentStatuss} secondTitle={"Development Status"}
          // thirdRecord={entityNumbers.testingStatus} thirdTitle={"Testing Status"}
          // fourthRecord={entityNumbers.resolvedStatus} fourthTitle={"Resolved Status"}
        />

      </Space>
    </Space>
  );
}


const Chart = () => {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const [entityNumbers, setEntityNumbers] = useState({
    tickets: 0,
    projects: 0,
    companies: 0,
    users: 0
   });

  useEffect(() => {
    axios.get('https://localhost:7110/home').then(res => {
      setEntityNumbers({
        tickets: res.data.Tickets,
        projects: res.data.Projects,
        companies: res.data.Companies,
        users: res.data.Users
      })
    }) }, []
  )   
        
  const data = {
    labels: [
        firstTitle,
        secondTitle,
        thirdTitle,
        fourthTitle
    ],
    datasets: [
        {
            data: [
              firstRecord,    
              secondRecord,       
              thirdRecord,       
              fourthRecord         
            ],
            backgroundColor: [
                "blue",
                "yellow",
                "red",
                "green",
            ],
            hoverBackgroundColor: [
                "#1919ff",
                "#ffff7f",
                "#ff6f6f",
                "#4ca64c",
            ],
            hoverBorderColor: "#fff"
        }]
}

  return(
    <>
      {firstRecord} {firstTitle} {secondRecord}

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
      <Typography.Title>charts</Typography.Title>
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
