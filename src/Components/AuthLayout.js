import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Outlet, useNavigate } from "react-router-dom";
import { getToken } from "../utils/appUtils";
import { Common } from "../utils/Common";

const AuthLayout = (props) => {
  Common.navigate = useNavigate();

  const [pageLoading, setPageLoading] = useState(true);
  useEffect(() => {
    // check token status
    let token = getToken();

    if (token) {
      Common.navigate("/");
    } else {
      setPageLoading(false);
    }
  }, []);

  return (
    <div className="">
      <div style={{ height: "calc(100vh - 50px)" }}>
        <Outlet />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  userToken: state.auth.userToken,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthLayout);
