# multiplatform-chat-from-scratch

A chat app created from scratch, for learning purposes.

# Environment

1. Create a new MongoDB database at https://cloud.mongodb.com/.
2. Click the new database > "Connect" > "Driver", to get connection url in the form of `mongodb+srv://admin:123456@multiplatformchat.ABCDEFG.mongodb.net/?retryWrites=true&w=majority`.
3. Setup environment in the server/.env file.

```
MONGODB_USER='admin'
MONGODB_PASS='123456'
MONGODB_DATABASE='ABCDEFG'
```

# Running

## Server

http://localhost:8000/

```
cd multiplatform-chat-from-scratch
npm run dev --prefix ./server
```

## React Web Client

http://localhost:3000/

```
cd multiplatform-chat-from-scratch
npm start --prefix ./react-web-client
```
