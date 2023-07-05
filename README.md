# multiplatform-chat-from-scratch

A chat app created from scratch, that copies the visuals of FB messenger. WIP.

- Server: TypeScript, NodeJS, Express, MongoDB, Mongoose, Socket.IO, REST APIs.
- Web Client: TypeScript, React, Socket.IO, REST APIs.

https://github.com/p-sun/multiplatform-chat-from-scratch/assets/9044578/9a38c6ac-77ce-4003-adb1-4c8e7baee62c

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

Sockets run on http://localhost:8080/

## React Web Client

http://localhost:3000/

```
cd multiplatform-chat-from-scratch
npm start --prefix ./react-web-client
```
