const USERS_KEY = 'mockUsers';

// Helper function to get users from localStorage
const getUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  return users ? JSON.parse(users) : [];
};

// Helper function to save users to localStorage
const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const signup = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // Simulate network delay
      const users = getUsers();
      const existingUser = users.find(user => user.email === email);

      if (existingUser) {
        reject({ message: 'User already exists' });
      } else {
        // In a real app, hash the password before saving
        const newUser = { email, password }; // Storing password directly for mock purposes ONLY
        users.push(newUser);
        saveUsers(users);
        resolve({ user: { email: newUser.email } }); // Return only email, not password
      }
    }, 500);
  });
};

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { // Simulate network delay
      const users = getUsers();
      const user = users.find(u => u.email === email);

      if (user && user.password === password) { // In a real app, compare hashed passwords
        resolve({ user: { email: user.email } }); // Return only email
      } else {
        reject({ message: 'Invalid credentials' });
      }
    }, 500);
  });
};

export const logout = () => {
  return new Promise((resolve) => {
    setTimeout(() => { // Simulate network delay
      // No specific localStorage action needed for logout in this mock setup,
      // as frontend Redux state handles clearing session.
      resolve({ message: 'Logout successful' });
    }, 200);
  });
};
