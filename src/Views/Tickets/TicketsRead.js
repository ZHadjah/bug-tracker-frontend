import React, { useEffect, useState } from "react";
import { Card, Table } from "antd";
import { GetAllTickets } from "../../API";
import { Space } from "antd";
import { Typography, Modal } from "antd";
import { Link } from 'react-router-dom'

function TicketsRead() {
  const [dataSource, setDataSoruce] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [id, setId] = useState(1);

  //Tickets fetch logic 
  useEffect(() => {
    setLoading(true);
    GetAllTickets().then((res) => {
      setDataSoruce(res.$values);
      setLoading(false);
    });
  }, []);

  //Modal Logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  function showModal(newModalTitle){
    console.log("show modal triggered")
    setIsModalOpen(true);
    setModalTitle(newModalTitle);
  };
  function handleOk(){
    console.log("handle ok triggered")
    setIsModalOpen(false);
  };
  function handleCancel(){
    console.log("handle cancel triggered")

    setIsModalOpen(false);
  };

  return (
    <>
      <Typography.Title level={3}>TicketsRead</Typography.Title>
      <Card>
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
            {
              // key: "action",
              render: (_, record) => (
                <Space size="middle">          
                  <Link onClick={() =>showModal("Edit")}>Edit </Link> 
                  <Link onClick={() =>showModal("Delete")}>Delete</Link> 
                </Space>
              ),
            },
          ]}
          loading={loading}
          dataSource={dataSource}
          pagination={true}
        ></Table>
      </Card>

      <Modal title={modalTitle} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Card>
          ergsedfg
        </Card>
      </Modal>
    </>
  );
}



export default TicketsRead;
