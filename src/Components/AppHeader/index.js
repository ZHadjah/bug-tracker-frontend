import { useEffect, useState } from "react";
import { GrTicket } from "react-icons/gr";
import { FaBell } from "react-icons/fa";
import { clearToken } from "../../utils/appUtils";
import { Common } from "../../utils/Common";

function AppHeader() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const notificationCount = 20;

  const onLogout = () => {
    clearToken();
    Common.navigate("/auth/Login");
  };

  useEffect(() => {
    if (!notificationsOpen) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setNotificationsOpen(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [notificationsOpen]);

  return (
    <header className="AppHeader navbar navbar-dark" style={{ backgroundColor: "#2A52BE" }}>
      <div className="d-flex align-items-center gap-2">
        <GrTicket aria-hidden="true" focusable="false" style={{ fontSize: 30, color: "white" }} />
        <h1 className="h4 mb-0 text-white">Internal Issues</h1>
      </div>
      <div className="d-flex align-items-center gap-3">
        <button className="btn btn-light" type="button" onClick={onLogout}>
          Logout
        </button>
        <div className="position-relative">
          <button
            type="button"
            className="btn btn-link text-white position-relative p-2"
            aria-label={`Notifications, ${notificationCount} unread`}
            aria-expanded={notificationsOpen}
            aria-controls="notifications-panel"
            onClick={() => setNotificationsOpen((open) => !open)}
          >
            <FaBell aria-hidden="true" focusable="false" style={{ fontSize: 24 }} />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {notificationCount}
              <span className="visually-hidden">unread notifications</span>
            </span>
          </button>
          {notificationsOpen && (
            <section
              id="notifications-panel"
              className="position-absolute end-0 mt-2 p-3 bg-white text-dark border rounded shadow"
              style={{ width: "min(20rem, 90vw)", zIndex: 1050 }}
              aria-labelledby="notifications-heading"
            >
              <div className="d-flex align-items-center justify-content-between gap-3">
                <h2 id="notifications-heading" className="h6 mb-0">Notifications</h2>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close notifications"
                  onClick={() => setNotificationsOpen(false)}
                />
              </div>
              <p className="mt-3 mb-0" role="status">
                You have {notificationCount} unread notifications. Notification details are not available yet.
              </p>
            </section>
          )}
          <span className="visually-hidden" aria-live="polite">
            {notificationsOpen ? "Notifications opened." : ""}
          </span>
        </div>
      </div>
    </header>
  );
}

export default AppHeader;
