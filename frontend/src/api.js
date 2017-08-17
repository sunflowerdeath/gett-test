import 'whatwg-fetch'
import io from 'socket.io-client'

export default {
	getTasks() {
		return fetch('/tasks/get')
			.then(function(res) {
				if (!res.ok) throw Error(res.statusText)
				return res
			})
			.then((res) => res.json())
	},

	createTask(task) {
		return fetch('/tasks', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(task)
		})
			.then(function(res) {
				if (!res.ok) throw Error(res.statusText)
				return res
			})
	},

	subscribe(callback) {
		let socket = io('/')
		socket.on('create-task', (task) => {
			callback(JSON.parse(task))
		})
	}
}

