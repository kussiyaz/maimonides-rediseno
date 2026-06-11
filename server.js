import express from 'express';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.static('public'));

// ─── Esquema ────────────────────────────────────────────────────────────────

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

const Alumno = mongoose.model('Alumno', alumnoSchema);

// ─── Seed ───────────────────────────────────────────────────────────────────

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
    console.log('Seed insertado: 10 alumnos de prueba');
  } else {
    console.log(`Base ya poblada (${count} alumnos), seed omitido`);
  }
}

// ─── Rutas ──────────────────────────────────────────────────────────────────

app.post('/api/login', async (req, res) => {
  const { usuario, contrasena } = req.body;
  if (!usuario || !contrasena) {
    return res.status(400).json({ error: 'Faltan usuario o contraseña' });
  }

  const alumno = await Alumno.findOne({ usuario, contrasena });
  if (!alumno) {
    return res.status(401).json({ error: 'Usuario o contraseña incorrectos' });
  }

  res.json({
    nombre_completo: alumno.nombre_completo,
    materias: alumno.materias,
  });
});

// ─── Arranque ───────────────────────────────────────────────────────────────

const PORT = process.env.PORT || 3000;
const URI  = process.env.MONGODB_URI || 'mongodb+srv://yazkussi_db_user:gbaPPKgOfWVgFqIL@cluster0.nulj3zc.mongodb.net/campus_umai?retryWrites=true&w=majority&appName=Cluster0';

mongoose
  .connect(URI)
  .then(async () => {
    console.log('Conectado a MongoDB Atlas');
    await seed();
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error conectando a MongoDB:', err);
    process.exit(1);
  });
