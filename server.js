const express = require("express");
const app = express();
const PORT = 3020;

app.use(express.json()); // Middleware to parse JSON

let users = [{ username: "samsavi1", password: "aupp1" }]; // Predefined user

// 1. Registration API (POST)
app.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Allow registration only for "samsavi1"
    if (username !== "samsavi1" || password !== "aupp1") {
        return res.status(403).json({ message: "Only predefined user can register" });
    }

    res.status(201).json({ message: "User registered successfully", users });
});

// 2. Login API (POST)
app.post("/login", (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    
    if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", username });
});

// 3. Search User API (GET)
app.get("/search", (req, res) => {
    const { username } = req.query;
    const user = users.find(u => u.username === username);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
});

// 4. Update User Profile API (PUT)
app.put("/update", (req, res) => {
    const { username, newPassword } = req.body;
    
    if (username !== "samsavi1") {
        return res.status(403).json({ message: "Only predefined user can update profile" });
    }

    users = users.map(user =>
        user.username === username ? { ...user, password: newPassword } : user
    );

    res.json({ message: "User updated successfully", users });
});

// 5. Delete User API (DELETE)
app.delete("/delete", (req, res) => {
    const { username } = req.body;

    if (username !== "samsavi1") {
        return res.status(403).json({ message: "Only predefined user can be deleted" });
    }

    users = users.filter(u => u.username !== username);
    res.json({ message: "User deleted successfully", users });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
