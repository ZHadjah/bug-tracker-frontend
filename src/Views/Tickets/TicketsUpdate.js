import { GetTicketsEdit } from '../../API';
import React, { useEffect, useState } from "react";
import "../../API";
import { DeleteTicket } from "../../API";
import axios from "axios"
import { Button, Card ,Form, Input,  Upload} from 'antd';
import { PlusOutlined } from '@ant-design/icons';



export function TicketsUpdate({id}) {
  const baseUrl = 'https://localhost:7110/Tickets';
  const [details, setDetails] = useState(null);

  useEffect(() => {
    axios( baseUrl + `/Details/${id}`)
    .then(res => {
      setDetails(res.data);
    })
  }, [id]);


  const { TextArea } = Input;

  const handleSubmit = async (e, id) => {
    e.preventDefault();
    await axios.put(baseUrl+`/Update/${id}`,{} )
      .then()

  }

  return (
    <Card>
  

    <Form 
        onSubmit={handleSubmit(details?.id)}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        style={{ maxWidth: 600 }}>
      <Form.Item label="Id">
        <Input 
        required
         placeholder={details?.id} />
      </Form.Item>

      <Form.Item label="Title">
        <Input 
        required 
        placeholder={details?.title} />
      </Form.Item>

      <Form.Item label="Project">
        <Input required placeholder={details?.project?.name} />
      </Form.Item>

      <Form.Item label="Description">
        <Input required placeholder={details?.description} />
      </Form.Item>

      <Form.Item label="Priority">
        <Input required placeholder={details?.ticketPriority?.name} />
      </Form.Item>

      <Form.Item label="Status">
        <Input required placeholder={details?.ticketStatus?.name} />
      </Form.Item>
      
      <Form.Item label="Type">
        <Input required placeholder={details?.ticketType?.name} />
      </Form.Item>

      <Form.Item label='Enter comments'>
          <TextArea rows={4} />
      </Form.Item>

      <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary">Update</Button>
      </Form.Item>

    </Form>   

  </Card>
  )
}