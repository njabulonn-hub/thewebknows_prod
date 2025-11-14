const fs = require('fs');
const path = require('path');

// Read current glossary data
const glossaryDataPath = path.join(__dirname, 'glossary-data.js');
const glossaryContent = fs.readFileSync(glossaryDataPath, 'utf8');
const match = glossaryContent.match(/window\.glossaryData=\[(.+)\];/);
if (!match) {
    console.error('Could not parse glossary data');
    process.exit(1);
}
const dataStr = '[' + match[1] + ']';
const currentData = eval(dataStr);

console.log(`Loaded ${currentData.length} terms from current glossary`);

// Parse the user's provided definitions from a text file
// Format: Each section starts with "## Topic Name", then numbered items with term and definition
function parseUserDefinitions(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split('\n');
    const definitions = new Map(); // topic -> Map(term -> definition)
    
    let currentTopic = '';
    let currentTerm = '';
    let currentDefinition = [];
    let inDefinition = false;
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Topic header
        if (line.startsWith('## ')) {
            // Save previous term if exists
            if (currentTerm && currentTopic && currentDefinition.length > 0) {
                if (!definitions.has(currentTopic)) {
                    definitions.set(currentTopic, new Map());
                }
                definitions.get(currentTopic).set(
                    currentTerm.toLowerCase().trim(),
                    currentDefinition.join(' ').trim()
                );
            }
            currentTopic = line.replace('## ', '').trim();
            currentTerm = '';
            currentDefinition = [];
            inDefinition = false;
            continue;
        }
        
        // Numbered term (e.g., "1.  **Topics API**")
        const termMatch = line.match(/^\d+\.\s+\*\*(.+?)\*\*/);
        if (termMatch) {
            // Save previous term
            if (currentTerm && currentTopic && currentDefinition.length > 0) {
                if (!definitions.has(currentTopic)) {
                    definitions.set(currentTopic, new Map());
                }
                definitions.get(currentTopic).set(
                    currentTerm.toLowerCase().trim(),
                    currentDefinition.join(' ').trim()
                );
            }
            currentTerm = termMatch[1].trim();
            currentDefinition = [];
            inDefinition = true;
            continue;
        }
        
        // Definition text (not empty, not a separator, not a count line)
        if (inDefinition && line && 
            !line.startsWith('*') && 
            !line.startsWith('---') &&
            !line.match(/^\d+\s+terms/)) {
            currentDefinition.push(line);
        }
        
        // Reset on section breaks
        if (line.startsWith('---')) {
            if (currentTerm && currentTopic && currentDefinition.length > 0) {
                if (!definitions.has(currentTopic)) {
                    definitions.set(currentTopic, new Map());
                }
                definitions.get(currentTopic).set(
                    currentTerm.toLowerCase().trim(),
                    currentDefinition.join(' ').trim()
                );
            }
            currentTerm = '';
            currentDefinition = [];
            inDefinition = false;
        }
    }
    
    // Don't forget the last term
    if (currentTerm && currentTopic && currentDefinition.length > 0) {
        if (!definitions.has(currentTopic)) {
            definitions.set(currentTopic, new Map());
        }
        definitions.get(currentTopic).set(
            currentTerm.toLowerCase().trim(),
            currentDefinition.join(' ').trim()
        );
    }
    
    return definitions;
}

// Try to read from new-definitions.md, or create it with instructions
const newDefsPath = path.join(__dirname, 'new-definitions.md');
if (!fs.existsSync(newDefsPath)) {
    console.log('Creating new-definitions.md template...');
    console.log('Please paste the new definitions (in markdown format) into new-definitions.md');
    console.log('Then run this script again.\n');
    
    const template = `# Paste new definitions here

## Topic Name

1.  **Term Name**
    Definition text here.

2.  **Another Term**
    Another definition.

---
`;
    fs.writeFileSync(newDefsPath, template, 'utf8');
    console.log(`Created ${newDefsPath}`);
    console.log('After adding definitions, run: node process-glossary-updates.js');
    process.exit(0);
}

console.log('Parsing new definitions...');
const newDefinitions = parseUserDefinitions(newDefsPath);

// Count how many we found
let totalNewDefs = 0;
newDefinitions.forEach((termMap) => {
    totalNewDefs += termMap.size;
});
console.log(`Found ${totalNewDefs} new definitions across ${newDefinitions.size} topics`);

// Update current data with new definitions
let updatedCount = 0;
const updatedData = currentData.map(entry => {
    const topicMap = newDefinitions.get(entry.topic);
    if (topicMap) {
        const newDef = topicMap.get(entry.term.toLowerCase().trim());
        if (newDef) {
            updatedCount++;
            return {
                ...entry,
                definition: newDef
            };
        }
    }
    return entry;
});

console.log(`\nUpdated ${updatedCount} definitions`);

// Write updated glossary-data.js
const updatedGlossaryJs = `window.glossaryData=${JSON.stringify(updatedData)};`;
fs.writeFileSync(glossaryDataPath, updatedGlossaryJs, 'utf8');
console.log(`✓ Updated ${glossaryDataPath}`);

// Generate updated review markdown
let reviewMarkdown = '# Glossary Terms and Definitions\n\n';
reviewMarkdown += 'This document contains all glossary terms and their definitions organized by topic.\n\n';
reviewMarkdown += `**Total Terms:** ${updatedData.length}\n\n`;
reviewMarkdown += '---\n\n';

// Group by topic
const grouped = {};
updatedData.forEach(entry => {
    if (!grouped[entry.topic]) {
        grouped[entry.topic] = [];
    }
    grouped[entry.topic].push(entry);
});

// Sort topics alphabetically
const sortedTopics = Object.keys(grouped).sort();

sortedTopics.forEach(topic => {
    reviewMarkdown += `## ${topic}\n\n`;
    reviewMarkdown += `*${grouped[topic].length} terms*\n\n`;
    
    grouped[topic].forEach((entry, idx) => {
        reviewMarkdown += `${idx + 1}. **${entry.term}**\n   \n   ${entry.definition}\n\n`;
    });
    
    reviewMarkdown += '---\n\n';
});

// Write updated review file
const reviewPath = path.join(__dirname, 'GLOSSARY_TERMS_REVIEW.md');
fs.writeFileSync(reviewPath, reviewMarkdown, 'utf8');
console.log(`✓ Updated ${reviewPath}`);

console.log('\n✓ Glossary update complete!');
console.log(`\nSummary:`);
console.log(`- Total terms: ${updatedData.length}`);
console.log(`- Definitions updated: ${updatedCount}`);
console.log(`- Topics: ${sortedTopics.length}`);

