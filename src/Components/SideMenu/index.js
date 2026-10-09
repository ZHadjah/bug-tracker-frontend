import { useEffect, useRef } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  UserOutlined,
  ProjectOutlined,
  UsergroupDeleteOutlined,
  TabletOutlined,
} from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import { Common } from "../../utils/Common";

function SideMenu() {
  const { pathname } = useLocation();
  const menuContainerRef = useRef(null);
  const openKeys = [
    pathname.startsWith("/Tickets") ? "tickets" : null,
    pathname.startsWith("/Projects") ? "projects" : null,
    pathname.startsWith("/Users") ? "users" : null,
  ].filter(Boolean);

  useEffect(() => {
    const menuContainer = menuContainerRef.current;
    if (!menuContainer) return undefined;

    const makeMenuItemsTabbable = () => {
      menuContainer
        .querySelectorAll(".ant-menu-item, .ant-menu-submenu-title")
        .forEach((item) => {
          if (item.getAttribute("tabindex") !== "0") {
            item.setAttribute("tabindex", "0");
          }
        });
    };

    makeMenuItemsTabbable();

    const observer = new MutationObserver(makeMenuItemsTabbable);
    observer.observe(menuContainer, {
      attributes: true,
      attributeFilter: ["tabindex"],
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="SideMenu" aria-label="Main navigation">
      <div ref={menuContainerRef}>
        <Menu
          mode="inline"
          selectedKeys={[pathname]}
          defaultOpenKeys={openKeys}
          style={{
            height: "100vh",
            backgroundImage: "linear-gradient(170deg,#2A52BE,#01D2FE)",
            color: "white",
          }}
          onClick={({ key }) => {
            if (key.startsWith("/")) {
              Common.navigate(key);
            }
          }}
          items={[
            {
              label: "Dashboard",
              icon: <AppstoreOutlined aria-hidden="true" />,
              key: "/",
            },
            {
              label: "View All Companies",
              icon: <UsergroupDeleteOutlined aria-hidden="true" />,
              key: "/Companies",
            },
            {
              label: "Tickets",
              icon: <TabletOutlined aria-hidden="true" />,
              key: "tickets",
              children: [
                { label: "Create A Ticket", key: "/Tickets/Create" },
                { label: "View All Tickets", key: "/Tickets" },
              ],
            },
            {
              label: "Projects",
              icon: <ProjectOutlined aria-hidden="true" />,
              key: "projects",
              children: [
                { label: "Create A Project", key: "/Projects/Create" },
                { label: "View All Projects", key: "/Projects" },
              ],
            },
            {
              label: "Users",
              icon: <UserOutlined aria-hidden="true" />,
              key: "users",
              children: [{ label: "Manage Users", key: "/Users" }],
            },
          ]}
        />
      </div>
    </nav>
  );
}

export default SideMenu;
