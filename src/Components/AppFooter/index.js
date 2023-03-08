import { Typography } from "antd";

function AppFooter() {
  return (
    <div className="AppFooter" style={{ color: "white", backgroundColor: "#03C9F9", borderTop:"none" }} >
      <Typography.Link href="https://github.com/ZHadjah" style={{ color: "white",  textDecoration: 'underline' }} >
        Github
      </Typography.Link>
      <Typography.Link href="https://zachhadjah.netlify.app" style={{ color: "white", textDecoration: 'underline' }} >
        Portfolio Page
      </Typography.Link>      
    </div>
  )
}
export default AppFooter