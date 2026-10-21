from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
import urllib.request
import urllib.error
import sys

TARGET = 'http://127.0.0.1:4321'

class ProxyHandler(BaseHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'

    def do_GET(self):
        self.proxy_request('GET')

    def do_POST(self):
        self.proxy_request('POST')

    def do_HEAD(self):
        self.proxy_request('HEAD')

    def do_OPTIONS(self):
        self.proxy_request('OPTIONS')

    def proxy_request(self, method):
        url = f"{TARGET}{self.path}"
        headers = {}
        for k, v in self.headers.items():
            if k.lower() not in ['host', 'connection']:
                headers[k] = v
        headers['Host'] = 'localhost:4321'

        data = None
        if 'content-length' in self.headers:
            length = int(self.headers['content-length'])
            data = self.rfile.read(length)

        req = urllib.request.Request(url, data=data, headers=headers, method=method)
        try:
            with urllib.request.urlopen(req, timeout=15) as response:
                self.send_response(response.status)
                for k, v in response.headers.items():
                    if k.lower() not in ['connection', 'transfer-encoding', 'content-length']:
                        self.send_header(k, v)
                body = response.read()
                self.send_header('Content-Length', str(len(body)))
                self.send_header('Connection', 'close')
                self.end_headers()
                if method != 'HEAD':
                    self.wfile.write(body)
        except urllib.error.HTTPError as e:
            self.send_response(e.code)
            for k, v in e.headers.items():
                if k.lower() not in ['connection', 'transfer-encoding', 'content-length']:
                    self.send_header(k, v)
            body = e.read()
            self.send_header('Content-Length', str(len(body)))
            self.send_header('Connection', 'close')
            self.end_headers()
            if method != 'HEAD':
                self.wfile.write(body)
        except Exception as e:
            self.send_response(502)
            self.send_header('Content-Type', 'text/plain')
            self.send_header('Connection', 'close')
            self.end_headers()
            self.wfile.write(f"Proxy error: {e}".encode())

    def log_message(self, format, *args):
        print(f"[IPHONE_ACCESS] {self.address_string()} - {format % args}", flush=True)

if __name__ == '__main__':
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 80
    server = ThreadingHTTPServer(('0.0.0.0', port), ProxyHandler)
    server.daemon_threads = True
    print(f"Threading Proxy running on port {port} forwarding to {TARGET}", flush=True)
    server.serve_forever()
