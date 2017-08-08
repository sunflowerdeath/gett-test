import 'whatwg-fetch'

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
		var evtSrc = new EventSource('/subscribe')
		evtSrc.addEventListener('task', (e) => {
			let task = JSON.parse(e.data)
			callback(task)
		}, false)
	}
}

