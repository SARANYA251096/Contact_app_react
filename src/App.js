import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./css/sb-admin-2.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./css/fontawesome-free/css/all.min.css";
import ContactLists from "./Contacts/ContactLists";
import AddContact from "./Contacts/AddContact";
import EditContact from "./Contacts/EditContact";
import ViewContact from "./Contacts/ViewContact";
import Spinner from "./Contacts/Spinner";

function App() {
  return (
    <BrowserRouter>
      {/* <Spinner /> */}
      <div id="wrapper">
        <Sidebar />
        <div id="content-wrapper" className="d-flexflex-column">
          <div id="content">
            <Topbar />
            <Routes>
              <Route path="/" element={<Navigate to={"contacts/list"} />} />
              <Route path="/contacts/list" element={<ContactLists />} />
              <Route path="/contacts/add" element={<AddContact />} />
              <Route
                path="/contacts/view/:contactId"
                element={<ViewContact />}
              />
              <Route
                path="/contacts/edit/:contactId"
                element={<EditContact />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
