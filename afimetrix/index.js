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
  database: 'afimetrix3'
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

  



app.put('/estudiante/:estudianteId', (req, res) => {
  const estudianteId = req.params.estudianteId;
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

// Endpoint para agregar una matrícula
app.post('/matricula/agregar', (req, res) => {
  const { idEstudiante, idCurso, Anio } = req.body;

  // Insertar datos en la tabla matricula
  db.query('INSERT INTO matricula (idEstudiante, idCurso, Anio) VALUES (?, ?, ?)', [idEstudiante, idCurso, Anio], (err, result) => {
    if (err) {
      res.status(500).send('Error creating matricula');
      return;
    }
    res.status(201).json({ msg: 'Matricula created successfully', matriculaId: result.insertId });
  });
});









  /* EndPoins Profesor */
app.get('/profesor/', (req, res) => {
  db.query('SELECT * FROM profesor', (err, results) => {
    if (err) {
      res.status(500).send('Error fetching profesores');
      return;
    }
    res.json(results);
  });
});

app.post('/profesor/mp-agregar-profesor', (req, res) => {
  const { idProfesor, Nombre, Clave, idColegio, Tipo } = req.body;
  db.query('INSERT INTO profesor (idProfesor, Nombre, Clave, idColegio, Tipo) VALUES (?, ?, ?, ?, ?)', [idProfesor, Nombre, Clave, idColegio, Tipo], (err, result) => {
    if (err) {
      res.status(500).send('Error creating Profesor');
      return;
    }
    const profesorId = result.insertId;
    db.query('SELECT * FROM profesor WHERE idProfesor = ?', [profesorId], (err, result) => { // Cambiado a [profesorId]
      if (err) {
        res.status(500).send('Error fetching created profesores');
        return;
      }
      res.status(201).json(result[0]);
    });
  });
});

app.get('/profesor/:idProfesor', (req, res) => {
  const profesorId = req.params.idProfesor;
  db.query('SELECT * FROM profesor WHERE idProfesor = ?', profesorId, (err, result) => {
    if (err) {
      res.status(500).send('Error fetching profesores');
      return;
    }
    if (result.length === 0) {
      res.status(404).send('Profesor not found');
      return;
    }
    res.json(result[0]);
  });
});


app.put('/profesor/:profesorId', (req, res) => {
  const profesorId = req.params.profesorId; // Cambia de req.params.idProfesor a req.params.profesorId
  const { Nombre, Clave, idColegio, Tipo } = req.body;
  db.query('UPDATE profesor SET Nombre = ?, Clave = ?, idColegio = ?, Tipo = ? WHERE idProfesor = ?', [Nombre, Clave, idColegio, Tipo, profesorId], err => {
    if (err) {
      res.status(500).send('Error updating profesores');
      return;
    }
    db.query('SELECT * FROM profesor WHERE idProfesor = ?', profesorId, (err, result) => {
      if (err) {
        res.status(500).send('Error fetching updated profesores');
        return;
      }
      res.json(result[0]);
    });
  });
});


app.delete('/profesor/:idProfesor', (req, res) => {
  const profesorId = req.params.id;
  db.query('DELETE FROM profesor WHERE idProfesor = ?', profesorId, err => {
    if (err) {
      res.status(500).send('Error deleting profesores');
      return;
    }
    res.status(200).json({ msg: 'profesores deleted successfully' });
  });
});

  
  /* EndPoins Curso */
  app.get('/curso', (req, res) => {
    db.query('SELECT * FROM curso', (err, results) => {
      if (err) {
        res.status(500).send('Error fetching cursos');
        return;
      }
      res.json(results);
    });
  });
  
  app.post('/curso/agregar-curso', (req, res) => {
    const { idCurso,idProfesor,idColegio, Nombre} = req.body;
    db.query('INSERT INTO curso (idCurso,idProfesor,idColegio, Nombre) VALUES (?, ?, ?, ?)', [idCurso,idProfesor,idColegio, Nombre], (err, result) => {
      if (err) {
        res.status(500).send('Error creating curso');
        return;
      }
      const cursoId = result.insertId;
      db.query('SELECT * FROM curso WHERE idCurso = ?', cursoId, (err, result) => {
        if (err) {
          res.status(500).send('Error fetching created cursos');
          return;
        }
        res.status(201).json(result[0]);
      });
    });
  });
    
  app.get('/curso/:idCurso', (req, res) => {
    const cursoId = req.params.idCurso; // Corregir de req.params.id a req.params.idCurso
    db.query('SELECT * FROM curso WHERE idCurso = ?', cursoId, (err, result) => {
      if (err) {
        res.status(500).send('Error fetching curso');
        return;
      }
      if (result.length === 0) {
        res.status(404).send('Curso not found');
        return;
      }
      res.json(result[0]);
    });
  });
    
  app.put('/curso/:idCurso', (req, res) => {
    const cursoId = req.params.idCurso;
    const { idCurso,idProfesor,idColegio, Nombre} = req.body;
    db.query('UPDATE cursos SET idCurso = ?, idProfesor = ?, idColegio = ?, Nombre = ? WHERE idCurso = ?', [idCurso,idProfesor,idColegio, Nombre], err => {
      if (err) {
        res.status(500).send('Error updating estudiante');
        return;
      }
      db.query('SELECT * FROM curso WHERE idCurso = ?', cursoId, (err, result) => {
        if (err) {
          res.status(500).send('Error fetching updated estudiante');
          return;
        }
        res.json(result[0]);
      });
    });
  });
    
  app.delete('/curso/:idCurso', (req, res) => {
    const cursoId = req.params.idCurso; // Corregir de req.params.id a req.params.idCurso
    db.query('DELETE FROM curso WHERE idCurso = ?', cursoId, err => {
      if (err) {
        res.status(500).send('Error deleting curso');
        return;
      }
      res.status(200).json({ msg: 'Curso deleted successfully' });
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
  
// Endpoint para obtener los cursos de un colegio específico por idColegio
app.get('/colegio/:idColegio/cursos', (req, res) => {
  const colegioId = req.params.idColegio;
  db.query(
    'SELECT * FROM curso WHERE idColegio = ?',
    colegioId,
    (err, result) => {
      if (err) {
        res.status(500).send('Error fetching cursos');
        return;
      }
      res.json(result);
    }
  );
});

app.get('/colegio/:idColegio', (req, res) => {
  const colegioId = req.params.idColegio;
  db.query(
    `SELECT c.Nombre AS NombreColegio, ci.Nombre AS NombreCiudad, f.Nombre AS NombreFundacion 
    FROM colegio c 
    JOIN ciudad ci ON c.idCiudad = ci.idCiudad 
    JOIN fundacion f ON c.idFundacion = f.idFundacion 
    WHERE c.idColegio = ?`,
    colegioId,
    (err, result) => {
      if (err) {
        res.status(500).send('Error fetching colegio');
        return;
      }
      if (result.length === 0) {
        res.status(404).send('Colegio not found');
        return;
      }
      res.json(result[0]);
    }
  );
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


