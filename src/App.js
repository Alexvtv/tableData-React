import React from 'react';

import {DataTable} from './components/dataTable';
import {NewUserArea} from './components/newUserArea';

class App extends React.Component {

  constructor() {
    super();
    this.state = {  
      isLoading: true,
      selectedDataSize: 'small',
      inputValue: '',
      alteredUsers: false,
      currentUser: false,
      inputsAreaIsVisible: false,
      addedUser: false
    }
  }

  componentDidMount() {
    fetch(`http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
          this.setState({ users: data, isLoading: false });
          console.log(this.state.users);
      })
      .catch(alert);
  }

  addUser = newUser => {
    const usersCopy = this.state.users
    usersCopy.push(newUser)
    this.setState({ users: usersCopy, addedUser: newUser, addedUser: false })
  }

  changeDataSize = dataSize => {
    if(dataSize !== this.state.selectedDataSize) {

      this.setState({ isLoading: true, selectedDataSize: dataSize });
      let link;
      if(dataSize === 'small') {
        link = (`http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
      } else if(dataSize === 'big') {
        link = (`http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&delay=3&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
      }

        fetch(link)
        .then(response => {
          return response.json();
        })
        .then(data => {
          this.setState({ users: data, isLoading: false })
          console.log(this.state.users)
        })
        .catch(alert);
    }
  }

  setCurrentUser = user => {
    this.setState({ currentUser: user })
    console.log('Пользователь выбран!')
  }

  changeValue = e => {
    if(e.target.value == '') {
      this.setState({ alteredUsers: false })
    }
    this.setState({ inputValue: e.target.value })
  }

  inputSearch = () => {
    if(this.state.inputValue !== '') {
      this.setState({ alteredUsers: this.state.users.filter(user => Object.values(user).join().indexOf(this.state.inputValue) !== -1) })
    }
  }

  currentUserData = () => {
    const user = this.state.currentUser;
    if(!!user) {
      return (
        <div className='userData'>
          <p>Выбран пользователь <b>{user.firstName} {user.lastName}</b><br />
          Описание: <i>{user.description}</i><br />
          Адрес проживания: <b>{user.address.streetAddress}</b><br />
          Город: <b>{user.address.city}</b><br />
          Провинция/штат: <b>{user.address.state}</b><br />
          Индекс: <b>{user.address.zip}</b></p>
        </div>
      )
    }
  }
 
  toggleInputArea = () => {
    this.setState({ inputsAreaIsVisible: !this.state.inputsAreaIsVisible })
  }

  render() {
    return (
      <div className="App">

        <div className='userInterface'>
          <div className='choiceButtons'>
            <p>Выберите объем данных</p>
            <button className={this.state.selectedDataSize === 'small' ? 'activeButton' : {}} onClick={() => this.changeDataSize('small')}>Маленький</button>
            <button className={this.state.selectedDataSize === 'big' ? 'activeButton' : {}} onClick={() => this.changeDataSize('big')}>Большой</button>
          </div>
          <div className='searchMenu'>
            <p><input type='text' onChange={this.changeValue} /> <input type='button' value='найти' onClick={this.inputSearch} /></p>
          </div>
          <div className='addUser'>
            <button onClick={this.state.inputsAreaIsVisible ? {} : this.toggleInputArea}>Добавить пользователя</button>
          </div>
        </div>

        <DataTable
          isLoading={this.state.isLoading}
          users={this.state.users}
          inputValue={this.state.inputValue}
          alteredUsers={this.state.alteredUsers}
          setCurrentUser={this.setCurrentUser}
        />

        {this.currentUserData()}

        <NewUserArea 
          addUser={this.addUser}
          toggleInputArea={this.toggleInputArea}
          isVisible={this.state.inputsAreaIsVisible}
        />
      </div>
    );
  }
}

export default App;
