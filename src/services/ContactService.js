import axios from "axios";

export class ContactService {
  // Retrieve all contacts
  static getAllContacts() {
    // Make a GET request to the '/db.json' file and retrieve the 'contacts' data
    return axios.get("/db.json").then((response) => response.data.contacts);
  }

  // Retrieve a specific contact by ID
  static getContact(contactId) {
    // Make a GET request to the '/db.json/contacts/{contactId}' endpoint and retrieve the contact data
    return axios
      .get(`/db.json/contacts/${contactId}`)
      .then((response) => response.data);
  }

  // Create a new contact
  static createContact(contact) {
    // Make a POST request to the '/db.json/contacts' endpoint with the new contact data
    return axios
      .post("/db.json/contacts", contact)
      .then((response) => response.data);
  }

  // Update an existing contact
  static updateContact(contact, contactId) {
    // Make a PUT request to the '/db.json/contacts/{contactId}' endpoint with the updated contact data
    return axios
      .put(`/db.json/contacts/${contactId}`, contact)
      .then((response) => response.data);
  }

  // Delete a contact
  static deleteContact(contactId) {
    // Make a DELETE request to the '/db.json/contacts/{contactId}' endpoint
    return axios
      .delete(`/db.json/contacts/${contactId}`)
      .then((response) => response.data);
  }
}
