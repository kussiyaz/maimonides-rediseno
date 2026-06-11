import alumnos from '../../alumnos_mock.json' assert { type: 'json' };

export function getAlumnoById(id) {
  return alumnos.find(
    (a) => a._id.$oid === id || a.legajo === id
  ) || null;
}

export function getAlumnosPorMateria(nombreMateria) {
  const regex = new RegExp(nombreMateria.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'), 'i');
  return alumnos.filter((a) =>
    a.materias.some((m) => m.estado === 'cursando' && regex.test(m.nombre))
  );
}
