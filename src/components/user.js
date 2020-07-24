import React from 'react';

export class User extends React.Component {

	render() {
		return (
			<div className='table-data' onClick={() => this.props.setCurrentUser(this.props.user)}>
				<div className='table-data__id'>{this.props.user.id}</div>
				<div className='table-data__firstName'>{this.props.user.firstName}</div>
				<div className='table-data__lastName'>{this.props.user.lastName}</div>
				<div className='table-data__email'>{this.props.user.email}</div>
				<div className='table-data__phone'>{this.props.user.phone}</div>
			</div>
		)
	}
			

}