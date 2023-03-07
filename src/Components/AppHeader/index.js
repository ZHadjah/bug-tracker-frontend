import { Badge, Space, Image, Typography } from "antd";
import { BellFilled,  MailOutlined, LayoutTwoTone } from "@ant-design/icons";

function AppHeader() {
  return (
    <div className="AppHeader" style={{backgroundColor: "#2A52BE"}}>
      
      <LayoutTwoTone style={{ fontSize: 24 }}/>

            
      <Typography.Title style={{ color: "white" }}>Internal Issues</Typography.Title>
      <Space>
        <Badge count={10} dot>
          <MailOutlined style={{ fontSize: 24, color: "white" }} />
        </Badge>
        <Badge count={20}>
          <BellFilled style={{ fontSize: 24, color: "white" }} />
        </Badge>
      </Space>
    </div>
  );
}

export default AppHeader;
