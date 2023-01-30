const app = require('./app');

// Start the server
app.listen(process.env.PORT || 3001, () => {
    console.log(`Server is running on http://localhost:3001`);
});
