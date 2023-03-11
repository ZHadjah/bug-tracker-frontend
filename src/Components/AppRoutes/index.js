import {Route, Routes} from 'react-router-dom'
import Dashboard from '../../Components/Dashboard'
import TicketsRead from '../../Views/Tickets/TicketsRead'
import CompaniesRead from '../../Views/Companies/CompaniesRead'
import ProjectsRead from '../../Views/Projects/ProjectsRead'
import ManageUserRoles from '../../Views/UserRoles/ManageUserRoles'
import TicketsCreate from '../../Views/Tickets/TicketsCreate'
import ProjectsCreate from '../../Views/Projects/ProjectsCreate'
import CompaniesCreate from '../../Views/Companies/CompaniesCreate'

function AppRoutes() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/Tickets" element={<TicketsRead />}></Route>
            <Route path="/Tickets/Create" element={<TicketsCreate />}></Route>

            <Route path="/Projects" element={<ProjectsRead />}></Route>
            <Route path="/Projects/Create" element={<ProjectsCreate />}></Route>

            <Route path="/Companies" element={<CompaniesRead />}></Route>
            <Route path="/Companies/Create" element={<CompaniesCreate />}></Route>

            <Route path="/Users" element={<ManageUserRoles />}></Route>
        </Routes>
    </>
  )
}

export default AppRoutes