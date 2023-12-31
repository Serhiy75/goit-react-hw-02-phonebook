import { FormContacts } from './FormContacts/FormContacts';
import { Component } from 'react';
import { ContactList } from './ContactList/ContactList';
import { FilterContact } from './FilterContact/FilterContact';
import css from './App.module.css';
export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  onDeleteContact = idContact => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(({ id }) => {
        return id !== idContact;
      }),
    }));
  };

  addContact = contact => {
    if (
      this.state.contacts.some(
        ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert(`${contact.name} name is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, contact],
      }));
    }
  };
  onFilterChange = evt => {
    const filterChange = evt.target.value;
    this.setState({ filter: filterChange });
  };
  render() {
    const filtered = this.state.contacts.filter(contact => {
      return contact.name
        .toLowerCase()
        .includes(this.state.filter.toLowerCase());
    });
    return (
      <div className={css.container}>
        <h1 className="">Phonebook</h1>
        <FormContacts addContact={this.addContact} />
        <h2>Contacts</h2>
        <FilterContact
          value={this.state.filter}
          onInputChange={this.onFilterChange}
        />
        <ContactList
          contacts={filtered}
          onDeleteContact={this.onDeleteContact}
        />
      </div>
    );
  }
}
