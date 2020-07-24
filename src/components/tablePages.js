import React from 'react';

export class TablePages extends React.Component {

	constructor() {
    super();
    this.state = {  
    }
  }

  visibleButtons = () => {
  	const actualPage = this.props.actualPage,
  			  startPages = [1, 2, 3, 4],
  			  lastPage = Math.ceil(this.props.usersQuantity/50),
  			  endPages = [lastPage, lastPage - 1, lastPage - 2, lastPage - 3];

  	let pagesArr;

  	if(startPages.indexOf(actualPage) !== -1) {
  		pagesArr = [1, 2, 3, 4, 5, 6, 7]
  	} else if((endPages.indexOf(actualPage) !== -1) && (lastPage > 6)) {
  		pagesArr = [lastPage - 6, lastPage - 5, lastPage - 4, lastPage - 3, lastPage - 2, lastPage - 1, lastPage]
  	} else {
  		pagesArr = [actualPage - 3, actualPage - 2, actualPage - 1, actualPage, actualPage + 1, actualPage + 2, actualPage + 3]
  	}

  	return (
  		<div>
  			<button onClick={() => this.props.changePage('start')}>&#171;</button>
  			{ pagesArr.map(page => {
  				return(<button className ={this.props.actualPage === page ? 'activeButton' : {}} onClick={() => this.props.changePage(page)}>{page}</button>)
  			}) }
  			<button onClick={() => this.props.changePage('end')}>&#187;</button>
  		</div>
  	)
  }

	render() {
		return (
			<div>
				{this.visibleButtons()}
			</div>
		)
	}	
}