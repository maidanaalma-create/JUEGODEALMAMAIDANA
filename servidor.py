from http.server import HTTPServer, SimpleHTTPRequestHandler

HOST = "localhost"
PORT = 8000

servidor = HTTPServer(
    (HOST, PORT),
    SimpleHTTPRequestHandler
)

print("======================================")
print("       ENGLISH ESCAPE ROOM")
print("======================================")
print()
print("Servidor iniciado en:")
print("http://localhost:8000")
print()
print("Presioná Ctrl + C para detenerlo.")
print()

servidor.serve_forever()
