// File Name: localStorageUtils.js

// ✅ Function to initialize default users and data in localStorage
export const initializeLocalStorage = () => {
    const users = [
        { username: "Andrew", password: "Andrew123", email: "Andrew@yahoo.com", role: "Parent", team: "ABY" },
        { username: "Bansari", password: "Bansari123", email: "Bansari@yahoo.com", role: "Parent", team: "ABY" },
        { username: "Bob", password: "Bob123", email: "bob@yahoo.com", role: "Child", team: "ABY" },
        { username: "Luna", password: "Luna123", email: "Luna@yahoo.com", role: "Child", team: "ABY" }
    ];

    if (!localStorage.getItem("users")) {
        localStorage.setItem("users", JSON.stringify(users));
    }

    if (!localStorage.getItem("teamName")) {
        localStorage.setItem("teamName", "ABY");
    }

    if (!localStorage.getItem("chores")) {
        localStorage.setItem("chores", JSON.stringify([]));
    }
};

// ✅ Retrieve users from localStorage
export const getUsers = () => JSON.parse(localStorage.getItem("users")) || [];

// ✅ Authenticate user login using email and password
export const authenticateUser = (email, password) => {
    if (typeof email !== "string") {
        console.error("Invalid email format:", email);
        return null;
    }

    const users = getUsers();
    console.log("Stored users:", users); // ✅ Debugging users stored in localStorage
    console.log("Authenticating user with email:", email, "and password:", password);

    const user = users.find(user => 
        user.email.toLowerCase().trim() === email.toLowerCase().trim() && user.password === password
    );

    if (user) {
        console.log("User authenticated successfully:", user);
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // ✅ Store logged-in user
        return user;
    }

    console.log("Authentication failed for:", email);
    return null; // ✅ Return null if authentication fails
};


// ✅ Get the currently logged-in user
export const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("loggedInUser")) || null;
};

// ✅ Log out the user by removing session data
export const logoutUser = () => {
    localStorage.removeItem("loggedInUser");
    console.log("User logged out.");
};

// ✅ Retrieve chores assigned to the logged-in user
export const getUserChores = () => {
    const currentUser = getCurrentUser();
    if (!currentUser) return [];
    
    const storedChores = JSON.parse(localStorage.getItem("chores")) || [];
    return storedChores.filter(chore => chore.assignedTo === currentUser.username);
};

// ✅ Toggle completion status of a chore
export const toggleChoreCompletion = (id) => {
    let storedChores = JSON.parse(localStorage.getItem("chores")) || [];
    storedChores = storedChores.map(chore => 
        chore.id === id ? { ...chore, completed: !chore.completed } : chore
    );
    localStorage.setItem("chores", JSON.stringify(storedChores));
    return storedChores;
};

// ✅ Retrieve chores from localStorage
export const getChores = () => JSON.parse(localStorage.getItem("chores")) || [];

// ✅ Add a new chore to localStorage
export const addChoreToStorage = (chore) => {
    const chores = getChores();
    chores.push(chore);
    localStorage.setItem("chores", JSON.stringify(chores));
};
