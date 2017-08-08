import React from 'react'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class CreateTaskForm extends React.Component {
	constructor(props) {
		super()
		this.state = {
			status: props.status,
			name: '',
			priority: '',
			description: ''
		}
	}

	render() {
		return (
			<div style={{width: 500, margin: 'auto', marginTop: 20, marginBottom: 40}}>
				<b>Create task</b>
				<br />
				<div style={{display: 'flex'}}>
					<TextField
						floatingLabelText='Name *'
						floatingLabelFixed={true}
						style={{marginRight: 30, flexGrow: 1}}
						value={this.state.name}
						onChange={(e, value) => this.setState({name: value})}
					/>
					<TextField
						type='number'
						floatingLabelText='Priority *'
						floatingLabelFixed={true}
						style={{width: 75}}
						value={this.state.priority}
						onChange={(e, value) => this.setState({priority: value})}
					/>
				</div>
				<TextField
					floatingLabelText='Description'
					floatingLabelFixed={true}
					fullWidth={true}
					value={this.state.description}
					onChange={(e, value) => this.setState({description: value})}
				/>
				<br />
				<br />
				<RaisedButton
					label='Create'
					primary={true}
					disabled={this.state.status === 'loading' || !this.isFilled()}
					onTouchTap={this.submit.bind(this)}
					style={{marginRight: 40}}
				/>
				{this.state.status === 'loading' && 'Creating...'}
			</div>
		)
	}

	isFilled() {
		let {name, priority} = this.state
		return name.length > 0 && priority.length > 0
	}

	submit() {
		this.setState({status: 'loading'})
		let task = {
			name: this.state.name,
			description: this.state.description,
			priority: parseInt(this.state.priority, 10)
		}
		this.props.api.createTask(task)
			.then(() => {
				this.setState({name: '', description: '', priority: '', status: 'ready'})
			})
			.catch((e) => {
				this.setState({status: 'ready'})
				alert('Error creating task!')
			})
	}
}

