import {Menu} from 'antd';
import {AppstoreOutlined, UserOutlined, ProjectOutlined, UsergroupDeleteOutlined, TabletOutlined} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'

function SideMenu() {
  const navigate = useNavigate();
    return (
      <div className="SideMenu">
        <Menu 
          onClick={(item) => {
            //item.key
            navigate(item.key);
          }}
          items={[
            {
              label:"Dashboard",
              icon: <AppstoreOutlined />,
              key: '/'
            },
            {
              label:"Tickets",
              icon: <TabletOutlined />,
              children:[
                { label: "Create A Ticket", key:"Tickets Create"},
                { label: "View All Tickets",   key:"Tickets Read",    key: '/Tickets'},
              ],
            },
            {
              label:"Companies",
              icon: <UsergroupDeleteOutlined />,
              children:[
                { label: "Create A Company", key:"Companies Create"},
                { label: "View All Companies",   key:"Companies Read",    key: '/Companies'},
              ],             
            },
            {
              label:"Projects",
              icon: <ProjectOutlined />,
              children:[
                { label: "Create A Project", key:"Projects Create"},
                { label: "View All Projects",   key:"Projects Read",    key: '/Projects'},
              ], 
            },
            {
              label:"Users",
              icon: <UserOutlined />,
              children:[
                { label: "Manage Users",   key: '/Users'},
              ],          
            }
          ]}>
        </Menu>
      </div>
    )
  }
  export default SideMenu;