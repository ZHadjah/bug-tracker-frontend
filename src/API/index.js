import axios from "axios"

export const ticketsBaseUrl = 'https://bug-tracker-app-production.up.railway.app/Tickets';
export const baseUrl = 'https://bug-tracker-app-production.up.railway.app';
export const homeBaseUrl = 'https://bug-tracker-app-production.up.railway.app/home';


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

// export default function GetTicketDetails(id) {
//   const [details, setDetails] = useState([]);

//   fetch( ticketsBaseUrl + `/Details/${id}`)
//   .then((res) => res.json())
//   .then((res) => {
//     setDetails(res.data)   
//   })  
// }

export async function DeleteTicket(id) {
  return (
     await axios.delete(`https://bug-tracker-app-production.up.railway.app/Tickets/Delete/${id}`, {method: 'DELETE'})
        .then((res) =>{
          if(!res.ok){
            console.log("error")

          }       
          else if (res.ok){
            console.log('worked')

          }   
        })
             
  )
}
