import React, { useEffect, useState } from "react";
import { Card, Table } from "antd";
import { GetAllTickets } from "../../API";
import { Space } from "antd";
import { Typography, Modal } from "antd";
import { Link } from 'react-router-dom'
import { TicketsDelete} from './TicketsDelete.js'
import { TicketsUpdate} from './TicketsUpdate.js'
import axios from 'axios'

function TicketsRead() {
  const [dataSource, setDataSoruce] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [id, setId] = useState(1);  

  //Tickets fetch logic 
  useEffect(() => {
    setLoading(true);
    axios.get('https://localhost:7110/Tickets').then(res => {
      setDataSoruce(res.data.$values);
      setLoading(false);
    });   
  }, []);

  //Modal Logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dlgModalInfo, setDlgModalInfo] = useState({
    modalTitle: "",
    ticketId: 0,
    isShow: false,
  });
  
     function showModal(newModalTitle, id, ticketDescription){
    setDlgModalInfo({
      modalTitle: newModalTitle,
      id,
      isShow: true,
    })
  };
  function handleOk(){
    setDlgModalInfo({
      ...dlgModalInfo,
      isShow: false
    })
  };
  function handleCancel(){
    setDlgModalInfo({
      ...dlgModalInfo,
      isShow: false
    })
  };
  console.log(dataSource);

  return (
    <div className="Tickets-Read-Card">
      <Card className="Tickets-Read-Table">
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
                  <Link onClick={() =>showModal("Edit", record.id )}>Edit</Link>  
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

      <Modal title={dlgModalInfo.modalTitle} open={dlgModalInfo.isShow} onOk={handleOk} onCancel={handleCancel}>

        {dlgModalInfo.modalTitle == "Edit" ? <TicketsUpdate id={dlgModalInfo.id}/>                                                       
                                                       :       
                                             <TicketsDelete id={dlgModalInfo.id}/>}
      </Modal>
    </div>
  );
}
export default TicketsRead;
