import { Badge, Space, Image, Typography } from "antd";
import { BellFilled,  MailOutlined } from "@ant-design/icons";

function AppHeader() {
  return (
    <div className="AppHeader">
      <Image
        width={40}
        src="C:\Users\zhadj\source\repos\bug-tracker-frontend\src\Images\Internal_Issues.png"
      ></Image>
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
