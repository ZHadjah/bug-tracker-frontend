import React from 'react'

const baseUrl = 'https://localhost:7110/Tickets';


//used in dashboard for charts and small cards
export function GetTicketsCount() {
  return (
    fetch( baseUrl + `/NumberOfTickets`)
        .then(res => res.json())       
  )
}

export function GetAllTickets() {
    return (
      fetch(baseUrl)
        .then(res => res.json())
          
    )
}

export function GetTicketsEdit(id) {
  return (
    fetch( baseUrl + `/Edit/${id}`)
        .then(res => res.json())
        
  )
}

export function DeleteTicket(id) {
  return (
    fetch(baseUrl + `/Delete/${id}`, {method: 'DELETE'})
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