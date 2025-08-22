# Presenton Cloud Deployment Guide

This guide covers deploying Presenton on various cloud platforms including Render, Railway, Heroku, and others.

## 🚀 Quick Deploy Options

### 1. Render (Recommended - Free Tier Available)

#### Option A: One-Click Deploy
[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy)

#### Option B: Manual Deploy
1. **Fork/Clone** this repository
2. **Connect** to Render
3. **Create New Web Service**
4. **Select** the repository
5. **Configure** as follows:

**Backend Service:**
- **Name**: `presenton-backend`
- **Environment**: `Python`
- **Build Command**: `cd servers/fastapi && pip install -r requirements.txt`
- **Start Command**: `cd servers/fastapi && python server.py --port $PORT --reload false`
- **Health Check Path**: `/health`

**Frontend Service:**
- **Name**: `presenton-frontend`
- **Environment**: `Node`
- **Build Command**: `cd servers/nextjs && npm ci && npm run build`
- **Start Command**: `cd servers/nextjs && npm start`
- **Health Check Path**: `/`

**Environment Variables:**
```bash
# Backend
CAN_CHANGE_KEYS=true
APP_DATA_DIRECTORY=/opt/render/project/src/app_data
TEMP_DIRECTORY=/tmp/presenton
USER_CONFIG_PATH=/opt/render/project/src/app_data/userConfig.json
DATABASE_URL=sqlite:///app_data/presenton.db

# Frontend
NODE_ENV=production
BACKEND_URL=https://your-backend-service.onrender.com
```

### 2. Railway

#### Backend Deployment:
1. **Create New Project** on Railway
2. **Deploy from GitHub** repository
3. **Set Environment Variables**:
   ```bash
   CAN_CHANGE_KEYS=true
   APP_DATA_DIRECTORY=/app/app_data
   TEMP_DIRECTORY=/tmp/presenton
   USER_CONFIG_PATH=/app/app_data/userConfig.json
   DATABASE_URL=sqlite:///app_data/presenton.db
   ```

#### Frontend Deployment:
1. **Create New Service** in the same project
2. **Set Environment Variables**:
   ```bash
   NODE_ENV=production
   BACKEND_URL=https://your-backend-service.railway.app
   ```

### 3. Heroku

#### Backend:
```bash
# Create app
heroku create your-presenton-backend

# Set buildpacks
heroku buildpacks:set heroku/python

# Set environment variables
heroku config:set CAN_CHANGE_KEYS=true
heroku config:set APP_DATA_DIRECTORY=/app/app_data
heroku config:set TEMP_DIRECTORY=/tmp/presenton
heroku config:set USER_CONFIG_PATH=/app/app_data/userConfig.json

# Deploy
git push heroku main
```

#### Frontend:
```bash
# Create app
heroku create your-presenton-frontend

# Set buildpacks
heroku buildpacks:set heroku/nodejs

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set BACKEND_URL=https://your-backend-app.herokuapp.com

# Deploy
git push heroku main
```

## 🔧 Environment Variables

### Backend (FastAPI)
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `8000` |
| `CAN_CHANGE_KEYS` | Allow API key changes | `true` |
| `APP_DATA_DIRECTORY` | Data storage path | `/app/app_data` |
| `TEMP_DIRECTORY` | Temporary files path | `/tmp/presenton` |
| `USER_CONFIG_PATH` | User config file path | `/app/app_data/userConfig.json` |
| `DATABASE_URL` | Database connection string | `sqlite:///app_data/presenton.db` |

### Frontend (Next.js)
| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment mode | `production` |
| `BACKEND_URL` | Backend API URL | `http://localhost:8000` |

## 📁 File Structure for Deployment

```
presenton-main/
├── servers/
│   ├── fastapi/
│   │   ├── requirements.txt          # Python dependencies
│   │   ├── runtime.txt               # Python version
│   │   ├── Procfile                  # Heroku/Railway start command
│   │   ├── nixpacks.toml            # Railway build config
│   │   └── server.py                 # Entry point
│   └── nextjs/
│       ├── package.json              # Node.js dependencies
│       ├── Procfile                  # Heroku start command
│       ├── nixpacks.toml            # Railway build config
│       └── next.config.mjs           # Next.js config
├── render.yaml                       # Render deployment config
├── railway.json                      # Railway deployment config
└── DEPLOYMENT.md                     # This file
```

## 🚀 Deployment Commands

### Render
```bash
# Deploy using render.yaml
render deploy
```

### Railway
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway up
```

### Heroku
```bash
# Install Heroku CLI
# Deploy backend
cd servers/fastapi
heroku create your-backend
git push heroku main

# Deploy frontend
cd ../nextjs
heroku create your-frontend
git push heroku main
```

## 🔍 Health Checks

- **Backend**: `/health` - Returns service status
- **Frontend**: `/` - Main application page

## 📊 Monitoring

### Render
- Built-in monitoring dashboard
- Logs and metrics
- Auto-scaling options

### Railway
- Real-time logs
- Performance metrics
- Auto-deployment on git push

### Heroku
- Heroku Dashboard
- Logs and metrics
- Add-ons for monitoring

## 🛠️ Troubleshooting

### Common Issues:

1. **Port Binding Error**
   - Ensure `PORT` environment variable is set
   - Check if port is available

2. **Build Failures**
   - Verify Python/Node.js versions
   - Check dependency installation

3. **API Connection Issues**
   - Verify `BACKEND_URL` is correct
   - Check CORS configuration

4. **Database Issues**
   - Ensure database URL is correct
   - Check database permissions

### Debug Commands:

```bash
# Check logs
railway logs
heroku logs --tail
render logs

# Check environment variables
railway variables
heroku config
render env
```

## 🔐 Security Considerations

1. **API Keys**: Store sensitive keys as environment variables
2. **CORS**: Configure allowed origins for production
3. **Rate Limiting**: Implement API rate limiting
4. **HTTPS**: Ensure all connections use HTTPS in production

## 📈 Scaling

### Render
- Upgrade to paid plans for more resources
- Configure auto-scaling rules

### Railway
- Adjust resource allocation
- Enable auto-scaling

### Heroku
- Upgrade dyno types
- Configure auto-scaling

## 🆘 Support

- **Issues**: Create GitHub issue
- **Discord**: [Join our community](https://discord.gg/9ZsKKxudNE)
- **Documentation**: [Official docs](https://docs.presenton.ai)

---

**Happy Deploying! 🎉** 