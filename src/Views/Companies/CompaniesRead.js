import React, { useEffect, useState } from "react";
import { Card, Table } from "antd";
import { GetAllTickets } from "../../API";
import { Space } from "antd";
import { Typography, Modal } from "antd";
import { Link } from 'react-router-dom'
import GetAllCompanies from '../../API'
import { CompaniesDelete} from './CompaniesDelete.js'
import { CompaniesUpdate} from './CompaniesUpdate.js'
import axios from "axios"

function CompaniesRead() {

  const [dataSource, setDataSoruce] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [id, setId] = useState(1);  

  useEffect(() => {
    setLoading(true);
    
    axios.get('https://localhost:7110/companies').then(res => {
      console.log(res.data)
    })   
    
    //GetAllCompanies().then((res) => {
    //   setDataSoruce(res.$values);
    //   setLoading(false);

    // });
  }, []);

  //Modal Logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dlgModalInfo, setDlgModalInfo] = useState({
    modalTitle: "",
    companyId: 0,
    isShow: false,
  });
  
     function showModal(newModalTitle, id){
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

  return (
    <div className='Companies_Read_Container'>
      <Card>
        <Table 
          columns={[
            {
              title: "id",
              dataIndex: "id"
            },
            {
              title: "name",
              dataIndex: "name",
            },
            {
              title: "description",
              dataIndex: "description",
            },
            {
              title: "members",
              dataIndex: "members",
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

        {dlgModalInfo.modalTitle == "Edit" ? <CompaniesUpdate id={dlgModalInfo.id}/>                                                       
                                                      :       
                                             <CompaniesDelete id={dlgModalInfo.id}/>}
      </Modal>

    </div>

   
  )
}

export default CompaniesRead