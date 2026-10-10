import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getToken } from "../utils/appUtils";
import { Common } from "../utils/Common";
import AppHeader from "./AppHeader";
import SideMenu from "./SideMenu";
import AppFooter from "./AppFooter";

const MainLayout = (props) => {
  Common.navigate = useNavigate();
  const { pathname } = useLocation();

  const [pageLoading, setPageLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  useEffect(() => {
    // check token status
    let token = getToken();
    if (token) {
      setPageLoading(false);
    } else {
      Common.navigate("/auth/Login");
    }
  }, []);

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <div className="app-shell">
      <AppHeader
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((open) => !open)}
      />
      <div className="SideMenuAndPageContent">
        <SideMenu
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <main id="main-content" tabIndex="-1">
          <Outlet />
        </main>
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
