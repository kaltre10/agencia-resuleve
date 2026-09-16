require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./src/models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4,
    });
    console.log('Conectado a MongoDB');

    const existingAdmin = await User.findOne({ email: 'admin@example.com' });

    if (existingAdmin) {
      console.log('El usuario admin ya existe');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash('admin123', 12);

    const admin = await User.create({
      name: 'Administrador',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      isActive: true,
    });

    console.log('Usuario admin creado:', {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
    });

    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
