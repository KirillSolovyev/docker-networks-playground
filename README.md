# Docker networks playground

> Pet project with docker networks

Set up docker network for 2 containers to communicate with each other.

`web-app-1` - fastify backend with `/ping` endpoint. Runs on 3123 port  
`web-app-2` - fastify backend with `/pong` endpoint which fetches data from `web-app-1`'s `/ping` endpoint and returns response. Runs on 3001 port  

> See [this tutorial](https://docs.docker.com/network/network-tutorial-standalone/) for more info

### How to run

1. Create docker images:
```sh
cd ./web-app-1
docker build . -t app-1

cd ./web-app-2
docker build . -t app-2
```

2. Run containers:
```sh
docker run --name app-1-c -p 3123:3123 app-1 # Container's name is important since it is used to resolve IP and referenced in web-app-2
docker run --name app-2-c -p 3001:3001 app-2
```

> [web-app-2/server.js](./web-app-2/server.js#16) uses URL `app-1-c` to fetch data from container. Docker network resolves the name

3. Create network for containers:
```sh
docker network create apps-network
```

4. Connect containers to network:
```sh
docker network connect apps-network app-1-c
docker network connect apps-network app-2-c
```

> Important! Containers' name to IP resolution is supported only in user-defined networks. Default bridge network [does not support it](https://docs.docker.com/network/network-tutorial-standalone/#:~:text=Automatic%20service%20discovery%20can%20only%20resolve%20custom%20container%20names%2C%20not%20default%20automatically%20generated%20container%20names%2C)

5. Check apps' endpoints
```sh
curl localhost:3123/ping # Direct call, will work even without apps-network. Just to check
curl localhost:3001/pong # Should return { "pong": "pong" }. We call web-app-2's endpoint which calls web-app-1's endpoint in app-1-c container. This is done via apps-network
```