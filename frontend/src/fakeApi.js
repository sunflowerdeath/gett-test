import Q from 'q'

let FAKE_TASKS = [
	{id: '1', name: 'Помыть слона', description: 'Помыть слона', priority: 1},
	{id: '2', name: 'Сходить в магазин', description: 'Купить молока', priority: 2}
]

window.pushTask = () => {
	let task = {
		id: String(Math.round(Math.random() * 10000) + 500),
		name: 'FAKE TASK #' + Math.round(Math.random() * 100),
		description: 'Fake description',
		priority: Math.round(Math.random() * 10)
	}
	window.pushCallback(task)
}

export default {
	fakeRequest(response, error = false) {
		let defer = Q.defer()
		setTimeout(() => {
			if (error) defer.reject(response)
			else defer.resolve(response)
		}, 500)
		return defer.promise
	},

	getTasks() {
		return this.fakeRequest(FAKE_TASKS)
	},

	createTask(task) {
		return this.fakeRequest('OK')
	},

	subscribe(callback) {
		window.pushCallback = callback
	}
}

