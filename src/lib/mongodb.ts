import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  if (mongoose.connection.readyState === 1) { isConnected = true; return; }
  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
  } catch (err) {
    console.error('Error conectando a MongoDB:', err);
    throw err;
  }
}

const materiaSchema = new mongoose.Schema({
  nombre: String,
  nota: Number,
  estado: { type: String, enum: ['Aprobado', 'Cursando', 'Recuperatorio'] },
}, { _id: false });

const alumnoSchema = new mongoose.Schema({
  usuario:        { type: String, unique: true },
  contrasena:     String,
  nombre_completo: String,
  nombre_corto:   String,
  foto_url:       String,
  materias:       [materiaSchema],
});

export const Alumno = mongoose.models.Alumno || mongoose.model('Alumno', alumnoSchema);
