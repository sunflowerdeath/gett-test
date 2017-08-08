import React from 'react'
import ReactDOM from 'react-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

import App from './app'

let app = (
	<MuiThemeProvider>
		<App/>
	</MuiThemeProvider>
)

ReactDOM.render(app, document.querySelector('.container'))
