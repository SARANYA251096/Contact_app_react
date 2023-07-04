import axios from "axios";

export class ContactService {
  static serverUrl = `http://localhost:8000`;

  static getAllContacts() {
    let dataUrl = `${this.serverUrl}/contacts`;
    return axios.get(dataUrl);
  }

  static getContact(contactId) {
    let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
    return axios.get(dataUrl);
  }

  static createContact(contacts) {
    let dataUrl = `${this.serverUrl}/contacts`;
    return axios.post(dataUrl, contacts);
  }

  static updateContact(contacts, contactId) {
    let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
    return axios.put(dataUrl, contacts);
  }

  static deleteContact(contactId) {
    let dataUrl = `${this.serverUrl}/contacts/${contactId}`;
    return axios.delete(dataUrl);
  }
}