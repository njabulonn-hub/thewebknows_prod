const fs = require('fs');
const path = require('path');

// Read the current glossary data
const glossaryDataPath = path.join(__dirname, 'glossary-data.js');
const glossaryContent = fs.readFileSync(glossaryDataPath, 'utf8');

// Extract the array from window.glossaryData
const match = glossaryContent.match(/window\.glossaryData=\[(.+)\];/);
if (!match) {
    console.error('Could not parse glossary data');
    process.exit(1);
}

// Parse the JSON array
const dataStr = '[' + match[1] + ']';
const currentData = eval(dataStr);

// Create a map of term -> definition for quick lookup
const termMap = new Map();
currentData.forEach(entry => {
    termMap.set(entry.term.toLowerCase().trim(), entry);
});

// New definitions mapping - term -> new definition
// This will be populated from the user's provided content
const newDefinitions = {};

// Parse the user's provided content and create mapping
// Since the user provided the content in a specific format, we'll need to parse it
// For now, let's create a structure that can be easily updated

console.log('Reading new definitions from user input...');
console.log(`Current glossary has ${currentData.length} terms`);

// The user provided definitions in markdown format
// We need to extract them. Let's create a helper function to parse markdown sections

function parseMarkdownGlossary(markdownText) {
    const sections = {};
    const lines = markdownText.split('\n');
    let currentTopic = '';
    let currentTerm = '';
    let currentDefinition = '';
    let inDefinition = false;
    let termNumber = 0;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Check for topic header
        if (line.startsWith('## ')) {
            currentTopic = line.replace('## ', '').trim();
            sections[currentTopic] = [];
            continue;
        }
        
        // Check for term number (e.g., "1.  **Topics API**")
        const termMatch = line.match(/^\d+\.\s+\*\*(.+?)\*\*/);
        if (termMatch) {
            if (currentTerm && currentDefinition) {
                sections[currentTopic].push({
                    term: currentTerm,
                    definition: currentDefinition.trim()
                });
            }
            currentTerm = termMatch[1].trim();
            currentDefinition = '';
            inDefinition = true;
            continue;
        }
        
        // Check for definition continuation
        if (inDefinition && line && !line.startsWith('*') && !line.startsWith('---')) {
            if (currentDefinition) {
                currentDefinition += ' ' + line;
            } else {
                currentDefinition = line;
            }
        }
        
        // Reset on section breaks
        if (line.startsWith('---')) {
            if (currentTerm && currentDefinition) {
                sections[currentTopic].push({
                    term: currentTerm,
                    definition: currentDefinition.trim()
                });
            }
            currentTerm = '';
            currentDefinition = '';
            inDefinition = false;
        }
    }
    
    // Don't forget the last term
    if (currentTerm && currentDefinition && currentTopic) {
        sections[currentTopic].push({
            term: currentTerm,
            definition: currentDefinition.trim()
        });
    }
    
    return sections;
}

// Read the new definitions from a file or use the provided content
// For now, let's create a file with the user's content first, then parse it
const newDefinitionsPath = path.join(__dirname, 'new-glossary-definitions.md');

if (!fs.existsSync(newDefinitionsPath)) {
    console.log('Creating new-glossary-definitions.md file...');
    console.log('Please paste the new definitions into new-glossary-definitions.md');
    console.log('Then run this script again.');
    fs.writeFileSync(newDefinitionsPath, '# Paste new definitions here\n\n', 'utf8');
    process.exit(0);
}

const newDefinitionsContent = fs.readFileSync(newDefinitionsPath, 'utf8');
const parsedSections = parseMarkdownGlossary(newDefinitionsContent);

// Update current data with new definitions
let updatedCount = 0;
const updatedData = currentData.map(entry => {
    // Try to find matching definition in parsed sections
    for (const [topic, terms] of Object.entries(parsedSections)) {
        if (topic === entry.topic) {
            const matchingTerm = terms.find(t => 
                t.term.toLowerCase().trim() === entry.term.toLowerCase().trim()
            );
            if (matchingTerm) {
                updatedCount++;
                return {
                    ...entry,
                    definition: matchingTerm.definition
                };
            }
        }
    }
    return entry;
});

console.log(`Updated ${updatedCount} definitions`);

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

