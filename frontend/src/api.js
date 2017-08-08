import fetch from 'whatwg-fetch'

export default {
	getTasks() {
		return fetch('/tasks').then((res) => res.json())
	},

	createTask(task) {
		return fetch('/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(task)
		})
	},

	subscribe(callback) {
		var evtSrc = new EventSource('/subscribe')
		evtSrc.addEventListener('task', (e) => {
			let task = JSON.parse(e.data)
			callback(task)
		}, false)
	}
}

