# 🚀 Dexta Investments & Microfinance Limited

A modern, fully-featured financial services platform with live IPO trading, microfinance loans, savings accounts, and fixed deposits.

## ✨ Features

### 📱 Frontend
- **Live IPO Ticker** - Real-time price updates every 4 seconds
- **Testimonials Section** - Customer reviews with smooth animations
- **Responsive Design** - Beautiful on all devices (mobile, tablet, desktop)
- **Premium UI** - Gold & dark theme with modern animations
- **Smooth Scrolling** - Intuitive navigation with reveal animations

### 🎯 Services
- **IPO Investment** - Buy shares starting at Ksh 150 (min 100 shares)
- **Microfinance Loans** - Quick approval, minimal requirements
- **Savings Accounts** - Earn 8-10% interest per annum
- **Fixed Deposits** - Lock in 12% returns for 1+ year

### 🔧 Backend
- **REST API** - Express.js server with CORS enabled
- **SQLite Database** - Lightweight, persistent storage
- **Real-time Updates** - Live IPO price & subscription tracking
- **Form Validation** - Secure registration handling

## 📋 API Endpoints

### User Registration
```bash
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+254787123456",
  "national_id": "12345678",
  "service": "IPO Investment"
}
```

### Get IPO Price
```bash
GET /api/ipo/price

Response:
{
  "price": 150.45,
  "subscription": 68,
  "volume": 125400,
  "min_shares": 100,
  "min_investment": 15000
}
```

### Subscribe to IPO
```bash
POST /api/ipo/subscribe
Content-Type: application/json

{
  "email": "investor@example.com",
  "shares": 100
}
```

## 🛠️ Installation

### Prerequisites
- Node.js 14+
- npm or yarn

### Setup

1. **Clone/Navigate to project**
```bash
cd c:\Users\LENOVO\Desktop\dexta
```

2. **Install dependencies**
```bash
npm install
```

3. **Configure environment**
```bash
# .env file is already created with defaults
# PORT=3000
# NODE_ENV=development
```

4. **Start the server**
```bash
npm start
```

5. **Open in browser**
```
http://localhost:3000
```

## 📁 Project Structure

```
dexta/
├── index.html          # Main website
├── styles.css          # Styling (gold/dark theme)
├── script.js           # Frontend logic & animations
├── server.js           # Express backend server
├── package.json        # Dependencies
├── .env                # Environment config
├── dexta.db            # SQLite database (auto-created)
└── README.md           # This file
```

## 🎨 Design System

### Colors
- **Gold**: #C9A84C (Primary accent)
- **Dark**: #0A0A0F (Background)
- **Dark2**: #111118 (Secondary background)
- **Dark3**: #1A1A26 (Card backgrounds)
- **Text**: #E8E8F0 (Primary text)
- **Muted**: #888899 (Secondary text)
- **Accent**: #4C6EC9 (Blue accent)

### Typography
- **Serif**: Cormorant Garamond (headings, elegant)
- **Sans**: DM Sans (body text, clean)

## 🚀 Deployment

### Local Development
```bash
npm run dev
# or
npm start
```

### Production Deployment (Heroku/Railway)
```bash
# Ensure .env has correct PORT
# Push to Git
git push heroku main
```

## 📊 Live Features

### Real-time Updates
- IPO price updates every 4 seconds
- Subscription percentage tracking
- Volume tracking
- Color-coded price changes (green = up, red = down)

### Form Integration
- Live validation
- API integration with feedback
- Error handling
- Success confirmations

## 🔐 Security
- CORS enabled for safe cross-origin requests
- Body parser for JSON validation
- SQLite for data persistence
- Environment variables for sensitive config

## 📞 Support
**WhatsApp**: +254 787 327 180
**Phone**: 0768 629 120

## 📄 License
© 2026 Dexta Investments & Microfinance Limited. All rights reserved.

---

Built with ❤️ by Dexta Team | Powered by Node.js & Express
