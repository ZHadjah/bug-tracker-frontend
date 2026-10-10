import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  FaBuilding,
  FaFolderOpen,
  FaProjectDiagram,
  FaTicketAlt,
  FaThLarge,
  FaUser,
} from "react-icons/fa";

const navigationGroups = [
  {
    id: "tickets",
    label: "Tickets",
    icon: FaTicketAlt,
    links: [
      { label: "Create A Ticket", to: "/Tickets/Create" },
      { label: "View All Tickets", to: "/Tickets" },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    icon: FaProjectDiagram,
    links: [
      { label: "Create A Project", to: "/Projects/Create" },
      { label: "View All Projects", to: "/Projects" },
    ],
  },
];

function SideMenu({ open, onClose }) {
  const { pathname } = useLocation();
  const [openGroups, setOpenGroups] = useState(() => ({
    tickets: pathname.startsWith("/Tickets"),
    projects: pathname.startsWith("/Projects"),
  }));
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 767.98px)").matches
  );
  const sidebarRef = useRef(null);
  const previousFocusRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767.98px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const activeGroup = navigationGroups.find((group) =>
      group.links.some((link) => link.to === pathname)
    );

    if (activeGroup) {
      setOpenGroups((current) => ({ ...current, [activeGroup.id]: true }));
    }
  }, [pathname]);

  useEffect(() => {
    if (!isMobile || !open) return undefined;

    previousFocusRef.current = document.activeElement;
    const panel = sidebarRef.current;
    const focusableElements = panel?.querySelectorAll(
      'button:not([disabled]), a[href]:not([tabindex="-1"])'
    );
    focusableElements?.[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "Tab" && focusableElements?.length) {
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleKeyDown);
      previousFocusRef.current?.focus();
    };
  }, [isMobile, onClose, open]);

  function toggleGroup(groupId) {
    setOpenGroups((current) => ({ ...current, [groupId]: !current[groupId] }));
  }

  const linkClassName = ({ isActive }) =>
    `nav-link d-flex align-items-center gap-3 rounded ${
      isActive ? "active fw-semibold" : ""
    }`;

  return (
    <>
      {isMobile && open && (
        <button
          type="button"
          className="sidebar-backdrop"
          aria-label="Close navigation menu"
          onClick={onClose}
        />
      )}
      <aside
        id="main-sidebar"
        ref={sidebarRef}
        className={`SideMenu ${isMobile ? "sidebar-mobile" : ""} ${
          open ? "is-open" : ""
        }`}
        aria-hidden={isMobile && !open}
        role={isMobile ? "dialog" : undefined}
        aria-modal={isMobile ? "true" : undefined}
        aria-labelledby="sidebar-heading"
      >
        <div className="sidebar-heading d-md-none">
          <h2 id="sidebar-heading" className="h5 mb-0">Main navigation</h2>
          <button
            type="button"
            className="btn-close btn-close-white"
            aria-label="Close navigation menu"
            onClick={onClose}
          />
        </div>
        <nav className="sidebar-nav" aria-label="Main navigation">
          <ul className="nav nav-pills flex-column gap-1">
            <li className="nav-item">
              <NavLink to="/" end className={linkClassName} onClick={onClose}>
                <FaThLarge aria-hidden="true" />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/Companies" className={linkClassName} onClick={onClose}>
                <FaBuilding aria-hidden="true" />
                <span>View All Companies</span>
              </NavLink>
            </li>
            {navigationGroups.map((group) => {
              const GroupIcon = group.icon;
              const expanded = Boolean(openGroups[group.id]);

              return (
                <li className="nav-item" key={group.id}>
                  <button
                    type="button"
                    className="nav-link sidebar-group-link d-flex align-items-center gap-3 rounded w-100"
                    aria-expanded={expanded}
                    aria-controls={`${group.id}-links`}
                    onClick={() => toggleGroup(group.id)}
                  >
                    <GroupIcon aria-hidden="true" />
                    <span className="flex-grow-1 text-start">{group.label}</span>
                    <span className="visually-hidden"> sidebar dropdown menu</span>
                    <span aria-hidden="true">{expanded ? "▾" : "▸"}</span>
                  </button>
                  {expanded && (
                    <ul id={`${group.id}-links`} className="nav flex-column sidebar-subnav">
                      {group.links.map((link) => (
                        <li className="nav-item" key={link.to}>
                          <NavLink
                            to={link.to}
                            end
                            className={({ isActive }) =>
                              `nav-link d-flex align-items-center gap-2 rounded ${
                                isActive ? "active fw-semibold" : ""
                              }`
                            }
                            onClick={onClose}
                          >
                            <FaFolderOpen aria-hidden="true" />
                            <span>{link.label}</span>
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
            <li className="nav-item">
              <NavLink to="/Users" className={linkClassName} onClick={onClose}>
                <FaUser aria-hidden="true" />
                <span>Manage Users</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default SideMenu;
