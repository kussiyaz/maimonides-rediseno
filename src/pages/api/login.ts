import type { APIRoute } from 'astro';
import { connectDB, Alumno } from '../../lib/mongodb';

export const prerender = false;

const alumnosSeed = [
  {
    usuario: 'yazmin',
    contrasena: 'alumno123',
    nombre_completo: 'Yazmin Kussi',
    nombre_corto: 'Yazmin',
    foto_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    materias: [
      { nombre: 'Matemática I',     nota: 9,  estado: 'Aprobado' },
      { nombre: 'Programación I',   nota: 10, estado: 'Aprobado' },
      { nombre: 'Inglés Técnico',   nota: 8,  estado: 'Aprobado' },
      { nombre: 'Base de Datos',    nota: 7,  estado: 'Cursando' },
    ],
  },
  {
    usuario: 'camila',
    contrasena: 'alumno123',
    nombre_completo: 'Camila Gómez',
    nombre_corto: 'Camila',
    foto_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face',
    materias: [
      { nombre: 'Matemática II',    nota: 6,  estado: 'Cursando' },
      { nombre: 'Programación II',  nota: 9,  estado: 'Aprobado' },
      { nombre: 'Física I',         nota: 4,  estado: 'Recuperatorio' },
      { nombre: 'Álgebra',          nota: 8,  estado: 'Aprobado' },
    ],
  },
  {
    usuario: 'lucas',
    contrasena: 'alumno123',
    nombre_completo: 'Lucas Fernández',
    nombre_corto: 'Lucas',
    foto_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    materias: [
      { nombre: 'Programación I',   nota: 7,  estado: 'Cursando' },
      { nombre: 'Álgebra',          nota: 5,  estado: 'Recuperatorio' },
      { nombre: 'Inglés Técnico',   nota: 6,  estado: 'Cursando' },
      { nombre: 'Química',          nota: 8,  estado: 'Aprobado' },
    ],
  },
  {
    usuario: 'luciano',
    contrasena: 'alumno123',
    nombre_completo: 'Luciano Martínez',
    nombre_corto: 'Luciano',
    foto_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    materias: [
      { nombre: 'Matemática I',     nota: 10, estado: 'Aprobado' },
      { nombre: 'Física I',         nota: 9,  estado: 'Aprobado' },
      { nombre: 'Programación II',  nota: 8,  estado: 'Aprobado' },
    ],
  },
  {
    usuario: 'melina',
    contrasena: 'alumno123',
    nombre_completo: 'Melina Rivas',
    nombre_corto: 'Melina',
    foto_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face',
    materias: [
      { nombre: 'Base de Datos',    nota: 10, estado: 'Aprobado' },
      { nombre: 'Programación II',  nota: 9,  estado: 'Aprobado' },
      { nombre: 'Ética Profesional', nota: 8, estado: 'Aprobado' },
      { nombre: 'Física II',        nota: 7,  estado: 'Cursando' },
    ],
  },
];

async function seed() {
  const count = await Alumno.countDocuments();
  if (count === 0) {
    await Alumno.insertMany(alumnosSeed);
    console.log('Seed insertado: 5 alumnos de prueba');
  }
}

export const POST: APIRoute = async ({ request }) => {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (!MONGODB_URI) {
    return new Response(JSON.stringify({ error: 'MONGODB_URI no configurada' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    await connectDB();
    await seed();

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
      usuario: alumno.usuario,
      nombre_completo: alumno.nombre_completo,
      nombre_corto: alumno.nombre_corto,
      foto_url: alumno.foto_url,
      materias: alumno.materias,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Error en login:', err);
    const errorMessage = (err instanceof Error) ? err.message : 'Error interno del servidor';
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
