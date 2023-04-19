import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getToken } from "../utils/appUtils";
import { Common } from "../utils/Common";
import AppHeader from "./AppHeader";
import { Space } from "antd";
import SideMenu from "./SideMenu";
import AppFooter from "./AppFooter";

const MainLayout = (props) => {
  Common.navigate = useNavigate();

  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    // check token status
    let token = getToken();
    if (token) {
      setPageLoading(false);
    } else {
      Common.navigate("/auth/Login");
    }
  }, []);

  return (
    <div className="">
        <div style={{ height: "calc(100vh - 50px)" }}>
          <AppHeader />
          <Space className="SideMenuAndPageContent">
            <SideMenu></SideMenu>
            <Outlet />
          </Space>
        </div>
        <AppFooter />
      </div>
  );
};

const mapStateToProps = (state) => ({
  userToken: state.auth.userToken,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MainLayout);
