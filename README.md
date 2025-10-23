# 📊 ScholarSync Analytics

**Comprehensive Student Analytics & Enrollment Intelligence Platform**

A powerful, real-time dashboard for student enrollment tracking, revenue analytics, and customer lifetime value insights with seamless Google Sheets integration.

![Dashboard Preview](https://img.shields.io/badge/Status-Live-brightgreen) ![React](https://img.shields.io/badge/React-18.2.0-blue) ![Node.js](https://img.shields.io/badge/Node.js-Backend-green) ![Google Sheets](https://img.shields.io/badge/Google%20Sheets-Integration-yellow)

## 🚀 Live Demo

**Frontend**: `http://localhost:4028`  
**Backend API**: `http://localhost:8001`

## ✨ Key Features

### 📈 **Enrollment Analytics**
- Real-time KPI tracking (Total Enrollments, Active Students, Revenue)
- Interactive enrollment trend charts with date filtering
- Course category distribution and analytics
- Advanced search and filtering capabilities
- Student progress monitoring

### 💰 **Revenue Intelligence**
- Revenue metrics and forecasting
- Payment status monitoring and tracking
- Customer Lifetime Value (LTV) calculations
- Financial performance analytics
- Revenue per student insights

### 🔄 **Renewal Analytics**
- Customer retention metrics and analysis
- Renewal trend tracking and predictions
- Churn rate analysis by category
- Priority renewal identification
- Customer activity timeline

### 🔗 **Google Sheets Integration**
- **Real-time data sync** from Google Sheets
- **164+ student records** automatically processed
- Automatic CSV parsing and field mapping
- Manual sync capabilities with one-click refresh
- Support for multiple data formats and structures

## 🛠️ Tech Stack

### **Frontend**
- **React 18** - Modern UI library with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Recharts** - Interactive data visualization library
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library

### **Backend**
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **Google Sheets API** - Real-time data integration
- **CORS** - Cross-origin resource sharing
- **CSV Parser** - Advanced data processing

### **Data & Analytics**
- **Google Sheets** - Primary data source
- **Real-time sync** - Automatic data updates
- **Advanced filtering** - Date ranges, categories, search
- **Export functionality** - CSV download with filters

## 🚀 Quick Start

### **Prerequisites**
- Node.js 16+
- npm or yarn
- Git
- Google Sheets with student data

### **Installation**

1. **Clone the repository:**
```bash
git clone https://github.com/shivaragula/ScholarSync-Analytics.git
cd ScholarSync-Analytics
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
# Copy and update .env file
cp .env.example .env

# Update with your Google Sheets configuration
VITE_API_BASE_URL=http://localhost:8001
VITE_GOOGLE_SPREADSHEET_ID=your_spreadsheet_id
VITE_ENROLLMENT_CSV_URL=your_csv_export_url
```

4. **Start the development servers:**

**Backend Server:**
```bash
npm run dev:server
# Server runs on: http://localhost:8001
```

**Frontend Server:**
```bash
npm start
# Application runs on: http://localhost:4028
```

5. **Access the dashboard:**
Open your browser and navigate to: `http://localhost:4028`

## 📊 Google Sheets Setup

1. **Create or use existing Google Sheet** with student enrollment data
2. **Make it publicly viewable** (Share → Anyone with link can view)
3. **Get the spreadsheet ID** from the URL
4. **Update environment variables** in `.env` file
5. **Restart servers** to load new data

### **Expected Data Format:**
| Student Name | Email | Course | Category | Enrollment Date | Status | Payment Status | Amount |
|--------------|-------|--------|----------|-----------------|--------|----------------|---------|
| John Doe | john@email.com | React Dev | Programming | 2024-01-15 | Active | Paid | 1500 |

## 📁 Project Structure

```
ScholarSync-Analytics/
├── src/
│   ├── pages/
│   │   ├── internship-dashboard/     # Main analytics dashboard
│   │   ├── enrollment-overview/      # Enrollment analytics
│   │   ├── revenue-intelligence/     # Revenue analytics
│   │   └── renewal-analytics/        # Renewal analytics
│   ├── components/                   # Reusable UI components
│   ├── hooks/                       # Custom React hooks
│   ├── services/                    # API services
│   └── styles/                      # CSS and styling
├── test-server.js                   # Development backend server
├── server.js                       # Production backend server
└── README.md                       # This file
```

## 🔧 Available Scripts

```bash
npm start              # Start frontend development server
npm run build          # Build for production
npm run serve          # Preview production build
npm run dev:server     # Start development backend server
npm run server         # Start production backend server
```

## 📈 Analytics & Calculations

### **LTV Formula:**
```
Customer LTV = Sum of all payments made by customer (enrollment + renewals)
```

### **Churn Rate Formula:**
```
Churn Rate = (Customers who didn't renew / Customers active at period start) × 100
```

### **Key Metrics:**
- **Total Enrollments**: Real-time count with date filtering
- **Revenue Analysis**: Total and average revenue per enrollment
- **Category Performance**: Distribution and trends by course category
- **Customer Retention**: Active vs churned customer analysis

## 🌟 Key Features Implemented

- ✅ **Real-time Google Sheets integration** (164+ records)
- ✅ **Advanced date filtering** (Today, Yesterday, Last 7 days, etc.)
- ✅ **Interactive data visualizations** with charts and graphs
- ✅ **Customer LTV calculations** and ranking
- ✅ **Churn rate analysis** by category
- ✅ **Export functionality** (CSV download with filters)
- ✅ **Responsive design** (mobile-friendly)
- ✅ **Search and filtering** capabilities
- ✅ **Professional UI/UX** with Tailwind CSS

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
npm run build
npx vercel --prod
```

### **Netlify**
```bash
npm run build
# Upload dist folder to Netlify
```

### **Environment Variables for Production:**
```
VITE_API_BASE_URL=https://your-api-domain.com
VITE_GOOGLE_SPREADSHEET_ID=your_spreadsheet_id
VITE_ENROLLMENT_CSV_URL=your_csv_export_url
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Sheets API** for seamless data integration
- **Recharts** for beautiful data visualizations
- **Tailwind CSS** for rapid UI development
- **React & Vite** for modern development experience

## 📞 Contact

**Developer**: Shiva Ragula  
**GitHub**: [@shivaragula](https://github.com/shivaragula)  
**Project**: [ScholarSync Analytics](https://github.com/shivaragula/ScholarSync-Analytics)

---

⭐ **Star this repository** if you found it helpful!

🐛 **Found a bug?** [Open an issue](https://github.com/shivaragula/ScholarSync-Analytics/issues)

💡 **Have a feature request?** [Start a discussion](https://github.com/shivaragula/ScholarSync-Analytics/discussions)

**Built with ❤️ for educational analytics and student success tracking**