// Debug script to test Google Sheets access
const fetch = require('node-fetch');

const GOOGLE_SPREADSHEET_ID = '1TggXSG9WbKut8PSD8f6_c3KNtFyFt49CSpnwIis_pBA';
const ENROLLMENT_CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SPREADSHEET_ID}/export?format=csv&gid=542375196`;

async function testGoogleSheetsAccess() {
  try {
    console.log('🔍 Testing Google Sheets URL:', ENROLLMENT_CSV_URL);
    
    const response = await fetch(ENROLLMENT_CSV_URL);
    console.log('📊 Response status:', response.status);
    console.log('📊 Response headers:', Object.fromEntries(response.headers));
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const csvText = await response.text();
    console.log('📄 CSV length:', csvText.length);
    console.log('📄 First 500 characters:');
    console.log(csvText.substring(0, 500));
    
    // Parse CSV
    const lines = csvText.split('\n');
    console.log('📊 Total lines:', lines.length);
    console.log('📊 Headers:', lines[0]);
    
    if (lines.length > 1) {
      console.log('📊 Sample row:', lines[1]);
    }
    
    return csvText;
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    
    // Try alternative URL format
    const altUrl = `https://docs.google.com/spreadsheets/d/${GOOGLE_SPREADSHEET_ID}/export?format=csv`;
    console.log('🔄 Trying alternative URL:', altUrl);
    
    try {
      const altResponse = await fetch(altUrl);
      console.log('📊 Alternative response status:', altResponse.status);
      
      if (altResponse.ok) {
        const altCsvText = await altResponse.text();
        console.log('✅ Alternative URL works! Length:', altCsvText.length);
        console.log('📄 First 200 characters:');
        console.log(altCsvText.substring(0, 200));
      }
    } catch (altError) {
      console.error('❌ Alternative URL also failed:', altError.message);
    }
  }
}

// Run the test
testGoogleSheetsAccess();