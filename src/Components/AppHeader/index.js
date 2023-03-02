import { Badge, Space, Image, Typography } from "antd";
import { BellFilled,  MailOutlined, LayoutTwoTone } from "@ant-design/icons";

function AppHeader() {
  return (
    <div className="AppHeader">
      
      <LayoutTwoTone style={{ fontSize: 24 }}/>

      
      
      <Typography.Title>Internal Issues</Typography.Title>
      <Space>
        <Badge count={10} dot>
          <MailOutlined style={{ fontSize: 24 }} />
        </Badge>
        <Badge count={20}>
          <BellFilled style={{ fontSize: 24 }} />
        </Badge>
      </Space>
    </div>
  );
}

export default AppHeader;
