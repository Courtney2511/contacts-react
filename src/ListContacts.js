import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

// 1. The user enters text into the input field.
// 2. An event listener invokes the updateQuery() function on every onChange event.
// 3. updateQuery() then calls setState(), merging in the new state to update the component's internal state.
// 4. Because its state has changed, the ListContacts component re-renders.

class ListContacts extends Component {
  static propTypes = {
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }

  state = {
    query: ''
  }

  // is passed the query from the input and updates the state (the value of the input)
  updateQuery = (query) => {
    this.setState({ query: query.trim() })
  }

  render() {
    // object destructuring to allow for cleaner code
    const { contacts, onDeleteContact } = this.props
    const { query } = this.state

    let showingContacts

    if (query) {
      // escape special characters and ignore case
      const match = new RegExp(escapeRegExp(query), 'i')
      // filter the contacts array for contacts that 'match' the input
      showingContacts = contacts.filter((contact) => match.test(contact.name))
    } else {
      showingContacts = contacts
    }

    // sort showingContacts with sortBy helper
    showingContacts.sort(sortBy('name'))

    return (
      <div className='list-contacts'>
        <div className='list-contacts-top'>
          <input
            className='search-contacts'
            type='text'
            placeholder='Search Contacts'
            value={query}
            onChange={(event) => this.updateQuery(event.target.value)}
            ></input>
          <Link to="/create"
            className="add-contact"
          >Add Contact
        </Link>
        </div>
        <ol className='contact-list'>
          {showingContacts.map( (contact) =>
            <li key={contact.id} className='contact-list-item'>
              <div className='contact-avatar' style={{
                  backgroundImage: `url(${contact.avatarURL})`
                }}></div>
              <div className='contact-details'>
                <p>{contact.name}</p>
                <p>{contact.email}</p>
              </div>
              <button onClick={() => onDeleteContact(contact) } className='contact-remove'>Remove</button>
            </li>
          )}
        </ol>
      </div>

    )
  }
}

export default ListContacts
