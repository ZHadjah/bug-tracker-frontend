import React from 'react'
import '../../API'
import { DeleteTicket } from '../../API'

export function TicketsDelete({id}) {


  return (
    <>
    <button onClick={() => DeleteTicket(id)}>
        delete {id}
    </button>
    </>

  )
}