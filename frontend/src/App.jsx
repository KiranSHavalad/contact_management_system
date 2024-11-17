import React, { useEffect, useState } from 'react';
import './App.css';
function App() {
  const [contacts, setContacts] = useState([]);
  const [editIndex, setEditIndex] = useState(null); 
  const [editData, setEditData] = useState({}); 
  const [formData, setFormData] = useState({firstname: "",lastname: "",email: "",phone:"",company:"",jobtitle:""});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:8088/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const result = await response.json();
    if (response.ok) {
      console.log(result.message);
      fetchContacts();
    } else {
      console.error(result.error);
      if (result.error) {
        alert(result.error);
      }
    }
  };
  const fetchContacts = async () => {
    const response = await fetch('http://localhost:8088/contacts');
    const data = await response.json();
    const sortedContacts = data.sort((a, b) => {
      const nameA = a.firstname.toLowerCase();
      const nameB = b.firstname.toLowerCase();
      if (nameA < nameB) return -1;  
      if (nameA > nameB) return 1;  
      return 0;  
    });
    setContacts(sortedContacts);  
  };
  const handleEditChange = (e, index) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
    setContacts((prev) =>
      prev.map((contact, i) => (i === index ? { ...contact, [name]: value } : contact))
    );
  };
  const handleEditSubmit = async () => {
    const updatedData = { ...editData };
    const response = await fetch('http://localhost:8088/contact/update', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData), 
    });

    const result = await response.json();
    if (response.ok) {
      console.log('Update successful:', result);
      fetchContacts(); 
    } else {
      console.error('Error:', result.error);
    }
    setEditIndex(null); 
  };

  const handleDelete = async (contact) => {
    const response = await fetch('http://localhost:8088/contact/delete', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    const result = await response.json();
    if (response.ok) {
      console.log(result.message);
      fetchContacts();  
    } else {
      console.error(result.error);
      alert(result.error);
    }
  };

  useEffect(() => {
    fetchContacts();  
  }, []);

  return (
    <div>
      <h1>Add Contact</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required/>
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required/>
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required/>
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} required/>
        </div>
        <div>
          <label>Company:</label>
          <input type="text" name="company" value={formData.company} onChange={handleChange} required/>
        </div>
        <div>
          <label>Job Title:</label>
          <input type="text" name="jobtitle" value={formData.jobtitle} onChange={handleChange} required/>
        </div>
        <button type="submit">Add Contact</button>
      </form>
      <h1>Contact List</h1>
      <table border="1">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Company</th>
            <th>Job Title</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact, index) => (
            <tr key={index}>
              {editIndex === index ? (
                <>
                  <td><input type="text" name="firstname" value={editData.firstname || contact.firstname} onChange={(e) => handleEditChange(e, index)} /></td>
                  <td><input type="text" name="lastname" value={editData.lastname || contact.lastname} onChange={(e) => handleEditChange(e, index)} /></td>
                  <td><input type="email" name="email" value={editData.email || contact.email} onChange={(e) => handleEditChange(e, index)} /></td>
                  <td><input type="text" name="phone" value={editData.phone || contact.phone} onChange={(e) => handleEditChange(e, index)} /></td>
                  <td><input type="text" name="company" value={editData.company || contact.company} onChange={(e) => handleEditChange(e, index)} /></td>
                  <td><input type="text" name="jobtitle" value={editData.jobtitle || contact.jobtitle} onChange={(e) => handleEditChange(e, index)} /></td>
                  <td>
                    <button onClick={handleEditSubmit}>Save</button>
                    <button onClick={() => setEditIndex(null)}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{contact.firstname}</td>
                  <td>{contact.lastname}</td>
                  <td>{contact.email}</td>
                  <td>{contact.phone}</td>
                  <td>{contact.company}</td>
                  <td>{contact.jobtitle}</td>
                  <td>
                    <button onClick={() => { setEditIndex(index); setEditData(contact); }}>Edit</button>
                    <button onClick={() => handleDelete(contact)}>Delete</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default App;
