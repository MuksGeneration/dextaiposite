# 🧪 Testing & Demo Guide

## Quick Start Testing

### 1. Start the Backend Server
```bash
cd c:\Users\LENOVO\Desktop\dexta
npm install
npm start
```

Expected output:
```
✓ Connected to SQLite database
🚀 Dexta Investment Platform Backend Running
   Server: http://localhost:3000
   API Docs: http://localhost:3000/api
```

### 2. Open Website
Visit: **http://localhost:3000**

You should see:
- ✓ Hero section with Dexta branding
- ✓ Live IPO ticker with animated price updates
- ✓ New testimonials section with 4 customer reviews
- ✓ Services grid (Loans, Savings, Fixed Deposits, IPO)
- ✓ Requirements section
- ✓ Registration form connected to backend

### 3. Test Features

#### Live IPO Ticker
- Watch the price update every 4 seconds
- Subscription percentage increases gradually
- Price shows green when up, red when down

#### Registration Form
1. Fill in all fields:
   - Full Names: "John Kipchoge"
   - Email: "john@example.com"
   - Phone: "+254787123456"
   - National ID: "12345678"
   - Service: Select "IPO Investment"

2. Click "Submit Registration"

3. Watch for:
   - Button changes to "Submitting..."
   - Success message appears
   - Form clears (if successful)

#### Test API Endpoints

**Get IPO Price:**
```bash
curl http://localhost:3000/api/ipo/price
```

**Submit Registration:**
```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Jane Doe",
    "email": "jane@example.com",
    "phone": "+254789123456",
    "national_id": "87654321",
    "service": "Savings Account"
  }'
```

**Subscribe to IPO:**
```bash
curl -X POST http://localhost:3000/api/ipo/subscribe \
  -H "Content-Type: application/json" \
  -d '{
    "email": "investor@example.com",
    "shares": 150
  }'
```

**Health Check:**
```bash
curl http://localhost:3000/health
```

### 4. Check Database

The SQLite database (`dexta.db`) stores:
- User registrations
- IPO subscriptions
- Live IPO data

View with: `sqlite3 dexta.db` or any SQLite browser

## New Features Checklist

- [x] **Testimonials Section** - 4 customer reviews with animations
- [x] **Live IPO Ticker** - Real-time price updates every 4 seconds
- [x] **Backend API** - Node.js/Express server
- [x] **Database** - SQLite with 3 tables
- [x] **Form Integration** - Connected to API
- [x] **Error Handling** - Validation and feedback
- [x] **Mobile Responsive** - Works on all devices
- [x] **Documentation** - README with API docs

## Troubleshooting

**Port already in use?**
```bash
# Change PORT in .env or command:
PORT=3001 npm start
```

**Database error?**
```bash
# Delete and recreate:
rm dexta.db
npm start
```

**Form not submitting?**
1. Open browser console (F12)
2. Check for errors
3. Ensure backend is running on port 3000

**Dependencies missing?**
```bash
npm install --save express cors dotenv sqlite3 body-parser
```

## 📊 What's New

### Frontend
- ✨ Testimonials section with 4 reviews
- ✨ Live IPO price ticker with color-coded updates
- ✨ Enhanced form with name attributes
- ✨ API error handling

### Backend
- 🔧 Express.js server with CORS
- 🔧 SQLite database initialization
- 🔧 Registration endpoint: `POST /api/register`
- 🔧 IPO price endpoint: `GET /api/ipo/price`
- 🔧 IPO subscription endpoint: `POST /api/ipo/subscribe`
- 🔧 Health check: `GET /health`

### Database
- 📦 registrations table (user signups)
- 📦 ipo_subscriptions table (share purchases)
- 📦 ipo_data table (live prices)

## Next Steps

1. **Deploy Backend** - Host on Heroku, Railway, or AWS
2. **Add Email Notifications** - Send confirmations via nodemailer
3. **User Dashboard** - Track investments and returns
4. **Payment Gateway** - Accept actual payments (M-Pesa)
5. **Admin Panel** - Manage users and IPO data

---

🎉 Your Dexta platform is ready to go live!
