import https from 'https';

https.get('https://ceyizlistem.netlify.app/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    console.log("HTML:", data);
  });
});
