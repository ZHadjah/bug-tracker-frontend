import axios from "axios"

const configuredApiUrl =
  process.env.REACT_APP_API_URL || "https://bug-tracker-app-production.up.railway.app";

export const baseUrl = (
  process.env.NODE_ENV === "development" ? "https://localhost:7110" : configuredApiUrl
).replace(/\/+$/, "");
export const ticketsBaseUrl = `${baseUrl}/Tickets`;
export const homeBaseUrl = `${baseUrl}/home`;


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
     await axios.delete(`${ticketsBaseUrl}/Delete/${id}`, {method: 'DELETE'})
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
