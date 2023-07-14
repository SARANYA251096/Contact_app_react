import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ContactService } from "../../services/ContactService";
import Spinner from "../Spinner";

const ContactLists = () => {
  const [state, setState] = useState({
    loading: false,
    contacts: [],
    errorMessage: "",
  });
 const fetchData = async () => {
   try {
     setState({ ...state, loading: true });
     const contacts = await ContactService.getAllContacts();
     setState({
       ...state,
       loading: false,
       contacts: contacts,
     });
   } catch (error) {
     setState({
       ...state,
       loading: false,
       errorMessage: error.message,
     });
   }
 };
  useEffect(() => {
   
    fetchData();
  }, []);

  const clickDelete = async (contactId) => {
    try {
      await ContactService.deleteContact(contactId);
      fetchData();
    } catch (error) {
      setState({
        ...state,
        errorMessage: error.message,
      });
    }
  };

  const { loading, contacts, errorMessage } = state;

  if (loading) {
    return <Spinner />;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <React.Fragment>
      <section className="contact-list">
        <div className="container">
          <div className="row">
            <div className="col-md-12 ms-3 p-3">
              <Link to={"/contacts/add"} className="btn btn-primary flex-end">
                Create New Contact
              </Link>
            </div>
            {contacts.length > 0 &&
              contacts.map((contact) => (
                <div className="col-md-6" key={contact.id}>
                  <div className="card my-2">
                    <div className="card-body">
                      <div className="row align-items-center d-flex justify-content-around">
                        <div className="col-md-4">
                          <img
                            src={contact.photo}
                            alt="user-img"
                            className="img-fluid contact-img"
                          />
                        </div>
                        <div className="col-md-7">
                          <ul className="list-group">
                            <li className="list-group-item list-group-item-action">
                              Name:
                              <span className="fw-bold">{contact.name}</span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                              Mobile:
                              <span className="fw-bold">{contact.mobile}</span>
                            </li>
                            <li className="list-group-item list-group-item-action">
                              Email:
                              <span className="fw-bold">{contact.email}</span>
                            </li>
                          </ul>
                        </div>
                        <div className="col-md-1 d-flex flex-column align-items-center">
                          <Link
                            to={`/contacts/view/${contact.id}`}
                            className="btn btn-warning my-2"
                          >
                            <i className="fa fa-eye" />
                          </Link>
                          <Link
                            to={`/contacts/edit/${contact.id}`}
                            className="btn btn-primary my-2"
                          >
                            <i className="fa fa-pen" />
                          </Link>
                          <button
                            className="btn btn-danger"
                            onClick={() => clickDelete(contact.id)}
                          >
                            <i className="fa fa-trash" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ContactLists;
