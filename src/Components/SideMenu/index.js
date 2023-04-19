import {Menu, Layout} from 'antd';
import {AppstoreOutlined, UserOutlined, ProjectOutlined, UsergroupDeleteOutlined, TabletOutlined} from '@ant-design/icons';
import { Common } from '../../utils/Common';

const { Sider } = Layout;


function SideMenu() {

    return (
      <div className="SideMenu" >         
        <Menu mode='inline' style={{ height:"100vh", backgroundImage: "linear-gradient(170deg,#2A52BE,#01D2FE)", color: "white"}}
          onClick={(item) => {
            //item.key
            Common.navigate(item.key);
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
                { label: "Create A Ticket", key:"TicketsCreate", key: '/Tickets/Create'},
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
                { label: "Create A Project", key:"Projects Create", key: '/ProjectsCreate'},
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