import jwt from 'jsonwebtoken';

// Get the secret key and expiration time from environment variables
const SECRET_KEY = process.env.JWT_SECRET;
const EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Log the secret key to verify it's being read
console.log("JWT Secret Key:", SECRET_KEY); // Temporarily log the secret key
console.log("Process ENV:", process.env.JWT_SECRET); // Log the JWT secret


// Function to generate a token
export const generateJWT = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: EXPIRES_IN, // Use the expiration time from the environment
  });
};

// Function to verify a token
export const verifyJWT = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (err) {
    return null; // Return null if verification fails
  }
};
