import { Badge, Space, Image, Typography } from "antd";
import { BellFilled,  MailOutlined, LayoutTwoTone } from "@ant-design/icons";
import {GrTicket} from 'react-icons/gr'

function AppHeader() {
  return (
    <div className="AppHeader" style={{backgroundColor: "#2A52BE"}}>
      <GrTicket style={{ fontSize: 30 }}/>
      <Typography.Title style={{ color: "white" }}>Internal Issues</Typography.Title>
      <Space>
        
        <Badge count={20}>
          <BellFilled style={{ fontSize: 24, color: "white" }} />
        </Badge>
      </Space>
    </div>
  );
}

export default AppHeader;
