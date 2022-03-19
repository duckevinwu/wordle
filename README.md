# Wordle Clone

[Wordle](https://www.nytimes.com/games/wordle/index.html) clone with a timer and without the one game per day limit. Includes functionality to challenge friends by generation of unique links to create puzzles for words that you found interesting or difficult.

## Run Locally

Clone the project
```bash
git clone https://github.com/duckevinwu/wordle.git
```

Go to the project directory
```bash
cd wordle
```

### Server Setup

Install dependencies for server
```bash
cd server
npm install
```

Start the server
```bash
npm start
```

You should server listening on port 8080.

### Client Setup

Open new terminal and go to project directory again
```bash
cd wordle
```

Install dependencies for client
```bash
cd client
npm install
```

Start the client
```bash
npm start
```

If browser doesn't open automatically, open a new browser window and navigate to `http://localhost:3000` to see the application.

## Running Tests

### Server

Navigate to server directory
```bash
cd server
```

Run tests
```bash
npm run test
```
