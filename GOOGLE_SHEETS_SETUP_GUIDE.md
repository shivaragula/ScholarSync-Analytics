# 📊 Google Sheets Setup Guide

## 🎯 How to Use Your Own Google Sheets Data

### **Current Status:**
- ✅ **164 records loaded** from the current Google Sheet
- ✅ **All data fields captured** including custom fields
- ✅ **Real-time sync** working properly

### **Option 1: Use Your Own Google Sheets**

#### **Step 1: Prepare Your Google Sheet**
1. **Open your Google Sheet** with enrollment/student data
2. **Make it publicly viewable:**
   - Click "Share" button
   - Change to "Anyone with the link can view"
   - Copy the share link

#### **Step 2: Get Your Sheet Information**
From your Google Sheets URL, extract:
```
https://docs.google.com/spreadsheets/d/[SPREADSHEET_ID]/edit#gid=[SHEET_ID]
```

**Example:**
- URL: `https://docs.google.com/spreadsheets/d/1ABC123XYZ/edit#gid=0`
- Spreadsheet ID: `1ABC123XYZ`
- Sheet ID (gid): `0`

#### **Step 3: Update Configuration**
I can help you update the `.env` file with your sheet details:

```env
VITE_GOOGLE_SPREADSHEET_ID=YOUR_SPREADSHEET_ID
VITE_ENROLLMENT_CSV_URL=https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID/export?format=csv&gid=YOUR_SHEET_ID
```

### **Option 2: Add Multiple Sheets/Tabs**

If you have multiple tabs (Enrollment Data, Renewal Data, etc.), I can help you:
1. **Load data from multiple tabs**
2. **Combine different data sources**
3. **Set up separate endpoints for each data type**

### **Option 3: Enhance Current Data**

The current setup already loads **ALL available data** with enhanced field mapping:

#### **✅ Automatically Mapped Fields:**
- **Student Info**: Name, Email, Phone, Address, Age, Gender
- **Course Info**: Package/Course, Activity/Category, Schedule
- **Dates**: Start Date, Timestamp, End Date, Due Date
- **Payment**: Fees Paid, Remaining Amount, Payment Status
- **Status**: Enrollment Status, Progress, Internal Notes
- **Additional**: Country Code, Instagram Link, Comments, Student ID

#### **✅ All Original Fields Preserved:**
Every field from your Google Sheet is preserved in the `...row` spread operator.

### **🔧 How to Switch to Your Google Sheets:**

**Just provide me with:**
1. **Your Google Sheets URL** (make sure it's publicly viewable)
2. **Which tab/sheet contains your data** (if multiple tabs)

**I'll update the configuration for you!**

### **📊 Current Data Structure:**

The system currently processes these field variations:
- `Student Name` / `Name` / `Full Name`
- `Email Address` / `Email` / `Student Email`
- `Package` / `Course` / `Course Name`
- `Activity` / `Category` / `Course Category`
- `Start Date` / `Enrollment Date` / `Registration Date`
- `Fees Paid Amount` / `Amount Paid` / `Paid Amount`
- And many more...

### **🚀 Next Steps:**

1. **To use your own sheet**: Provide your Google Sheets URL
2. **To add more data**: Tell me about additional tabs or data sources
3. **To customize fields**: Let me know specific field mappings you need

**Current system is ready to handle any Google Sheets structure!** 📈