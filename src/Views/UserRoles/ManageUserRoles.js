import React, { useEffect, useState } from "react";
import { Select, Space } from "antd";
import { Typography, Modal, Card, Table, Form, Input, Button } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { getToken } from "../../utils/appUtils";

const {Option} = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function ManageUserRoles() {
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [id, setId] = useState(1);
  const [dropDownOptions, setDropDownOptions] = useState([]); 
  const [roles, setRoles] = useState([]); 


  const [componentSize, setComponentSize] = useState('default');
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };





  useEffect(() => {
    setLoading(true);

    axios.get("https://localhost:7110/UserRoles/ManageUserRoles", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }).then((res) => {
      setDataSource(res.data.$values);
      setLoading(false);
    });
  }, []);


  console.log(dataSource);

  //Modal Logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dlgModalInfo, setDlgModalInfo] = useState({
    modalTitle: "",
    companyId: 0,
    isShow: false,
  });
  function showModal(newModalTitle, id) {
    setDlgModalInfo({
      modalTitle: newModalTitle,
      id,
      isShow: true,
    });
  }
  function handleOk() {
    setDlgModalInfo({
      ...dlgModalInfo,
      isShow: false,
    });
  }
  function handleCancel() {
    setDlgModalInfo({
      ...dlgModalInfo,
      isShow: false,
    });
  }

  return (
    <>
      <Space>
        <Card>
          <Table
            columns={[
              {
                title: "ID",
                dataIndex: "$id"
              },
              {
                title: "Full Name",
                dataIndex: ['btUser', 'fullName']
              },
              {
                title: "Role",
                dataIndex: "usersRole"
              },
              // {
              //   title: "Role",
              //   dataIndex: "***",
              // },
              {
                // key: "action",
                render: (_, record) => {
                  return (
                    <Space size="middle">
                      <Link onClick={() => showModal("Edit", record.id)}>
                        Edit
                      </Link>
                      <Link onClick={() => showModal("Delete", record.id)}>
                        Delete
                      </Link>
                    </Space>
                  );
                },
              },
            ]}
            loading={loading}
            dataSource={dataSource}
            pagination={true}
          ></Table>
        </Card>


      </Space>

      <Modal title={dlgModalInfo.modalTitle} open={dlgModalInfo.isShow} onOk={handleOk} onCancel={handleCancel}>
      

          <Form
          labelCol={{
            span: 4,
          }}
          wrapperCol={{
            span: 14,
          }}
          layout="horizontal"
          initialValues={{
            size: componentSize,
          }}
          onValuesChange={onFormLayoutChange}
          size={componentSize}
          style={{
            maxWidth: 600,
          }}
        >
         
          <Form.Item label="Role">
            <Input />
          </Form.Item>
          <Form.Item label="ID">
            <Input />
          </Form.Item>



          <Form.Item label="Select">
            <Select>
              <Select.Option value="demo">Demo</Select.Option>
            </Select>
          </Form.Item>
          
          
          
          
          
          
        </Form>

          

      </Modal>
    </>
  );
}

export default ManageUserRoles;
