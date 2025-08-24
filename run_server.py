#!/usr/bin/env python3
"""
Flask Server Runner with Configuration Options
"""
import os
import sys
import argparse
from app import app
from config import config

def get_local_ip():
    """Get the local IP address of the machine"""
    import socket
    try:
        # Connect to a remote address to determine local IP
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            local_ip = s.getsockname()[0]
        return local_ip
    except Exception:
        return "127.0.0.1"

def main():
    parser = argparse.ArgumentParser(description='Run Flask server with different configurations')
    parser.add_argument('--config', '-c', 
                       choices=['development', 'production', 'public'], 
                       default='public',
                       help='Configuration to use (default: public)')
    parser.add_argument('--host', 
                       help='Host to bind to (overrides config)')
    parser.add_argument('--port', '-p', type=int,
                       help='Port to bind to (overrides config)')
    parser.add_argument('--no-debug', action='store_true',
                       help='Disable debug mode')
    
    args = parser.parse_args()
    
    # Get configuration
    config_name = args.config
    config_obj = config[config_name]()
    
    # Override with command line arguments
    host = args.host or config_obj.HOST
    port = args.port or config_obj.PORT
    debug = config_obj.DEBUG and not args.no_debug
    
    # Configure Flask app
    app.config.from_object(config_obj)
    
    # Display connection information
    print(f"Flask Configuration: {config_name}")
    print(f"Starting server on {host}:{port}")
    print(f"Debug mode: {'ON' if debug else 'OFF'}")
    print("-" * 50)
    
    if host == '0.0.0.0':
        local_ip = get_local_ip()
        print("Server accessible from:")
        print(f"  Local:    http://127.0.0.1:{port}")
        print(f"  Network:  http://{local_ip}:{port}")
        print(f"  External: http://[YOUR_PUBLIC_IP]:{port}")
        print("\nNote: Make sure your firewall allows connections on this port")
    else:
        print(f"Server accessible at: http://{host}:{port}")
    
    print("-" * 50)
    print("Press Ctrl+C to stop the server")
    
    try:
        app.run(host=host, port=port, debug=debug)
    except KeyboardInterrupt:
        print("\nServer stopped.")

if __name__ == '__main__':
    main()
