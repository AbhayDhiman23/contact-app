import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch contacts
  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/contacts`);
      setContacts(response.data);
    } catch (error) {
      setMessage('Error fetching contacts: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone) {
      setMessage('Please fill in all required fields');
      return;
    }

    try {
      if (editingId) {
        // Update contact
        await axios.put(`${API_BASE_URL}/contacts/${editingId}`, formData);
        setMessage('Contact updated successfully!');
        setEditingId(null);
      } else {
        // Create new contact
        await axios.post(`${API_BASE_URL}/contacts`, formData);
        setMessage('Contact added successfully!');
      }

      // Reset form
      setFormData({ name: '', email: '', phone: '', address: '' });
      fetchContacts();

      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error: ' + (error.response?.data?.message || error.message));
    }
  };

  // Handle edit
  const handleEdit = (contact) => {
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address,
    });
    setEditingId(contact._id);
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await axios.delete(`${API_BASE_URL}/contacts/${id}`);
        setMessage('Contact deleted successfully!');
        fetchContacts();
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error deleting contact: ' + error.message);
      }
    }
  };

  // Handle cancel edit
  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', email: '', phone: '', address: '' });
  };

  return (
    <div className="container">
      <header>
        <h1>📇 Contact Management App</h1>
        <p>Manage your contacts efficiently</p>
      </header>

      {message && (
        <div className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </div>
      )}

      <div className="form-container">
        <h2>{editingId ? 'Edit Contact' : 'Add New Contact'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Enter contact name"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email address"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="Enter phone number"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="Enter address (optional)"
            />
          </div>

          <button type="submit">
            {editingId ? 'Update Contact' : 'Add Contact'}
          </button>
          {editingId && (
            <button type="button" className="cancel" onClick={handleCancel}>
              Cancel
            </button>
          )}
        </form>
      </div>

      <div>
        <h2>Contacts ({contacts.length})</h2>
        {loading ? (
          <div className="loading">Loading contacts...</div>
        ) : contacts.length === 0 ? (
          <div className="empty-message">
            No contacts found. Add one to get started!
          </div>
        ) : (
          <div className="contacts-container">
            {contacts.map((contact) => (
              <div key={contact._id} className="contact-card">
                <h3>{contact.name}</h3>
                <div className="contact-info">
                  <strong>Email:</strong> {contact.email}
                </div>
                <div className="contact-info">
                  <strong>Phone:</strong> {contact.phone}
                </div>
                {contact.address && (
                  <div className="contact-info">
                    <strong>Address:</strong> {contact.address}
                  </div>
                )}
                <div className="contact-actions">
                  <button
                    className="edit"
                    onClick={() => handleEdit(contact)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete"
                    onClick={() => handleDelete(contact._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
