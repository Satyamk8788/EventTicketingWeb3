import React from 'react';
import { useState } from 'react';

function ProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = () => {
    console.log('Form submitted');
  }

  return (
    <div>
      <h1>Profile Page</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(event) => setEmail(event.target.value)} />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" value={phoneNumber} onChange={(event) => setPhoneNumber(event.target.value)} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ProfilePage;