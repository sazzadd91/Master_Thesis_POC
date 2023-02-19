# Docker Compose Nodejs and MongoDB example

## Run the System
We can easily run the whole with commands:
```bash
docker-compose build
docker-compose up
```

Docker will pull the MongoDB and Node.js images (if our machine does not have it before).

The services can be run on the background with command:
```bash
docker-compose up -d
```

## Stop the System
Stopping all the running containers is also simple with a single command:
```bash
docker-compose down
```

If you need to stop and remove all containers, networks, and all images used by any service in <em>docker-compose.yml</em> file, use the command:
```bash
docker-compose down --rmi all
```

## APIs
### curl for personal Info
```bash 
curl -X GET \
  http://127.0.0.1:8080/api/personalinfo/sazzad \
  -H 'cache-control: no-cache' \
  -H 'postman-token: ff24b6ee-1608-b9cb-1085-026d8ff3aa96'
```

### curl for contact 
```
curl -X GET \
  http://127.0.0.1:8080/api/contact/sazzad \
  -H 'cache-control: no-cache' \
  -H 'postman-token: 9a232315-0c35-71a7-999a-74df276872cd'
```