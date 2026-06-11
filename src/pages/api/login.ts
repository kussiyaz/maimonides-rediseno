import type { APIRoute } from 'astro';
import mongoose from 'mongoose';

const materiaSchema = new mongoose.Schema({
  nombre: String,
  nota: Number,
  estado: { type: String, enum: ['Aprobado', 'Cursando', 'Recuperatorio'] },
}, { _id: false });

const alumnoSchema = new mongoose.Schema({
  usuario:        { type: String, unique: true },
  contrasena:     String,
  nombre_completo: String,
  materias:       [materiaSchema],
});

const Alumno = mongoose.models.Alumno || mongoose.model('Alumno', alumnoSchema);

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    return new Response(JSON.stringify({ error: 'MONGODB_URI no configurada' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGODB_URI);
    }

    const body = await request.json();
    const { usuario, contrasena } = body;

    if (!usuario || !contrasena) {
      return new Response(JSON.stringify({ error: 'Faltan usuario o contraseña' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const alumno = await Alumno.findOne({ usuario, contrasena });
    if (!alumno) {
      return new Response(JSON.stringify({ error: 'Usuario o contraseña incorrectos' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({
      nombre_completo: alumno.nombre_completo,
      materias: alumno.materias,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error en login:', err);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
