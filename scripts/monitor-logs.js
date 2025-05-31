const fs = require('fs');
const path = require('path');

const LOG_FILE = path.join(__dirname, '../logs/app.log');

// Ensure logs directory exists
if (!fs.existsSync(path.dirname(LOG_FILE))) {
  fs.mkdirSync(path.dirname(LOG_FILE), { recursive: true });
}

// Create the log file if it doesn't exist
if (!fs.existsSync(LOG_FILE)) {
  fs.writeFileSync(LOG_FILE, '');
}

console.log('Starting log monitor...');
console.log('Press Ctrl+C to stop monitoring\n');

// Function to read and display log content
function displayLogContent(start = 0) {
  return new Promise((resolve, reject) => {
    const stream = fs.createReadStream(LOG_FILE, {
      start: start,
      encoding: 'utf8'
    });

    stream.on('data', (data) => {
      process.stdout.write(data);
    });

    stream.on('end', () => {
      resolve();
    });

    stream.on('error', (error) => {
      reject(error);
    });
  });
}

// Read initial content
let lastPosition = 0;
try {
  // Display existing content first
  console.log('=== Existing Logs ===\n');
  displayLogContent(0).then(() => {
    const stats = fs.statSync(LOG_FILE);
    lastPosition = stats.size;
    console.log('\n=== Monitoring for new logs ===\n');
  }).catch(error => {
    console.error('Error reading initial log content:', error);
  });
} catch (error) {
  console.error('Error getting initial file size:', error);
}

// Watch for changes
fs.watch(LOG_FILE, (eventType) => {
  if (eventType === 'change') {
    try {
      const stats = fs.statSync(LOG_FILE);
      if (stats.size < lastPosition) {
        // File was truncated, reset position
        lastPosition = 0;
      }
      
      displayLogContent(lastPosition).then(() => {
        lastPosition = stats.size;
      }).catch(error => {
        console.error('Error reading log file:', error);
      });
    } catch (error) {
      console.error('Error processing log file:', error);
    }
  }
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nLog monitor stopped');
  process.exit();
}); 