import React from 'react'

import Api from '@api'

import Tasks from './components/tasks'
import CreateTaskForm from './components/createTaskForm'

export default class App extends React.Component {
	constructor() {
		super()
		this.state = {
			status: 'loading',
			tasks: null
		}
	}

	componentDidMount() {
		Api.getTasks()
			.then((tasks) => {
				this.setState({status: 'ready', tasks})
			})
			.catch(() => this.setState({status: 'error'}))
		Api.subscribe((task) => {
			this.setState({tasks: [...this.state.tasks, task]})
		})
	}

	render() {
		if (this.state.status === 'loading') {
			return <div>Loading...</div>
		} else if (this.state.status === 'error') {
			return <div>Error</div>
		} else {
			return (
				<div>
					<CreateTaskForm api={Api} />
					<Tasks data={this.state.tasks} />
				</div>
			)
		}
	}
}
