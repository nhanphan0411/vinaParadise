const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const PORT = 3000;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies


// Middleware to serve static files
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Function to load data from the text file
const loadFileContent = (callback) => {
    fs.readFile(path.join(__dirname, 'public', 'data', 'tien_ich.txt'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            callback([]);
        } else {
            callback(data.split('\n')); // Split lines into an array
        }
    });
};

// Route for the homepage
app.get('/', (req, res) => {
    // Read the text file
    fs.readFile(path.join(__dirname, 'public', 'data', 'tien_ich.txt'), 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error loading text file');
        }
        // const formattedData = data.replace(/\n/g, '<br>');
        const formattedData = data.split("\n")
        // Render the EJS template with file content
        res.render('index', { fileContent: formattedData });
    });
});

// API Endpoint for Filtering
app.post('/filter', (req, res) => {
    const keyword = req.body.name.toLowerCase();
    loadFileContent((fileContent) => {
        const filteredContent = fileContent.filter(item =>
            item.toLowerCase().includes(keyword)
        );
        res.json({ filteredContent }); // Send JSON response
    });
});



// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
