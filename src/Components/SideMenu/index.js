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
                { label: "Companies Create", key:"Companies Create"},
                { label: "Companies Read",   key:"Companies Read",    key: '/Companies'},
                { label: "Companies Update", key:"Companies Update"},
                { label: "Companies Delete", key:"Companies Delete"},
              ],             
            },
            {
              label:"Projects",
              icon: <ProjectOutlined />,
              children:[
                { label: "Projects Create", key:"Projects Create"},
                { label: "Projects Read",   key:"Projects Read",    key: '/Projects'},
                { label: "Projects Update", key:"Projects Update"},
                { label: "Projects Delete", key:"Projects Delete"},
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