import React, {useState} from 'react'
import axios from "axios"

const ticketsBaseUrl = 'https://localhost:7110/Tickets';
const baseUrl = 'https://localhost:7110/home';


//used in dashboard for charts and small cards
export function GetDashboardNumbers() {
  return (
    axios.get(baseUrl).then(res => {
      return res.data
    })         
  )
}

export function GetAllTickets() {
    return (
      fetch(ticketsBaseUrl)
        .then(res => res.json())
          
    )
}

export function GetTicketsEdit(id) {
  return (
    fetch( ticketsBaseUrl + `/Edit/${id}`)
        .then(res => res.json())
        
  )
}

export default function GetTicketDetails(id) {
  const [details, setDetails] = useState([]);

  fetch( ticketsBaseUrl + `/Details/${id}`)
  .then((res) => res.json())
  .then((res) => {
    setDetails(res.data)   
  })  
}

export function DeleteTicket(id) {
  return (
    fetch(ticketsBaseUrl + `/Delete/${id}`, {method: 'DELETE'})
        .then((res) =>{
          if(!res.ok){
            // throw new Error('Something went wrong');
            console.log("Error")
          }
          else
            console.log('deletion done')
        })
        .catch((e) => {
          console.log(e);
        })
        
  )
}