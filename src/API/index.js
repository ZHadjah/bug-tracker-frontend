import React, {useState} from 'react'
import axios from "axios"

export const ticketsBaseUrl = 'https://localhost:7110/Tickets';
export const baseUrl = 'https://localhost:7110';
export const homeBaseUrl = 'https://localhost:7110/home';


//used in dashboard for charts and small cards
export function GetDashboardNumbers() {
  return (
    axios.get(homeBaseUrl).then(res => {
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

export function GetAllCompanies() {
  return (
    axios.get(`${baseUrl}/Companies`).then(res => {
      return res.data
    })         
      
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

export async function DeleteTicket(id) {
  return (
    // await axios.delete(ticketsBaseUrl + `/Delete/${id}`, {method: 'DELETE'})
     await axios.delete(`https://localhost:7110/Tickets/Delete/${id}`, {method: 'DELETE'})
        .then((res) =>{
          if(!res.ok){
            console.log("error")
            console.log(id)

          }       
          else if (res.ok){
            console.log('worked')
            console.log(id)

          }   
        })
             
  )
}

