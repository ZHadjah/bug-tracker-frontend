import "./App.css";
import { TicketsRead } from "./Views/Tickets/TicketsRead";
import { ManageUserRoles } from "./Views/UserRoles/ManageUserRoles";
import { ProjectsRead } from "./Views/Projects/ProjectsRead";
import { CompaniesRead } from "./Views/Companies/CompaniesRead";
import AppHeader from './Components/AppHeader'
import AppFooter from './Components/AppFooter'
import SideMenu from './Components/SideMenu'
import PageContent from './Components/PageContent'
import {Space} from 'antd';

function App() {
  return (
    <>
      <div style={{height: 'calc(100vh - 50px)'}}>
        <AppHeader        style="dark"/>
        <Space className="SideMenuAndPageContent">
          <SideMenu></SideMenu>
          <PageContent></PageContent>
        </Space>
      </div>
      <AppFooter/>
    </>
  );
}
export default App;
