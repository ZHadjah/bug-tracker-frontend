import React, { useEffect, useState } from "react";
import { Card, Table } from "antd";
import { GetAllTickets } from "../../API";
import { Space } from "antd";
import { Typography, Modal } from "antd";
import { Link } from 'react-router-dom'
import { TicketsDelete} from './TicketsDelete.js'
import { TicketsUpdate} from './TicketsUpdate.js'

function TicketsRead() {
  const [dataSource, setDataSoruce] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [id, setId] = useState(1);

  const [dlgModalInfo, setDlgModalInfo] = useState({
    title: "",
    id: 0,
    isShow: false
  });

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
  function showModal(newModalTitle, id){
    setDlgModalInfo({
      title: newModalTitle,
      id,
      isShow: true
    })
  };
  function handleOk(){
    console.log("handle ok triggered")

    setDlgModalInfo({
      ...dlgModalInfo,
      isShow: false
    })
  };
  function handleCancel(){
    console.log("handle cancel triggered")

    setDlgModalInfo({
      ...dlgModalInfo,
      isShow: false
    })
  };

  return (
    <>
      <Typography.Title level={3}>TicketsRead</Typography.Title>
      <Card>
        <Table 
          columns={[
            {
              title: "id",
              dataIndex: "id"
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
              render: (_, record) => {
                return (
                <Space size="middle">          
                  <Link onClick={() =>showModal("Edit", record.id)}>Edit </Link> 
                  <Link onClick={() =>showModal("Delete", record.id)}>Delete</Link> 
                </Space>
              )},
            },
          ]}
          loading={loading}
          dataSource={dataSource}
          pagination={true}
        ></Table>
      </Card>

      <Modal title={dlgModalInfo.title} open={dlgModalInfo.isShow} onOk={handleOk} onCancel={handleCancel}>
        {dlgModalInfo.title == "Edit" ? <TicketsUpdate id={dlgModalInfo.id}/> : <TicketsDelete  id={dlgModalInfo.id}/>}
      </Modal>
    </>
  );
}
export default TicketsRead;
