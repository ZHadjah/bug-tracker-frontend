import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../../Components/Dashboard";
import TicketsRead from "../../Views/Tickets/TicketsRead";
import CompaniesRead from "../../Views/Companies/CompaniesRead";
import ProjectsRead from "../../Views/Projects/ProjectsRead";
import ManageUserRoles from "../../Views/UserRoles/ManageUserRoles";
import TicketsCreate from "../../Views/Tickets/TicketsCreate";
import ProjectsCreate from "../../Views/Projects/ProjectsCreate";
import Login from "../../Components/Login";
import Register from "../../Components/Register";
import MainLayout from "../MainLayout";
import AuthLayout from "../AuthLayout";

function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route index path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/Tickets" element={<TicketsRead />}></Route>
            <Route path="/Tickets/Create" element={<TicketsCreate />}></Route>

            <Route path="/Projects" element={<ProjectsRead />}></Route>
            <Route path="/Projects/Create" element={<ProjectsCreate />}></Route>

            <Route path="/Companies" element={<CompaniesRead />}></Route>

            <Route path="/Users" element={<ManageUserRoles />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default AppRoutes;
