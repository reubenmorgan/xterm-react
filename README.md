# XTerm-React

React component wrapper for XTerm.js to simplify integration into any React project supporing React 18.

This project takes heavy insperation from [xterm-for-react](https://github.com/robert-harbison/xterm-for-react/tree/master) by [robert-harbison](https://github.com/robert-harbison) and also this [Gist](https://gist.github.com/mastersign/90d0ab06f040092e4ca27a3b59820cb9).

# Getting Started

## Installation

You can install XTerm-React using the following commands:

NPM:

```
npm install xterm-react
```

Yarn:

```
yarn add xterm-react
```

## Simple Echo Example

-   Clone the repo `git clone https://github.com/reubenmorgan/xterm-react`.
-   Open a terminal change to the examples directory in the repo.
-   Run `npm i` to install the required packages.
-   Start the example with `npm start`.

## Basic Terminal Example

```
// Import React
import React, { useState } from 'react';

// Import XTerm-React
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
```

## License

Distributed under the MIT License. See [LICENSE](https://github.com/reubenmorgan/xterm-react/blob/main/LICENSE) for more information.
