import React from 'react';
import styles from './ContactList.module.css'
const ContactList = ({contacts, deleteContact}) => {

  return (
    <ul>
      {contacts.map(contact => 
        <li className={styles.contactList} key={contact.id}>{contact.name}: {contact.number}
          <button className={styles.contactBtn} onClick={()=>deleteContact(contact.id)} type="button">Delete</button>
        </li>)
      }
    </ul>
  );
};

export default ContactList;