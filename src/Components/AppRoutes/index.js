import {Route, Routes} from 'react-router-dom'
import Dashboard from '../../Views/Dashboard'
import TicketsRead from '../../Views/Tickets/TicketsRead'
import CompaniesRead from '../../Views/Companies/CompaniesRead'
import ProjectsRead from '../../Views/Projects/ProjectsRead'
import ManageUserRoles from '../../Views/UserRoles/ManageUserRoles'



function AppRoutes() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/Tickets" element={<TicketsRead />}></Route>
            <Route path="/Projects" element={<ProjectsRead />}></Route>
            <Route path="/Companies" element={<CompaniesRead />}></Route>
            <Route path="/Users" element={<ManageUserRoles />}></Route>
        </Routes>
    </>
  )
}

export default AppRoutes