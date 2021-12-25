
# gochat

this is full functioning chat application built in golang and react
it has 3 modules

- [apiserver](https://github.com/VishalTanwani/gochat/tree/main/apiserver)
- [socket](https://github.com/VishalTanwani/gochat/tree/main/socket)
- [frontend](https://github.com/VishalTanwani/gochat/tree/main/frontend)


## Tech Stack

**Client:** React, html, CSS, contextAPI

**Server:** Golang

web socket is used for live chatting

to run this whole application follow below steps
```bash
  cd apiserver/main
  go run *.go -email=email id -emailpass=email password -dbname=mongodb username -dbpass=mongodb password
```

- -email for sending otp to email (we are using smtp.gmail.com so please provide gmail ID)
- -emailpass for password of given email
- -dbname for mongodb user name
- -dbpass for mongodb password

opne new terminal window in this application and write below command
```bash
  cd socket
  go run main.go
```
this is to run socket connection.

now go to frontend directory and create .env file and content of that file will be

```bash
REACT_APP_API_ENDPOINT = "http://localhost:4000"
REACT_APP_ACCESS_ID = "ur aws access id"
REACT_APP_ACCESS_KEY = "your aws secret access key"
REACT_APP_AWS_S3_BUCKET = "and your aws s3 bucket"
```
we are using aws s3 bucket for sharing images.

opne new terminal window in this application and write below command

```bash
  cd frontend
  npm run start
```

this is to run frontend 

u have all 3 modules running in localhost 3000,4000,5000 respectively



