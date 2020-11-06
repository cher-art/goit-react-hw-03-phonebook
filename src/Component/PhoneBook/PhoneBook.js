import React, { Component } from 'react';
import Form from '../Form/Form';
import ContactList from '../ContactList/ContactList';
import { v4 as uuidv4 } from 'uuid';
import Filter from '../Filter/Filter'
import styles from './PhoneBook.module.css'

// const arr = [{name: "Alex", gjhcz:"fgdgdf"},{name: "Alex", gjhcz:"fgdgdf"},{name: "Alex", gjhcz:"fgdgdf"}]
// const result = arr.some(item=> item.name.includes());
// !result ? this.setState({}): alert()

class PhoneBook extends Component {
  state = {
    contacts: [],
    filter: '',
    name: '',
    isError: false
    // number: '',
  };

  componentDidMount() {
    const persistedTasks = localStorage.getItem('contacts')
    if(persistedTasks){
      this.setState({
        contacts: JSON.parse(persistedTasks)
      })
    }
  }
  
  componentDidUpdate(prevProps, prevState){
    if(prevState.contacts !== this.state.contacts){
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
    }
  }


  addContact = (contact) => {
    console.log(contact);
    const arr = this.state.contacts
    const result = arr.some(item => item.name.includes(contact.name))
    !result ? this.setState(prev => ({
      contacts: [...prev.contacts, { ...contact, id: uuidv4() }],
    })) : alert('This contact has already been added!')
   };

  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };

  filterContact = () => {
    return this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase()),
    );
  };

  onHandleChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

//Добавление функции замены ключа isError в state//

  onSetError = () => {
    this.setState(prev=>({isError: !prev.isError}))
  }
  render() {
    const {isError} = this.state;
    return (
      <>
        <h1 className="title">PhoneBook</h1>
        <Form addContact={this.addContact} isError={this.state.isError} onSetError={this.onSetError}/>
        <h2 className="title">Contacts</h2>
        {isError && <h2 className={styles.contactListErr}>Name or Contact is not found!!!</h2>}
        <Filter
          filter={this.state.filter}
          onHandleChange={this.onHandleChange}
        />

        <ContactList
          contacts={this.state.filter ? this.filterContact():this.state.contacts}
          deleteContact={this.deleteContact}
        />
      </>
    );
  }
}

export default PhoneBook;