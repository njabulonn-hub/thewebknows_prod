const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'blog', 'articles-data.js');
const TODAY = '2025-11-14';

function updateAllLastUpdatedDates() {
    console.log('Updating all lastUpdated dates to', TODAY);
    
    let content = fs.readFileSync(DATA_PATH, 'utf8');
    
    // Update all lastUpdated dates to today
    // Match: lastUpdated:"YYYY-MM-DD"
    const updated = content.replace(/lastUpdated:"(\d{4}-\d{2}-\d{2})"/g, `lastUpdated:"${TODAY}"`);
    
    fs.writeFileSync(DATA_PATH, updated, 'utf8');
    
    // Count how many were updated
    const matches = content.match(/lastUpdated:"(\d{4}-\d{2}-\d{2})"/g);
    const count = matches ? matches.length : 0;
    
    console.log(`✓ Updated ${count} lastUpdated dates to ${TODAY}`);
    console.log('✓ File saved:', DATA_PATH);
}

if (require.main === module) {
    updateAllLastUpdatedDates();
}

