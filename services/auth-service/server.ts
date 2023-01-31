import app from "./app";
// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on http://localhost:3000`);
});
