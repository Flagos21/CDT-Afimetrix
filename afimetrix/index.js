const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
  
const app = express();
const port = 3000;
  
/* MySQL Connection */
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'completoitaliano1',
  database: 'afimetrixp'
});
  
db.connect(err => {
  if (err) {
    throw err;
  }
  console.log('Connected to MySQL');
});
  
app.use(bodyParser.json());
app.use(cors());
  
app.get('/estudiante/', (req, res) => {
  db.query('SELECT * FROM estudiante', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching estudiantes');
      return;
    }
    res.json(results);
  });
});

app.post('/estudiante/me-agregar-estudiante', (req, res) => {
  const { idEstudiante, Nombre, FechaNacimiento, Sexo, Clave } = req.body;
  db.query('INSERT INTO estudiante (idEstudiante, Nombre, FechaNacimiento, Sexo, Clave) VALUES (?, ?, ?, ?, ?)', [idEstudiante, Nombre, FechaNacimiento, Sexo, Clave], (err, result) => {
    if (err) {
      res.status(500).send('Error creating estudiante');
      return;
    }
    const estudianteId = result.insertId;
    db.query('SELECT * FROM estudiante WHERE idEstudiante = ?', estudianteId, (err, result) => {
      if (err) {
        res.status(500).send('Error fetching created estudiante');
        return;
      }
      res.status(201).json(result[0]);
    });
  });
});
  
app.get('/estudiante/:idEstudiante', (req, res) => {
  const estudianteId = req.params.idEstudiante;
  db.query('SELECT * FROM estudiante WHERE idEstudiante = ?', estudianteId, (err, result) => {
    if (err) {
      res.status(500).send('Error fetching estudiante');
      return;
    }
    if (result.length === 0) {
      res.status(404).send('Estudiante not found');
      return;
    }
    res.json(result[0]);
  });
});

  
// Cambiar DELETE FROM estudiantes a DELETE FROM estudiante
app.delete('/estudiante/:idEstudiante', (req, res) => {
  const estudianteId = req.params.idEstudiante;
  db.query('DELETE FROM estudiante WHERE idEstudiante = ?', estudianteId, err => {
    if (err) {
      res.status(500).send('Error deleting estudiante');
      return;
    }
    res.status(200).json({ msg: 'Estudiante deleted successfully' });
  });
});


