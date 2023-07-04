import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ContactService } from "../../services/ContactService";
import Spinner from "../Spinner";

const ViewContact = () => {
  const { contactId } = useParams();

  let [state, setState] = useState({
    loading: false,
    contacts: {},
    errorMessage: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        // console.log("contactId:", contactId);
        const response = await ContactService.getContact(contactId);
        // console.log("response:", response);
        const contact = response.data;
        // console.log("contact:", contact);
        setState({
          ...state,
          loading: false,
          contacts: contact ? contact : {},
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
  }, [contactId]);

  let { loading, contacts, errorMessage } = state;

  // console.log("state:", state);
  return (
    <>
      <section className="view-contact-intro p-3">
        <div className="container">
          <div className="row">
            <div className="col">
              <p className="h3 text-warning fw-bold">View Contact</p>
              <p className="fst-italic">View contact details here:</p>
            </div>
          </div>
        </div>
      </section>
      {loading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          {Object.keys(contacts).length > 0 && (
            <section className="view-contact mt-3">
              <div className="container">
                <div className="row">
                  <div className="col-md-4">
                    <img
                      src={contacts.photo}
                      alt="img"
                      className="img-flucontactId contact-img ms-5"
                    />
                  </div>
                  <div className="col-md-8">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-action">
                        Name:<span className="fw-bold">{contacts.name}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Mobile:
                        <span className="fw-bold">{contacts.mobile}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Email:<span className="fw-bold">{contacts.email}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Company:
                        <span className="fw-bold">{contacts.company}</span>
                      </li>
                      <li className="list-group-item list-group-item-action">
                        Title:<span className="fw-bold">{contacts.title}</span>
                      </li>
                      
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Link to={"/contacts/list"} className="btn btn-warning">
                      Back
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </React.Fragment>
      )}
    </>
  );
};

export default ViewContact;
