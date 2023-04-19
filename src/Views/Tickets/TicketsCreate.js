import { Button, Form, Input, InputNumber, Card, Upload, Select } from "antd";
import React, {useState, useEffect} from "react";
import { PlusOutlined } from "@ant-design/icons";
import axios from 'axios'
import { baseUrl } from "../../API";

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
  const [users, setUsers] = useState([""]);

  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios.get(`${baseUrl}/Projects`).then((res) => {
      setProjects(res.data.$values);
      console.log(projects);
    });
  }, []);


  

  
  return (
    <div className="Create-Container">
      <Card>
        <Form
          {...layout}
          name="nest-messages"
          style={{
            maxWidth: 600,
          }}
          validateMessages={validateMessages}
        >
          <Form.Item
            name="title"
            label="Title"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
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
            <Input />
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
           <Select placeholder="Select a project">
              {projects.map((project) => (
                <Option value={project.id} key={project.id}>
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
            <Select placeholder="Please select a project">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
            </Select>
          </Form.Item>


          <Form.Item
            name="ticketPriority"
            label="Ticket Priority"     
            rules={[
              {
                required: true,
              },
            ]}                  
          >
            <Select placeholder="Please select a project">
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
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
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
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
            <Select>
              <Option value="china">China</Option>
              <Option value="usa">U.S.A</Option>
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
            <Input.TextArea />
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

            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

export default TicketsCreate;
