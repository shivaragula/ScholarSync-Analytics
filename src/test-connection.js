// Simple test to check if React can connect to backend
// Run this in browser console

async function testBackendConnection() {
  const baseUrl = 'http://localhost:8001';
  
  console.log('🔍 Testing backend connection...');
  console.log('Base URL:', baseUrl);
  
  try {
    // Test 1: Basic fetch
    console.log('\n1. Testing basic fetch...');
    const response = await fetch(`${baseUrl}/api/health`);
    console.log('Status:', response.status);
    console.log('OK:', response.ok);
    
    if (response.ok) {
      const data = await response.json();
      console.log('✅ Health check successful!');
      console.log('Data:', data);
      
      // Test 2: Google Sheets data
      console.log('\n2. Testing Google Sheets data...');
      const sheetsResponse = await fetch(`${baseUrl}/api/sheets/raw`);
      
      if (sheetsResponse.ok) {
        const sheetsData = await sheetsResponse.json();
        console.log('✅ Sheets data successful!');
        console.log('Records:', sheetsData.data?.length || 0);
        console.log('Sample:', sheetsData.data?.[0] || 'No data');
        
        return {
          success: true,
          records: sheetsData.data?.length || 0,
          sampleData: sheetsData.data?.slice(0, 2) || []
        };
      } else {
        console.log('❌ Sheets data failed:', sheetsResponse.status);
        return { success: false, error: 'Sheets data failed' };
      }
    } else {
      console.log('❌ Health check failed:', response.status);
      return { success: false, error: 'Health check failed' };
    }
  } catch (error) {
    console.error('❌ Connection error:', error);
    return { success: false, error: error.message };
  }
}

// Auto-run the test
testBackendConnection().then(result => {
  console.log('\n🎯 Final Result:', result);
});