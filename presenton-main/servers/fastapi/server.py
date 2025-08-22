import uvicorn
import argparse
import os

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Run the FastAPI server")
    parser.add_argument(
        "--port", type=int, required=False, help="Port number to run the server on"
    )
    parser.add_argument(
        "--reload", type=str, default="false", help="Reload the server on code changes"
    )
    args = parser.parse_args()
    
    # Use PORT environment variable for cloud deployment, fallback to 8000 for local dev
    port = args.port or int(os.getenv("PORT", 8000))
    reload = args.reload == "true"
    
    uvicorn.run(
        "api.main:app",
        host="0.0.0.0",
        port=port,
        log_level="info",
        reload=reload,
    )
