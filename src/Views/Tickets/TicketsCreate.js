import { Button, Form, Input, InputNumber, Card, Upload } from "antd";
import React from "react";
import { PlusOutlined } from '@ant-design/icons';

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
/* eslint-enable no-template-curly-in-string */



function TicketsCreate() {

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
                label="Name"
                rules={[
                {
                    required: true,
                },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="description"
                label="description"
                rules={[{
                    required: true,
                }]}
            >
                <Input />
            </Form.Item>
            <Form.Item name="Comments" 
                       label="Comments"
                       rules={[{
                        required: true,
                       }]}
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
  )
}

export default TicketsCreate;
