#!/usr/bin/env node

// Simple form handler for LeadFlow - saves submissions to file
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3001;
const SUBMISSIONS_FILE = process.env.HOME + '/.openclaw/workspace/content/leadflow-submissions.json';

function saveSubmission(data) {
  let submissions = [];
  try {
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      submissions = JSON.parse(fs.readFileSync(SUBMISSIONS_FILE, 'utf8'));
    }
  } catch (e) {}
  
  submissions.unshift({
    ...data,
    timestamp: new Date().toISOString(),
    id: Date.now().toString(36)
  });
  
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
  console.log('New submission saved:', data.email);
}

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api/signup') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        saveSubmission(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid data' }));
      }
    });
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`LeadFlow form server running on port ${PORT}`);
});
