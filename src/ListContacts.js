import React from 'react'

class ListContacts extends React.Component {
  // render is the ONLY required property of a component class
  render() {
    return (
      <ol className='contact-list'>
        {this.props.contacts.map( (contact) =>
          <li key='contact.id'>
            {contact.name}
          </li>
        )}
      </ol>
    )
  }
}

export default ListContacts
