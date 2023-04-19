import { Badge, Space, Image, Typography } from "antd";
import { BellFilled,  MailOutlined, LayoutTwoTone } from "@ant-design/icons";
import {GrTicket} from 'react-icons/gr'
import { Button } from "@mui/material";
import { clearToken } from "../../utils/appUtils";
import { Common } from "../../utils/Common";

function AppHeader() {

  const onLogout = () => {
    clearToken();
    Common.navigate('/auth/Login');
  }
  return (
    <div className="AppHeader" style={{backgroundColor: "#2A52BE"}}>
      <GrTicket style={{ fontSize: 30 }}/>
      <Typography.Title style={{ color: "white" }}>Internal Issues</Typography.Title>

      <Button onClick={() => onLogout()}>Logout</Button>
      <Space>
        
        <Badge count={20}>
          <BellFilled style={{ fontSize: 24, color: "white" }} />
        </Badge>
      </Space>
    </div>
  );
}

export default AppHeader;
