import { useState } from 'react';
import './App.css';
import contactsData from './contacts.json';

function App() {
  const movieContacts = [...contactsData].splice(0, 5);
  const [contacts, setContacts] = useState(movieContacts);

  function addRandomContact() {
    // identify contacts not already used
    const remainingContacts = [...contactsData].filter(contact => {
      return !contacts.includes(contact);
    });
    // get a random contact
    const randomContact =
      remainingContacts[Math.floor(Math.random() * remainingContacts.length)];
    // create a new array with this new contact added
    const newContacts = contacts.concat(randomContact);
    // update state
    setContacts(newContacts);
  }

  function sortByName() {
    // create a new array of contacts sorted by name
    const contactsByName = [...contacts].sort((c1, c2) =>
      c1.name.toLowerCase() > c2.name.toLowerCase()
        ? 1
        : c1.name.toLowerCase() < c2.name.toLowerCase()
        ? -1
        : 0
    );
    // update state
    setContacts(contactsByName);
  }

  function sortByPopularity() {
    // create a new array of contacts sorted by popularity
    const contactsByPopularity = [...contacts].sort((c1, c2) =>
      c1.popularity < c2.popularity ? 1 : c1.popularity > c2.popularity ? -1 : 0
    );
    // update state
    setContacts(contactsByPopularity);
  }

  function deleteContact(chosenContact) {
    // created a new array without the contact chosen for deletion
    const updatedContacts = contacts.filter(contact => {
      return contact.id !== chosenContact;
    });

    // update state
    setContacts(updatedContacts);
  }

  return (
    <div className='App'>
      <h1>LAB | React IronContacts</h1>
      <button onClick={() => addRandomContact()}>Add Random Contact</button>
      <button onClick={() => sortByName()}>Sort By Name</button>
      <button onClick={() => sortByPopularity()}>Sort By Popularity</button>
      <table>
        <tr>
          <th>Picture</th>
          <th>Name</th>
          <th>Popularity</th>
          <th>Won an Oscar</th>
          <th>Won an Emmy</th>
        </tr>

        {contacts.map(contact => {
          return (
            <tr key={contact.id}>
              <td>
                <img src={contact.pictureUrl} alt='contact picture' />
              </td>
              <td>{contact.name}</td>
              <td>{contact.popularity.toFixed(2)}</td>
              {contact.wonOscar ? <td>🏆</td> : <td></td>}
              {contact.wonEmmy ? <td>🌟</td> : <td></td>}
              <td>
                <button onClick={() => deleteContact(contact.id)}>
                  Delete Contact
                </button>
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
}

export default App;
