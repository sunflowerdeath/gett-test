import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'

export default class Tasks extends React.Component {
	render() {
		let sortedTasks = this.props.data.sort((a, b) => b.priority - a.priority)
		let taskElems = []
		for (let task of sortedTasks) {
			taskElems.push(<Task data={task} key={task.id} />)
		}

		return (
			<Table>
				<TableHeader adjustForCheckbox={false} displaySelectAll={false}>
				  <TableRow>
					<TableHeaderColumn>Priority</TableHeaderColumn>
					<TableHeaderColumn>Name</TableHeaderColumn>
					<TableHeaderColumn>Description</TableHeaderColumn>
				  </TableRow>
				</TableHeader>
				<TableBody>
					{taskElems}
				</TableBody>
			</Table>
		)
	}
}

class Task extends React.Component {
	render() {
		let {name, priority, description} = this.props.data
		return (
			<TableRow>
				<TableRowColumn>{priority}</TableRowColumn>
				<TableRowColumn>{name}</TableRowColumn>
				<TableRowColumn>{description}</TableRowColumn>
			</TableRow>
		)
	}
}
