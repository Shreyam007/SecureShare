async function listFiles() {
  try {
    console.log('Logging in...');
    const loginRes = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'janedoe_test1@example.com',
        password: 'password123'
      })
    });
    
    const loginData = await loginRes.json();
    const token = loginData.token;

    console.log('Fetching files...');
    const res = await fetch('http://localhost:5000/api/files', {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    const data = await res.json();
    console.log('Files count:', data.files.length);
    console.log('Files list:', JSON.stringify(data.files, null, 2));
  } catch (err) {
    console.error('Error:', err);
  }
}
listFiles();
