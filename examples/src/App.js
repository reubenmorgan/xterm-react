import React, { useState } from 'react';
import './App.css';

import { Xterm } from 'xterm-react';

function App() {
	const [Terminal, setTerminal] = useState(null);
	const [input, setInput] = useState('');

	const onTermInit = (term) => {
		setTerminal(term);
		term.reset();
		term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ');
	};

	const onTermDispose = (term) => {
		console.log('Terminal disposed');
		setTerminal(null);
	};

	const handleData = (data) => {
		if (Terminal) {
			const code = data.charCodeAt(0);
			// If the user hits empty and there is something typed echo it.
			if (code === 13 && input.length > 0) {
				Terminal.write("\r\nYou typed: '" + input + "'\r\n");
				Terminal.write('echo> ');
				setInput('');
			} else if (code < 32 || code === 127) {
				console.log('Control Key', code);
				// Disable control Keys such as arrow keys
				return;
			} else {
				// Add general key press characters to the terminal
				Terminal.write(data);
				setInput(input + data);
			}
		}
	};

	return (
		<div className="App">
			<header className="App-header">
				<Xterm
					onInit={onTermInit}
					onDispose={onTermDispose}
					onData={handleData}
				/>
			</header>
		</div>
	);
}

export default App;
