import React from 'react';

export class NewUserArea extends React.Component {

  constructor() {
    super();
    this.state = {  
      newUser: {
        id: '', 
        firstName: '', 
        lastName: '', 
        email: '', 
        phone: '', 
      }
    }
  }

  closeInputArea = () => {
    this.setState({ 
      newUser: {
        id: '', 
        firstName: '', 
        lastName: '', 
        email: '', 
        phone: '', 
      }
    })
    this.props.toggleInputArea()
  }

  addUser = () => {
    if((this.state.newUser.id) && (this.state.newUser.firstName) &&  (this.state.newUser.lastName) &&  (this.state.newUser.email) &&  (this.state.newUser.phone)) {
      this.props.addUser(this.state.newUser)
      this.closeInputArea()
    } else {
      alert('Введите данные пользователя')
    }
  }

  changeValueId = e => {
    let signs = this.state.newUser
    signs.id = e.target.value
    this.setState({ newUser: signs })
  }
  changeValueFirstName = e => {
    let signs = this.state.newUser
    signs.firstName = e.target.value
    this.setState({ newUser: signs })
  }
  changeValueLastName = e => {
    let signs = this.state.newUser
    signs.lastName = e.target.value
    this.setState({ newUser: signs })
  }
  changeValueEmail = e => {
    let signs = this.state.newUser
    signs.email = e.target.value
    this.setState({ newUser: signs })
  }
  changeValuePhone = e => {
    let signs = this.state.newUser
    signs.phone = e.target.value
    this.setState({ newUser: signs })
  }

  render() {
    let inputArea
    if (this.props.isVisible) {
      inputArea = 'inputArea'
    } else {
      inputArea = 'inputArea hidden'
    }
    return (
      <div className={inputArea}>
        <button onClick={this.closeInputArea}>Закрыть</button><br />
        <div className='leftBlockArea'>
          <p>ID: <input type='text' value={this.state.newUser.id} onChange={this.changeValueId} /></p>
          <p>First Name: <input type='text' value={this.state.newUser.firstName} onChange={this.changeValueFirstName} /></p>
          <p>Last Name: <input type='text' value={this.state.newUser.lastName} onChange={this.changeValueLastName} /></p>
        </div>
        <div className='rightBlockArea'>
          <p>Email: <input type='email' value={this.state.newUser.email} onChange={this.changeValueEmail} /></p>
          <p>Phone: <input type='tel' value={this.state.newUser.phone} onChange={this.changeValuePhone} /></p>
          <button className='add' onClick={this.addUser}>Добавить</button>
        </div>
      </div>
    );
  }
}

