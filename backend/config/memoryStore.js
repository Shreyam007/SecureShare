const bcrypt = require('bcryptjs');

// Global mock memory tables to handle database whitelist errors gracefully
const users = [
  {
    _id: 'mock-user-123',
    name: 'Secure User',
    email: 'janedoe_test1@example.com',
    // Pre-hash password123
    passwordHash: bcrypt.hashSync('password123', 10),
    createdAt: new Date()
  },
  {
    _id: 'mock-google-id',
    name: 'Google User',
    email: 'googleuser@example.com',
    createdAt: new Date()
  },
  {
    _id: 'mock-saml-id',
    name: 'Enterprise User',
    email: 'enterprise@company.com',
    createdAt: new Date()
  }
];

const files = [];

module.exports = {
  users,
  files
};