app.put('/estudiante/:estudianteId', (req, res) => {
  const estudianteId = req.params.estudianteId; // Corregir de req.params.idEstudiante a req.params.estudianteId
  const { Nombre, FechaNacimiento, Sexo, Clave } = req.body;
  db.query('UPDATE estudiante SET Nombre = ?, FechaNacimiento = ?, Sexo = ?, Clave = ? WHERE idEstudiante = ?', [Nombre, FechaNacimiento, Sexo, Clave, estudianteId], err => {
    if (err) {
      res.status(500).send('Error updating estudiante');
      return;
    }
    db.query('SELECT * FROM estudiante WHERE idEstudiante = ?', estudianteId, (err, result) => {
      if (err) {
        res.status(500).send('Error fetching updated estudiante');
        return;
      }
      res.json(result[0]);
    });
  });
});









  /* EndPoins Profesor */
  app.get('/profesores/', (req, res) => {
    db.query('SELECT * FROM profesores', (err, results) => {
      if (err) {
        res.status(500).send('Error fetching profesores');
        return;
      }
      res.json(results);
    });
  });
  
  app.post('/profesores/mp-agregar-profesor', (req, res) => {
    const { idProfesor, Nombre, Clave} = req.body;
    db.query('INSERT INTO profesores (idProfesor, Nombre, Clave) VALUES (?, ?, ?)', [idProfesor, Nombre, Clave], (err, result) => {
      if (err) {
        res.status(500).send('Error creating curso');
        return;
      }
      const profesorId = result.insertId;
      db.query('SELECT * FROM profesores WHERE id = ?', profesorId, (err, result) => {
        if (err) {
          res.status(500).send('Error fetching created profesores');
          return;
        }
        res.status(201).json(result[0]);
      });
    });
  });
    
  app.get('/profesores/:id', (req, res) => {
    const profesorId = req.params.id;
    db.query('SELECT * FROM profesores WHERE id = ?', profesorId, (err, result) => {
      if (err) {
        res.status(500).send('Error fetching profesores');
        return;
      }
      if (result.length === 0) {
        res.status(404).send('cursos not found');
        return;
      }
      res.json(result[0]);
    });
  });
    
  app.put('/profesores/:id', (req, res) => {
    const profesorId = req.params.id;
    const { idProfesor, Nombre, Clave } = req.body;
    db.query('UPDATE profesores SET idProfesor = ?, Nombre = ?, Clave = ?, WHERE id = ?', [idProfesor, Nombre, Clave], err => {
      if (err) {
        res.status(500).send('Error updating profesores');
        return;
      }
      db.query('SELECT * FROM profesores WHERE id = ?', idProfesor, (err, result) => {
        if (err) {
          res.status(500).send('Error fetching updated profesores');
          return;
        }
        res.json(result[0]);
      });
    });
  });
    
  app.delete('/profesores/:id', (req, res) => {
    const cursoId = req.params.id;
    db.query('DELETE FROM profesores WHERE id = ?', cursoId, err => {
      if (err) {
        res.status(500).send('Error deleting profesores');
        return;
      }
      res.status(200).json({ msg: 'profesores deleted successfully' });
    });
  });
  /* EndPoins Curso */
  app.get('/cursos', (req, res) => {
    db.query('SELECT * FROM cursos', (err, results) => {
      if (err) {
        res.status(500).send('Error fetching cursos');
        return;
      }
      res.json(results);
    });
  });
  
  app.post('/cursos/agregar-curso', (req, res) => {
    const { IdCurso,IdProfesor,IdColegio, Nombre} = req.body;
    db.query('INSERT INTO cursos (IdCurso,IdProfesor,IdColegio, Nombre) VALUES (?, ?, ?, ?)', [IdCurso,IdProfesor,IdColegio, Nombre], (err, result) => {
      if (err) {
        res.status(500).send('Error creating curso');
        return;
      }
      const cursoId = result.insertId;
      db.query('SELECT * FROM cursos WHERE id = ?', cursoId, (err, result) => {
        if (err) {
          res.status(500).send('Error fetching created cursos');
          return;
        }
        res.status(201).json(result[0]);
      });
    });
  });
    
  app.get('/cursos/:id', (req, res) => {
    const cursoId = req.params.id;
    db.query('SELECT * FROM cursos WHERE id = ?', cursoId, (err, result) => {
      if (err) {
        res.status(500).send('Error fetching estudiante');
        return;
      }
      if (result.length === 0) {
        res.status(404).send('cursos not found');
        return;
      }
      res.json(result[0]);
    });
  });
    
  app.put('/cursos/:id', (req, res) => {
    const cursoId = req.params.id;
    const { IdCurso,IdProfesor,IdColegio, Nombre} = req.body;
    db.query('UPDATE cursos SET IdCurso = ?, IdProfesor = ?, IdColegio = ?, Nombre = ? WHERE id = ?', [IdCurso,IdProfesor,IdColegio, Nombre], err => {
      if (err) {
        res.status(500).send('Error updating estudiante');
        return;
      }
      db.query('SELECT * FROM cursos WHERE id = ?', cursoId, (err, result) => {
        if (err) {
          res.status(500).send('Error fetching updated estudiante');
          return;
        }
        res.json(result[0]);
      });
    });
  });
    
  app.delete('/cursos/:id', (req, res) => {
    const cursoId = req.params.id;
    db.query('DELETE FROM cursos WHERE id = ?', cursoId, err => {
      if (err) {
        res.status(500).send('Error deleting cursos');
        return;
      }
      res.status(200).json({ msg: 'curso deleted successfully' });
    });
  });




















  /* EndPoins Colegio */
  app.get('/colegio', (req, res) => {
    db.query('SELECT * FROM colegio', (err, results) => {
      if (err) {
        res.status(500).send('Error fetching colegio');
        return;
      }
      res.json(results);
    });
  });
  
  app.post('/colegio/agregar-colegio', (req, res) => {
    const { idColegio, Nombre, idFundacion, idCiudad } = req.body;
    db.query('INSERT INTO colegio (idColegio, Nombre, idCiudad, idFundacion) VALUES (?, ?, ?, ?)', [idColegio, Nombre, idFundacion, idCiudad], (err, result) => {
      if (err) {
        res.status(500).send('Error creating colegio');
        return;
      }
      const colegioId = result.insertId;
      db.query('SELECT * FROM colegio WHERE idColegio = ?', colegioId, (err, result) => {
        if (err) {
          res.status(500).send('Error fetching created colegio');
          return;
        }
        res.status(201).json(result[0]);
      });
    });
  });
  
  app.get('/colegio/:idColegio', (req, res) => {
    const colegioId = req.params.idColegio;
    db.query('SELECT * FROM colegio WHERE idColegio = ?', colegioId, (err, result) => {
      if (err) {
        res.status(500).send('Error fetching colegio');
        return;
      }
      if (result.length === 0) {
        res.status(404).send('Colegio not found');
        return;
      }
      res.json(result[0]);
    });
  });
  
  app.put('/colegio/:idColegio', (req, res) => {
    const colegioId = req.params.idColegio;
    const { idColegio, Nombre, idCiudad, idFundacion } = req.body;
    db.query('UPDATE colegio SET idColegio = ?, Nombre = ?, idCiudad = ?, idFundacion = ? WHERE id = ?', [idColegio, Nombre, idCiudad, idFundacion, colegioId], err => {
      if (err) {
        res.status(500).send('Error updating colegio');
        return;
      }
      db.query('SELECT * FROM colegio WHERE idColegio = ?', colegioId, (err, result) => {
        if (err) {
          res.status(500).send('Error fetching updated colegio');
          return;
        }
        res.json(result[0]);
      });
    });
  });
  
  app.delete('/colegio/:idColegio', (req, res) => {
    const colegioId = req.params.id;
    db.query('DELETE FROM colegio WHERE idColegio = ?', colegioId, err => {
      if (err) {
        res.status(500).send('Error deleting colegio');
        return;
      }
      res.status(200).json({ msg: 'Colegio deleted successfully' });
    });
  });
  

  //lo de ciudad*/
  app.get('/ciudad', (req, res) => {
    db.query('SELECT * FROM ciudad', (err, results) => {
      if (err) {
        res.status(500).send('Error fetching ciudad');
        return;
      }
      res.json(results);
    });
  });

  app.get('/ciudad/:idCiudad', (req, res) => {
    const ciudadId = req.params.idCiudad;
    db.query('SELECT * FROM ciudad WHERE idCiudad = ?', ciudadId, (err, result) => {
      if (err) {
        res.status(500).send('Error fetching ciudad');
        return;
      }
      if (result.length === 0) {
        res.status(404).send('Ciudad not found');
        return;
      }
      res.json(result[0]);
    });
  });

  // lo de fundacion
  app.get('/fundacion', (req, res) => {
    db.query('SELECT * FROM fundacion', (err, results) => {
      if (err) {
        res.status(500).send('Error fetching fundacion');
        return;
      }
      res.json(results);
    });
  });

  app.get('/fundacion/:idFundacion', (req, res) => {
    const fundacionId = req.params.idFundacion;
    db.query('SELECT * FROM fundacion WHERE idFundacion = ?', fundacionId, (err, result) => {
      if (err) {
        res.status(500).send('Error fetching fundacion');
        return;
      }
      if (result.length === 0) {
        res.status(404).send('Fundacion not found');
        return;
      }
      res.json(result[0]);
    });
  });


/* Start server */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


