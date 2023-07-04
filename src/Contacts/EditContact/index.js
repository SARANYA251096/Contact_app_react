import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactService } from "../../services/ContactService";


const EditContact = () => {
  const { contactId } = useParams();
  const navigate = useNavigate();
  let [state, setState] = useState({
    loading: false,
    contacts: {
      name: "",
      photo: "",
      email: "",
      mobile: "",
      company: "",
      title: "",
    },
    errorMessage: "",
  });
  

useEffect(() => {
  const fetchData = async () => {
    try {
      setState({ ...state, loading: true });
      
      const response = await ContactService.getContact(contactId);
    
      const contact = response.data;
      
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
  
  let updateInput = (event) => {
    setState({
      ...state,
      contacts: {
        ...state.contacts,
        [event.target.name]: event.target.value,
      },
    });
  };

let submitForm = async (event) => {
  event.preventDefault();

  try {
    let response = await ContactService.updateContact(state.contacts,contactId);
    if (response) {
      navigate("/contacts/list", { replace: true });
    }
  } catch (error) {
    setState({
      ...state,
      errorMessage: error.message,
    });
    navigate(`/contacts/edit/${contactId}`, { replace: false });
  }
};

let { loading, contacts, errorMessage } = state;

  return (
    <section className="add-contact p-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="h4 text-primary fw-bold">Edit Contact</p>
            <p className="fst-italic">
              Edit your contact here for any changes:
            </p>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col-md-4">
            <form onSubmit={submitForm}>
              <div className="mb-2">
                <input
                  type="text"
                  name="name"
                  required="true"
                  value={contacts.name}
                  onChange={updateInput}
                  className="form-control"
                  placeholder="Name"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name="photo"
                  required="true"
                  value={contacts.photo}
                  onChange={updateInput}
                  className="form-control"
                  placeholder="Image Url"
                />
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  name="mobile"
                  required="true"
                  value={contacts.mobile}
                  onChange={updateInput}
                  className="form-control"
                  placeholder="Mobile Number"
                />
              </div>
              <div className="mb-2">
                <input
                  type="email"
                  name="email"
                  required="true"
                  value={contacts.email}
                  onChange={updateInput}
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name="company"
                  required="true"
                  value={contacts.company}
                  onChange={updateInput}
                  className="form-control"
                  placeholder="Company"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name="title"
                  required="true"
                  value={contacts.title}
                  onChange={updateInput}
                  className="form-control"
                  placeholder="Title"
                />
              </div>

              <div className="mb-2">
                <input
                  type="submit"
                  className="btn btn-primary"
                  value={"Update"}
                />
                <Link to={"/contacts/list"} className="btn btn-dark ms-2">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <img
              src={contacts.photo}
              alt="img"
              className="img-fluid contact-img"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditContact;
