import React, { useEffect, useState } from "react";
import { Select, Space } from "antd";
import { Typography, Modal, Card, Table, Form } from "antd";
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

  useEffect(() => {
    setLoading(true);

    axios.get("https://localhost:7110/UserRoles/ManageUserRoles", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }).then((res) => {
      setRoles(res.data.$values[0].roles.$values);
    });

    axios.get("https://localhost:7110/UserRoles/ManageUserRoles", {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }).then((res) => {
      setDataSource(res.data.$values);
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
                title: "FisrtName",
                dataIndex: "FirstName",
              },
              // {
              //   title: "LastName",
              //   dataIndex: "lastName",
              // },
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

        <Card>
          <Form.Item
            name="Role"
            label="Role"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select a Role">
              {roles.map((role, index) => (
                <Option value={role.id} key={role.id}>
                  {role.value}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Card>
      </Space>

      <Modal
        title={dlgModalInfo.modalTitle}
        open={dlgModalInfo.isShow}
        onOk={handleOk}
        onCancel={handleCancel}
      ></Modal>
    </>
  );
}

export default ManageUserRoles;
