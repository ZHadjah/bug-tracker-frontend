import React from 'react'

//used in dashboard for charts and small cards
export function GetTicketsCount() {
  return (
    fetch('https://localhost:7110/Tickets/NumberOfTickets')
        .then(res => res.json())       
  )
}

export function GetAllTickets() {
    return (
      fetch('https://localhost:7110/Tickets')
          .then(res => res.json())
          
    )
}

export function GetTicketsEdit(id) {
  return (
    fetch(`https://localhost:7110/Tickets/Edit/${id}`)
        .then(res => res.json())
        
  )
}