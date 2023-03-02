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
import { First } from "react-bootstrap/esm/PageItem";
import { useState } from "react";
import { GetAllTickets, GetTicketsCount} from "../../API";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';



function Dashboard() {

  const [numberOfTickets, setNumberOfTickets] = useState(0);
  useEffect(() => {
    setNumberOfTickets(GetTicketsCount().then(res => {
      console.log('res = ', res);
        setNumberOfTickets(parseInt(res));
    })) 
  }, [])

  return (
    <div>
      <Space size={20} direction="vertical">
        <Typography.Title level={4}>Dashboard</Typography.Title>
        <Space direction="horizontal">
          <DashboardCard
            bgColor={"grey"}
            icon={
              <TabletOutlined
                style={{ color: "blue", backgroundColor: "light-blue" }}
              />
            }
            title={"Tickets"}
            value={numberOfTickets}
          ></DashboardCard>
          <DashboardCard
            bgColor={"grey"}
            icon={
              <ProjectOutlined
                style={{ color: "orange", backgroundColor: "light-orange" }}
              />
            }
            title={"Projects"}
            value={555}
          ></DashboardCard>
          <DashboardCard
            bgColor={"grey"}
            icon={
              <UsergroupDeleteOutlined
                style={{ color: "red", backgroundColor: "light-red" }}
              />
            }
            title={"Companies"}
            value={555}
          ></DashboardCard>
          <DashboardCard
            bgColor={"grey"}
            icon={
              <UserOutlined
                style={{ color: "green", backgroundColor: "light-yellow" }}
              />
            }
            title={"Users"}
            value={555}
          ></DashboardCard>
        </Space>
        <br />
        <Space>
          <RecentTickets />
          <Charts />
        </Space>
      </Space>
    </div>
  );
}


function Charts(){
  ChartJS.register(ArcElement, Tooltip, Legend);


  const data = {
    labels: [
        "Tickets",
        "Projects",
        "Companies",
        "Users"
    ],
    datasets: [
        {
            data: [55, 80,65,32],
            backgroundColor: [
                "blue",
                "yellow",
                "red",
                "green",
            ],
            hoverBackgroundColor: [
                "dark-blue",
                "orange",
                "purple",
                "dark-green",
            ],
            hoverBorderColor: "#fff"
        }]
};

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

  const [numberOfTickets, setNumberOfTickets] = useState();


  useEffect(() => {
    const setNumberOfTickets = GetTicketsCount()
  })


  return (
    <Card bodyStyle={{ backgroundColor: bgColor }}>
      <Space direction="horizontal">
        {icon}
        <Statistic title={title} value={value} />
      </Space>
    </Card>
  );
}

export default Dashboard;
