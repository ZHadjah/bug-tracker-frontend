import { Button, Form, Input, InputNumber, Card, Upload, Select, Space } from "antd";
import React, { useState, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { baseUrl } from "../../API";
import store from "../../redux/store";
import { getToken } from "../../utils/appUtils";

const { Option } = Select;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: "${label} is required!",
  types: {
    email: "${label} is not a valid email!",
    number: "${label} is not a valid number!",
  },
  number: {
    range: "${label} must be between ${min} and ${max}",
  },
};

function TicketsCreate() {
  const [ticketTypes, setTicketTypes] = useState([]);
  const [ticketPriorities, setTicketPriorities] = useState([]);
  const [ticketStatus, setTicketStatus] = useState([]);
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);
  const [data, setData] = useState({
    title: "",
    description: "",
    project: "",
    type: "",
    status: "",
    priority: "",
    owner: "",
    developer: "",
    comments: "",
  });


  useEffect(() => {
    axios.get(`${baseUrl}/TicketTypes/Options`).then((res) => {
      setTicketTypes(res.data);
    });

    axios.get(`${baseUrl}/TicketPriorities/Options`).then((res) => {
      setTicketPriorities(res.data);
    });

    axios.get(`${baseUrl}/TicketStatus/Options`).then((res) => {
      setTicketStatus(res.data);
    });

    axios.get(`${baseUrl}/Projects`).then((res) => {
      setProjects(res.data["$values"]);
    });

    axios
      .get(`${baseUrl}/UserRoles/GetAllUsersInCompany`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      .then((res) => {
        setUsers(res.data);
        debugger
      });
  }, []);


  function handleChange(e) {
    const value = e.target.value;
    setData({
      ...data,
      [e.target.name]: value
    });
  };

  function handleProjectChange(value) {
    setData({
      ...data,
      project: value
    });
  }

  function onSubmit(values)  { 
    axios
      .post(`${baseUrl}/Tickets/Create`, values).then((response) => {
        console.log(response);
        }).catch((error) => {
        console.log(error);
        })
   };

  return (
    <div className="Tickets-Create-Container">
      <Card>
      <Form
          {...layout}
          name="nest-messages"
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
          onSubmitCapture={(values) => onSubmit(values)}
        >

        <Space direction="vertical">
        
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input name="title" value={data.title} onChange={handleChange}/>
          </Form.Item>
          <Form.Item
            name="Description"
            label="Description"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input name="description" value={data.description} onChange={handleChange} />
          </Form.Item>

          <Form.Item
            name="Project"
            label="Project"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select a project" name="project" value={data.project} onChange={handleProjectChange}>
              {projects.map((project) => (
                <Option  value={project.id} key={project.id}>
                  {project.name}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="ticketType"
            label="Ticket Type"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select a type">
              {ticketTypes.map((type, index) => (
                <Option key={index}>{type.Value}</Option>
              ))}
            </Select>
          </Form.Item>
        </Space>

        <Space direction="vertical">
          
        </Space>


          <Form.Item
            name="ticketPriority"
            label="Ticket Priority"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select a Priority">
              {ticketPriorities.map((priority, index) => (
                <Option key={index} name="priority" value={data.priority} onChange={handleChange}>{priority.Value}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="ticketStatus"
            label="Ticket Status"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Please select a project">
              {ticketStatus.map((status, index) => (
                <Option key={index} onChange={handleChange}>{status.Value}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="Owner"
            label="Owner"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select who owns this ticket">
              {users.map((user, index) => (
                <Option key={index} name="owner" value={data.owner} onChange={handleChange}>{user.FullName}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="Developer"
            label="Developer"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select a Developer">
              {users.map((user, index) => (
                <Option key={index}>{user.FullName}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="Comments"
            label="Comments"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.TextArea name="comments" value={data.comments} onChange={handleChange}/>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              ...layout.wrapperCol,
              offset: 8,
            }}
          >
            <Form.Item label="Upload" valuePropName="fileList">
              <Upload action="/upload.do" listType="picture-card">
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              </Upload>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 8,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}
export default TicketsCreate;