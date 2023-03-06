import React, { useEffect, useState } from "react";
import "../../API";
import { DeleteTicket } from "../../API";
import { Card, Button } from 'antd';
import axios from "axios"


export function TicketsDelete({ id }) {
  const baseUrl = 'https://localhost:7110/Tickets';
  const [details, setDetails] = useState(null);

 

  useEffect(() => {
    axios( baseUrl + `/Details/${id}`)
    .then(res => {
      setDetails(res.data);
    })
    
  }, [id]);
   
  return (
    <>
      <Card>
        <div>Id: {details?.id}</div>
        <div>Ticket Title: {details?.title}</div>
        <div>Project: {details?.project?.name}</div> 
        <div>Description: {details?.description}</div>
        <div>Priority: {details?.ticketPriority?.name}</div>   
        <div>Status: {details?.ticketStatus?.name}</div>  
        <div>Type: {details?.ticketType?.name}</div> 
        <div>Comments: </div>
        {
          details?.comments['$values']?.map((item, key) => {
            return (
              <div key={key}>
                Value: {item}
              </div>
            )
          })
        }
        <div>Attachments: </div>
        {
          details?.attachments['$values']?.map((item, key) => {
            return (
              <div key={key}>
                Value: {item}
              </div>
            )
          })
        }

        <Button type="primary" danger >Delete</Button>
      </Card>
    </>
  )
}