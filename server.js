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
    materias: [
      { nombre: 'Matemática I',     nota: 10, estado: 'Aprobado' },
      { nombre: 'Física I',         nota: 9,  estado: 'Aprobado' },
      { nombre: 'Programación II',  nota: 8,  estado: 'Aprobado' },
    ],
  },
  {
    usuario: 'karen',
    contrasena: 'alumno123',
    nombre_completo: 'Karen Torres',
    materias: [
      { nombre: 'Base de Datos',    nota: 9,  estado: 'Aprobado' },
      { nombre: 'Redes',            nota: 7,  estado: 'Cursando' },
      { nombre: 'Sistemas Operativos', nota: 5, estado: 'Recuperatorio' },
      { nombre: 'Ética Profesional', nota: 8,  estado: 'Aprobado' },
    ],
  },
  {
    usuario: 'tamara',
    contrasena: 'alumno123',
    nombre_completo: 'Tamara Díaz',
    materias: [
      { nombre: 'Matemática II',    nota: 8,  estado: 'Aprobado' },
      { nombre: 'Programación I',   nota: 9,  estado: 'Aprobado' },
      { nombre: 'Física II',        nota: 6,  estado: 'Cursando' },
      { nombre: 'Redes',            nota: 4,  estado: 'Recuperatorio' },
    ],
  },
  {
    usuario: 'facundo',
    contrasena: 'alumno123',
    nombre_completo: 'Facundo Ruiz',
    materias: [
      { nombre: 'Álgebra',          nota: 7,  estado: 'Cursando' },
      { nombre: 'Programación II',  nota: 6,  estado: 'Cursando' },
      { nombre: 'Base de Datos',    nota: 8,  estado: 'Aprobado' },
      { nombre: 'Inglés Técnico',   nota: 5,  estado: 'Recuperatorio' },
    ],
  },
  {
    usuario: 'dahiana',
    contrasena: 'alumno123',
    nombre_completo: 'Dahiana Mendoza',
    materias: [
      { nombre: 'Matemática I',     nota: 9,  estado: 'Aprobado' },
      { nombre: 'Programación I',   nota: 10, estado: 'Aprobado' },
      { nombre: 'Física I',         nota: 8,  estado: 'Aprobado' },
      { nombre: 'Sistemas Operativos', nota: 7, estado: 'Cursando' },
    ],
  },
  {
    usuario: 'franco',
    contrasena: 'alumno123',
    nombre_completo: 'Franco Castillo',
    materias: [
      { nombre: 'Redes',            nota: 6,  estado: 'Cursando' },
      { nombre: 'Programación I',   nota: 5,  estado: 'Recuperatorio' },
      { nombre: 'Matemática II',    nota: 7,  estado: 'Cursando' },
      { nombre: 'Química',          nota: 4,  estado: 'Recuperatorio' },
    ],
  },
  {
    usuario: 'melina',
    contrasena: 'alumno123',
    nombre_completo: 'Melina Rivas',
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
