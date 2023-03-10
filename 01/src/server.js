import http from 'node:http'

const server = http.createServer((req, res) => {

  return res.end('Hello NOIS')

})

server.listen(3333)


