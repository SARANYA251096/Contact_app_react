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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        const response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
        });
      } catch (error) {
        setState({
          ...state,
          loading: false,
          errorMessage: error.message,
        });
      }
    };
    fetchData();
  }, []);

  let clickDelete = async (contactId) => {
    try {
      let response = await ContactService.deleteContact(contactId);
      if (response) {
        setState({ ...state, loading: true });
        const response = await ContactService.getAllContacts();
        setState({
          ...state,
          loading: false,
          contacts: response.data,
        });
      }
    } catch (error) {
       setState({
         ...state,
         loading: false,
         errorMessage: error.message,
       });
    }
  }

  const { loading, contacts, errorMessage } = state;

  if (loading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <>
      {loading ? (
        <Spinner/>
      ) : (
        <React.Fragment>
          <section className="contact-list">
            <div className="container">
              <div className="row">
                <div className="col-md-12 ms-3 p-3">
                  <Link
                    to={"/contacts/add"}
                    className="btn btn-primary flex-end "
                  >
                    Create New Contact
                  </Link>
                </div>
                {contacts.length > 0 &&
                  contacts.map((contacts) => {
                    return (
                      <div className="col-md-6" key={contacts.id}>
                        <div className="card my-2">
                          <div className="card-body">
                            <div className="row align-items-center d-flex justify-content-around">
                              <div className="col-md-4">
                                <img
                                  src={contacts.photo}
                                  alt="user-img"
                                  className="img-fluid contact-img"
                                />
                              </div>
                              <div className="col-md-7">
                                <ul className="list-group">
                                  <li className="list-group-item list-group-item-action">
                                    Name:
                                    <span className="fw-bold">
                                      {contacts.name}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Mobile:
                                    <span className="fw-bold">
                                      {contacts.mobile}
                                    </span>
                                  </li>
                                  <li className="list-group-item list-group-item-action">
                                    Email:
                                    <span className="fw-bold">
                                      {contacts.email}
                                    </span>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-md-1 d-flex flex-column align-items-center">
                                <Link
                                  to={`/contacts/view/${contacts.id}`}
                                  className="btn btn-warning my-2"
                                >
                                  <i className="fa fa-eye" />
                                </Link>
                                <Link
                                  to={`/contacts/edit/${contacts.id}`}
                                  className="btn btn-primary my-2"
                                >
                                  <i className="fa fa-pen" />
                                </Link>
                                <button className="btn btn-danger" onClick={()=>clickDelete(contacts.id)}>
                                  <i className="fa fa-trash" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </section>
        </React.Fragment>
      )}
    </>
  );
};
export default ContactLists;
