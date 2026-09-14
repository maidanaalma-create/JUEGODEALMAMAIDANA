from http.server import HTTPServer, SimpleHTTPRequestHandler

HOST = "localhost"
PORT = 8000

server = HTTPServer(
    (HOST, PORT),
    SimpleHTTPRequestHandler
)

print("======================================")
print("          PAWS VS ROBOTS")
print("======================================")
print()
print("Server started at:")
print("http://localhost:8000")
print()
print("Press CTRL + C to stop.")
print()

server.serve_forever()