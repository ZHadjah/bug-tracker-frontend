import React, {useEffect, useState} from 'react'
import { Space } from "antd";
import { Typography, Modal, Card, Table } from "antd";
import { Link } from 'react-router-dom'
import { ProjectsDelete} from './ProjectsDelete.js'
import { ProjectsUpdate} from './ProjectsUpdate.js'
import axios from "axios"

function ProjectsRead() {

    const [dataSource, setDataSoruce] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [id, setId] = useState(1);  
  
    useEffect(() => {
      setLoading(true);
      
      axios.get('https://localhost:7110/projects').then(res => {
        setDataSoruce(res.data.$values);
        setLoading(false);
      })   
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
      <div className='Projects_Read_Container'>
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
                title: "tickets",
                dataIndex: "tickets",
              },

              {
                title: "members",
                dataIndex: "members",
              },
              {
                title: "company",
                dataIndex: "company",
              },
              {
                title: "tickets",
                dataIndex: "tickets",
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
  
          {dlgModalInfo.modalTitle == "Edit" ? <ProjectsUpdate id={dlgModalInfo.id}/>                                                       
                                                        :       
                                               <ProjectsDelete id={dlgModalInfo.id}/>}
        </Modal>
  
      </div>
    )
  }
export default ProjectsRead