import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ContactService } from '../../services/ContactService';

const AddContact = () => {
  const navigate = useNavigate();
  
  let [state, setState] = useState({
    loading: false,
    contacts: {
      name:'',
      photo: '',
      email: '',
      mobile: '',
      company: '',
      title:''

    },
    errorMessage: "",
  });

  let updateInput = (event) => {
    setState({
      ...state,
      contacts: {
        ...state.contacts,
        [event.target.name]: event.target.value
      }
    });
  };

  let submitForm = async (event) => {
    event.preventDefault();

    try {
      let response = await ContactService.createContact(state.contacts);
      if (response) {
        navigate('/contacts/list', { replace: true });
      }
    } catch (error) {
      setState({
        ...state,
        errorMessage: error.message
      });
      navigate('/contacts/add', { replace: false })
    }
  };

  let {loading,contacts,errorMessage } = state;

  return (
    <section className="add-contact p-3">
      <div className="container">
        <div className="row">
          <div className="col">
            <p className="h4 text-success fw-bold">Create Contact</p>
            <p className="fst-italic">Create a new contact here:</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <form onSubmit={submitForm}>
              <div className="mb-2">
                <input
                  type="text"
                  name="name"
                  value={contacts.name}
                  onChange={updateInput}
                  required="true"
                  className="form-control"
                  placeholder="Name"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name="photo"
                  value={contacts.photo}
                  onChange={updateInput}
                  required="true"
                  className="form-control"
                  placeholder="Image Url"
                />
              </div>
              <div className="mb-2">
                <input
                  type="number"
                  name="mobile"
                  value={contacts.mobile}
                  onChange={updateInput}
                  required="true"
                  className="form-control"
                  placeholder="Mobile Number"
                />
              </div>
              <div className="mb-2">
                <input
                  type="email"
                  name="email"
                  value={contacts.email}
                  onChange={updateInput}
                  required="true"
                  className="form-control"
                  placeholder="Email"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name="company"
                  value={contacts.company}
                  onChange={updateInput}
                  required="true"
                  className="form-control"
                  placeholder="Company"
                />
              </div>
              <div className="mb-2">
                <input
                  type="text"
                  name="title"
                  value={contacts.title}
                  onChange={updateInput}
                  required="true"
                  className="form-control"
                  placeholder="Title"
                />
              </div>

              <div className="mb-2">
                <input
                  type="submit"
                  className="btn btn-success"
                  value={"Create"}
                />
                <Link to={"contacts/list"} className="btn btn-dark ms-2">
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AddContact