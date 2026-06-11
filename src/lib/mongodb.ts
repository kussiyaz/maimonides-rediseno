import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Falta la variable de entorno MONGODB_URI');
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log('Conectado a MongoDB Atlas');
  } catch (err) {
    console.error('Error conectando a MongoDB:', err);
    throw err;
  }
}
