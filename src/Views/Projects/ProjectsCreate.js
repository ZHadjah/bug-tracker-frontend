import React, { useState, useEffect }  from 'react'
import { Button, Form, Input, InputNumber, Card, Upload, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { baseUrl } from "../../API";
import { getToken } from "../../utils/appUtils";

const { Option } = Select;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

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

function ProjectsCreate() {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    axios.get(`${baseUrl}/Companies`).then((res) => {
            setCompanies(res.data.$values);
    });
  }, []);

  return (
    <div className="Projects-Create-Container" >
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
            name="project"
            label="Project Name"
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
            name="company"
            label="Company"
            hasFeedback
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select placeholder="Select a Company">
            {companies.map((company, index) => (
                    <Option value={company.id} key={company.id}>
                      {company.name}
                    </Option>
            ))}   
            </Select>
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
        </Form>
      </Card>
    </div>
    
  )
}
export default ProjectsCreate