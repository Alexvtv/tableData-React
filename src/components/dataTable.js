import React from 'react';

import {User} from './user';
import {TablePages} from './tablePages';

export class DataTable extends React.Component {

	constructor() {
    super();
    this.state = {  
      category: 'id',
      actualPage: 1
    }
  }

	selectCategory = category => {
		if (category === this.state.category) {
			return this.setState({ category: category + 'Reverse', actualPage: 1 })
		}
		this.setState({ category: category, actualPage: 1 })
	}

	categoryClass = sign => {
		if(sign === this.state.category) {
			return 'activeCategory' 
		} else if(sign + 'Reverse' === this.state.category) {
			return 'activeCategoryReverse'
		}
	}

	changePage = page => {
		if(page === 'end') {
			this.setState({ actualPage: Math.ceil(this.props.users.length/50) })
		} else if(page === 'start') {
			this.setState({ actualPage: 1 })
		} else if(Math.ceil(this.props.users.length/50) >= page) {
			this.setState({ actualPage: page })
			console.log(`новая страница: ${page}`)
		}
	}

	render() {
		let category,
				userList,
				pages;
		if(this.props.alteredUsers) {
			userList = this.props.alteredUsers
		} else {
			userList = this.props.users
		}

		if(this.props.isLoading == false) {

			if(this.state.category === 'id') {

				userList.sort((a, b) => a.id - b.id)

			} else if(this.state.category === 'idReverse') {

				userList.sort((a, b) => b.id - a.id)

			} else if(this.state.category === 'firstName') {

				userList.sort((a, b) => {
					if (a.firstName < b.firstName) {
						return -1
					}
				})

			} else if(this.state.category === 'firstNameReverse') {

				userList.sort((a, b) => {
					if (a.firstName > b.firstName) {
						return -1
					}
				})

			}	else if(this.state.category === 'lastName') {

				userList.sort((a, b) => {
					if (a.lastName < b.lastName) {
						return -1
					}
				})

			}	else if(this.state.category === 'lastNameReverse') {

				userList.sort((a, b) => {
					if (a.lastName > b.lastName) {
						return -1
					}
				})

			} else if(this.state.category === 'email') {

				userList.sort((a, b) => {
					if (a.email < b.email) {
						return -1
					}
				})

			}	else if(this.state.category === 'emailReverse') {

				userList.sort((a, b) => {
					if (a.email > b.email) {
						return -1
					}
				})

			} else if(this.state.category === 'phone') {

				userList.sort((a, b) => parseInt(a.phone.replace(/[^\d]/g, '')) - parseInt(b.phone.replace(/[^\d]/g, '')))

			} else if(this.state.category === 'phoneReverse') {

				userList.sort((a, b) => parseInt(b.phone.replace(/[^\d]/g, '')) - parseInt(a.phone.replace(/[^\d]/g, '')))

			}

			if(userList.length > 50) { 
				userList = userList.slice((this.state.actualPage-1)*50, this.state.actualPage*50)
				pages = (
					<TablePages 
						usersQuantity={userList.length}
						changePage={this.changePage}
						actualPage={this.state.actualPage}
					/>
				)
			}

			if(this.props.inputValue !== '') {
				userList = userList.filter(user => Object.values(user).join().indexOf(this.props.inputValue) !== -1)
			}

			userList = userList.map(user => {
				return(
					<div className='table'>
						<User
							user={user}
							setCurrentUser={this.props.setCurrentUser}
						/>
					</div>
				)
			})
		} else {
			userList = (<h2>Загрузка...</h2>)
		}

	  return (
	    <div className='table-main'>
				<div className='table-main-head'>
					<button className={this.categoryClass('id') + ' table-data__id'} onClick={() => this.selectCategory('id')}>id</button>
					<button className={this.categoryClass('firstName') + ' table-data__firstName'} onClick={() => this.selectCategory('firstName')}>firstName</button>
					<button className={this.categoryClass('lastName') + ' table-data__lastName'} onClick={() => this.selectCategory('lastName')}>lastName</button>
					<button className={this.categoryClass('email') + ' table-data__email'} onClick={() => this.selectCategory('email')}>email</button>
					<button className={this.categoryClass('phone') + ' table-data__phone'} onClick={() => this.selectCategory('phone')}>phone</button>
				</div>
				{userList}
				{pages}
			</div>
	  )
	}
}