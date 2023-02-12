import './App.css';
import {Admin, Resource} from 'react-admin'
import {TicketsRead} from './Views/Tickets/TicketsRead'
import {ManageUserRoles} from './Views/UserRoles/ManageUserRoles'
import {ProjectsRead} from './Views/Projects/ProjectsRead'
import {CompaniesRead} from './Views/Companies/CompaniesRead'
import {Box} from "@mui/material";
import simpleRestProvider from 'ra-data-simple-rest';


function App() {
  return (
    <div className="App">
      <Admin dataProvider={simpleRestProvider(`https://localhost:7110`)}> 
        <Resource name="tickets" list={TicketsRead} />
        <Resource name="projects" list={ProjectsRead} />
        <Resource name="users" list={ManageUserRoles} />
        <Resource name="companies" list={CompaniesRead} />

      </Admin> 
    </div>
  );
}

export default App;
