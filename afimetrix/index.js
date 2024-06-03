const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = 3000;

/* MySQL Connection */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "afimetrixprueba",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("Connected to MySQL");
});

app.use(bodyParser.json());
app.use(cors());

app.get("/estudiante/", (req, res) => {
  const query = `
    SELECT e.*, m.idMatricula, m.Anio AS AnioMatricula, m.idCurso
    FROM estudiante e
    LEFT JOIN matricula m ON e.idEstudiante = m.idEstudiante
  `;
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching students data");
    }
    res.json(results);
  });
});

app.post('/estudiante/me-agregar-estudiante', (req, res) => {
  const { idEstudiante, Nombre, FechaNacimiento, Sexo, Clave, Anio, idCurso } = req.body;
  db.beginTransaction(err => {
    if (err) {
      console.error('Error initiating transaction:', err);
      return res.status(500).send('Error initiating transaction');
    }

    // Insertar estudiante en la tabla estudiante
    db.query('INSERT INTO estudiante (idEstudiante, Nombre, FechaNacimiento, Sexo, Clave) VALUES (?, ?, ?, ?, ?)', 
      [idEstudiante, Nombre, FechaNacimiento, Sexo, Clave], 
      (err, result) => {
        if (err) {
          db.rollback(() => {
            console.error('Error creating estudiante:', err);
            res.status(500).send('Error creating estudiante');
          });
          return;
        }
        
        // Insertar matrícula en la tabla matricula
        db.query('INSERT INTO matricula (idEstudiante, Anio, idCurso) VALUES (?, ?, ?)', 
          [idEstudiante, Anio, idCurso], 
          (err, result) => {
            if (err) {
              db.rollback(() => {
                console.error('Error creating matrícula:', err);
                res.status(500).send('Error creating matrícula');
              });
              return;
            }

            const idMatricula = result.insertId;

            db.commit(err => {
              if (err) {
                db.rollback(() => {
                  console.error('Error committing transaction:', err);
                  res.status(500).send('Error committing transaction');
                });
                return;
              }

              res.status(201).json({ msg: 'Estudiante and matrícula created successfully', idMatricula });
            });
          }
        );
      }
    );
  });
});

app.get("/estudiante/:idEstudiante", (req, res) => {
  const estudianteId = req.params.idEstudiante;
  const query = `
    SELECT e.*, m.idMatricula, m.Anio AS AnioMatricula, m.idCurso
    FROM estudiante e
    LEFT JOIN matricula m ON e.idEstudiante = m.idEstudiante
    WHERE e.idEstudiante = ?
  `;
  db.query(query, [estudianteId], (err, results) => {
    if (err) {
      return res.status(500).send("Error fetching student data");
    }
    if (results.length === 0) {
      return res.status(404).send("Student not found");
    }
    res.json(results[0]); // Enviar solo el primer resultado
  });
});

app.put("/estudiante/:idEstudiante", (req, res) => {
  const estudianteId = req.params.idEstudiante;
  const {
    idEstudiante,
    Nombre,
    FechaNacimiento,
    Sexo,
    Clave,
    Anio,
    idCurso,
    idMatricula,
  } = req.body;

  db.beginTransaction((err) => {
    if (err) {
      return res.status(500).send("Error initiating transaction");
    }

    const updateEstudianteQuery = `
      UPDATE estudiante
      SET idEstudiante = ?, Nombre = ?, FechaNacimiento = ?, Sexo = ?, Clave = ?
      WHERE idEstudiante = ?
    `;
    const updateEstudianteParams = [
      idEstudiante,
      Nombre,
      FechaNacimiento,
      Sexo,
      Clave,
      estudianteId,
    ];

    db.query(updateEstudianteQuery, updateEstudianteParams, (err, result) => {
      if (err) {
        return db.rollback(() => {
          res.status(500).send("Error updating estudiante");
        });
      }

      const updateMatriculaQuery = `
        UPDATE matricula
        SET idEstudiante = ?, Anio = ?, idCurso = ?, idMatricula = ?
        WHERE idEstudiante = ?
      `;
      const updateMatriculaParams = [
        idEstudiante,
        Anio,
        idCurso,
        idMatricula,
        estudianteId,
      ];

      db.query(updateMatriculaQuery, updateMatriculaParams, (err, result) => {
        if (err) {
          return db.rollback(() => {
            res.status(500).send("Error updating matricula");
          });
        }

        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              res.status(500).send("Error committing transaction");
            });
          }
          res.status(200).json({ msg: "Estudiante updated successfully" });
        });
      });
    });
  });
});

/* EndPoins Profesor */
app.get("/profesor/", (req, res) => {
  db.query("SELECT * FROM profesor", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching profesores");
      return;
    }
    res.json(results);
  });
});

app.post("/profesor/mp-agregar-profesor", (req, res) => {
  const { idProfesor, Nombre, Clave, idColegio, Tipo } = req.body;
  db.query(
    "INSERT INTO profesor (idProfesor, Nombre, Clave, idColegio, Tipo) VALUES (?, ?, ?, ?, ?)",
    [idProfesor, Nombre, Clave, idColegio, Tipo],
    (err, result) => {
      if (err) {
        res.status(500).send("Error creating Profesor");
        return;
      }
      const profesorId = result.insertId;
      db.query(
        "SELECT * FROM profesor WHERE idProfesor = ?",
        [profesorId],
        (err, result) => {
          // Cambiado a [profesorId]
          if (err) {
            res.status(500).send("Error fetching created profesores");
            return;
          }
          res.status(201).json(result[0]);
        }
      );
    }
  );
});

app.get("/profesor/:idProfesor", (req, res) => {
  const profesorId = req.params.idProfesor;
  db.query(
    "SELECT * FROM profesor WHERE idProfesor = ?",
    profesorId,
    (err, result) => {
      if (err) {
        res.status(500).send("Error fetching profesores");
        return;
      }
      if (result.length === 0) {
        res.status(404).send("Profesor not found");
        return;
      }
      res.json(result[0]);
    }
  );
});

app.put("/profesor/:profesorId", (req, res) => {
  const profesorId = req.params.profesorId; // Cambia de req.params.idProfesor a req.params.profesorId
  const { Nombre, Clave, idColegio, Tipo } = req.body;
  db.query(
    "UPDATE profesor SET Nombre = ?, Clave = ?, idColegio = ?, Tipo = ? WHERE idProfesor = ?",
    [Nombre, Clave, idColegio, Tipo, profesorId],
    (err) => {
      if (err) {
        res.status(500).send("Error updating profesores");
        return;
      }
      db.query(
        "SELECT * FROM profesor WHERE idProfesor = ?",
        profesorId,
        (err, result) => {
          if (err) {
            res.status(500).send("Error fetching updated profesores");
            return;
          }
          res.json(result[0]);
        }
      );
    }
  );
});

/* EndPoins Curso */
app.get("/curso", (req, res) => {
  db.query("SELECT * FROM curso", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching cursos");
      return;
    }
    res.json(results);
  });
});

app.post("/curso/agregar-curso", (req, res) => {
  const { idProfesor, idColegio, Nombre } = req.body;
  db.query(
    "INSERT INTO curso (idProfesor, idColegio, Nombre) VALUES (?, ?, ?)",
    [idProfesor, idColegio, Nombre],
    (err, result) => {
      if (err) {
        res.status(500).send("Error creating curso");
        return;
      }
      const cursoId = result.insertId;
      db.query(
        "SELECT * FROM curso WHERE idCurso = ?",
        [cursoId],
        (err, result) => {
          if (err) {
            res.status(500).send("Error fetching created curso");
            return;
          }
          res.status(201).json(result[0]);
        }
      );
    }
  );
});


app.get("/curso/:idCurso", (req, res) => {
  const cursoId = req.params.idCurso;
  db.query(
    "SELECT * FROM curso WHERE idCurso = ?",
    [cursoId],
    (err, result) => {
      if (err) {
        res.status(500).send("Error fetching curso");
        return;
      }
      if (result.length === 0) {
        res.status(404).send("Curso not found");
        return;
      }
      res.json(result[0]);
    }
  );
});

app.put("/curso/:idCurso", (req, res) => {
  const cursoId = req.params.idCurso;
  const { idCurso, idProfesor, idColegio, Nombre } = req.body;
  db.query(
    "UPDATE curso SET idCurso = ?, idProfesor = ?, idColegio = ?, Nombre = ? WHERE idCurso = ?",
    [idCurso, idProfesor, idColegio, Nombre, cursoId],
    (err) => {
      if (err) {
        res.status(500).send("Error updating curso");
        return;
      }
      db.query(
        "SELECT * FROM curso WHERE idCurso = ?",
        [cursoId],
        (err, result) => {
          if (err) {
            res.status(500).send("Error fetching updated curso");
            return;
          }
          res.json(result[0]);
        }
      );
    }
  );
});

app.delete("/curso/:idCurso", (req, res) => {
  const cursoId = req.params.idCurso;
  db.query("DELETE FROM curso WHERE idCurso = ?", [cursoId], (err) => {
    if (err) {
      res.status(500).send("Error deleting curso");
      return;
    }
    res.status(200).json({ msg: "Curso deleted successfully" });
  });
});

/* EndPoins Colegio */
app.get("/colegio", (req, res) => {
  db.query("SELECT * FROM colegio", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching colegios");
      return;
    }
    res.json(results);
  });
});

app.post("/colegio/agregar-colegio", (req, res) => {
  const { Nombre, idFundacion, idCiudad } = req.body;
  db.query(
    "INSERT INTO colegio (Nombre, idCiudad, idFundacion) VALUES (?, ?, ?, ?)",
    [Nombre, idCiudad, idFundacion],
    (err, result) => {
      if (err) {
        res.status(500).send("Error creating colegio");
        return;
      }
      const colegioId = result.insertId;
      db.query(
        "SELECT * FROM colegio WHERE idColegio = ?",
        [colegioId],
        (err, result) => {
          if (err) {
            res.status(500).send("Error fetching created colegio");
            return;
          }
          res.status(201).json(result[0]);
        }
      );
    }
  );
});

// Endpoint para obtener los cursos de un colegio específico por idColegio
app.get("/colegio/:idColegio/cursos", (req, res) => {
  const colegioId = req.params.idColegio;
  db.query(
    "SELECT * FROM curso WHERE idColegio = ?",
    [colegioId],
    (err, result) => {
      if (err) {
        res.status(500).send("Error fetching cursos");
        return;
      }
      res.json(result);
    }
  );
});

app.get("/colegio/:idColegio", (req, res) => {
  const colegioId = req.params.idColegio;
  db.query(
    `SELECT c.Nombre AS NombreColegio, ci.Nombre AS NombreCiudad, f.Nombre AS NombreFundacion 
            FROM colegio c 
            JOIN ciudad ci ON c.idCiudad = ci.idCiudad 
            JOIN fundacion f ON c.idFundacion = f.idFundacion 
            WHERE c.idColegio = ?`,
    [colegioId],
    (err, result) => {
      if (err) {
        res.status(500).send("Error fetching colegio");
        return;
      }
      if (result.length === 0) {
        res.status(404).send("Colegio not found");
        return;
      }
      res.json(result[0]);
    }
  );
});

app.put("/colegio/:idColegio", (req, res) => {
  const colegioId = req.params.idColegio;
  const { idColegio, Nombre, idCiudad, idFundacion } = req.body;
  db.query(
    "UPDATE colegio SET idColegio = ?, Nombre = ?, idCiudad = ?, idFundacion = ? WHERE idColegio = ?",
    [idColegio, Nombre, idCiudad, idFundacion, colegioId],
    (err) => {
      if (err) {
        res.status(500).send("Error updating colegio");
        return;
      }
      db.query(
        "SELECT * FROM colegio WHERE idColegio = ?",
        [colegioId],
        (err, result) => {
          if (err) {
            res.status(500).send("Error fetching updated colegio");
            return;
          }
          res.json(result[0]);
        }
      );
    }
  );
});

app.delete("/colegio/:idColegio", (req, res) => {
  const colegioId = req.params.idColegio;
  db.query("DELETE FROM colegio WHERE idColegio = ?", [colegioId], (err) => {
    if (err) {
      res.status(500).send("Error deleting colegio");
      return;
    }
    res.status(200).json({ msg: "Colegio deleted successfully" });
  });
});

app.put("/colegio/:idColegio", (req, res) => {
  const colegioId = req.params.idColegio;
  const { idColegio, Nombre, idCiudad, idFundacion } = req.body;
  db.query(
    "UPDATE colegio SET idColegio = ?, Nombre = ?, idCiudad = ?, idFundacion = ? WHERE id = ?",
    [idColegio, Nombre, idCiudad, idFundacion, colegioId],
    (err) => {
      if (err) {
        res.status(500).send("Error updating colegio");
        return;
      }
      db.query(
        "SELECT * FROM colegio WHERE idColegio = ?",
        colegioId,
        (err, result) => {
          if (err) {
            res.status(500).send("Error fetching updated colegio");
            return;
          }
          res.json(result[0]);
        }
      );
    }
  );
});

app.delete("/colegio/:idColegio", (req, res) => {
  const colegioId = req.params.id;
  db.query("DELETE FROM colegio WHERE idColegio = ?", colegioId, (err) => {
    if (err) {
      res.status(500).send("Error deleting colegio");
      return;
    }
    res.status(200).json({ msg: "Colegio deleted successfully" });
  });
});

//lo de ciudad*/
app.get("/ciudad", (req, res) => {
  db.query("SELECT * FROM ciudad", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching ciudad");
      return;
    }
    res.json(results);
  });
});

app.get("/ciudad/:idCiudad", (req, res) => {
  const ciudadId = req.params.idCiudad;
  db.query(
    "SELECT * FROM ciudad WHERE idCiudad = ?",
    ciudadId,
    (err, result) => {
      if (err) {
        res.status(500).send("Error fetching ciudad");
        return;
      }
      if (result.length === 0) {
        res.status(404).send("Ciudad not found");
        return;
      }
      res.json(result[0]);
    }
  );
});

// lo de fundacion
app.get("/fundacion", (req, res) => {
  db.query("SELECT * FROM fundacion", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching fundacion");
      return;
    }
    res.json(results);
  });
});

app.get("/fundacion/:idFundacion", (req, res) => {
  const fundacionId = req.params.idFundacion;
  db.query(
    "SELECT * FROM fundacion WHERE idFundacion = ?",
    fundacionId,
    (err, result) => {
      if (err) {
        res.status(500).send("Error fetching fundacion");
        return;
      }
      if (result.length === 0) {
        res.status(404).send("Fundacion not found");
        return;
      }
      res.json(result[0]);
    }
  );
});

/* EndPoins Encuesta */
app.get("/detalleencuesta", (req, res) => {
  db.query("SELECT * FROM detalleencuesta", (err, results) => {
    if (err) {
      res.status(500).send("Error fetching detalleencuesta");
      return;
    }
    res.json(results);
  });
});
app.post("/detalleencuesta/crear-encuesta", (req, res) => {
  const {
    Tipo,
    FechaInicio,
    FechaFin,
    Nombre,
    idCurso,
  } = req.body;
  db.query(
    "INSERT INTO detalleencuesta (Tipo, FechaInicio, FechaFin, Nombre, idCurso) VALUES (?, ?, ?, ?, ?)",
    [Tipo, FechaInicio, FechaFin, Nombre, idCurso],
    (err, result) => {
      if (err) {
        res.status(500).send("Error creating DetalleEncuesta");
        return;
      }
      const detalleEncuestaId = result.insertId;
      db.query(
        "SELECT * FROM detalleencuesta WHERE idDetalleEncuesta = ?",
        [detalleEncuestaId],
        (err, result) => {
          if (err) {
            res.status(500).send("Error fetching created DetalleEncuesta");
            return;
          }
          res.status(201).json(result[0]);
        }
      );
    }
  );
});
app.get("/detalleencuesta/:idDetalleEncuesta", (req, res) => {
  const idDetalleEncuesta = req.params.idDetalleEncuesta;
  db.query(
    "SELECT * FROM detalleencuesta WHERE idDetalleEncuesta = ?",
    idDetalleEncuesta,
    (err, result) => {
      if (err) {
        res.status(500).send("Error fetching DetalleEncuesta");
        return;
      }
      if (result.length === 0) {
        res.status(404).send("DetalleEncuesta not found");
        return;
      }
      res.json(result[0]);
    }
  );
});
app.put("/detalleencuesta/:idDetalleEncuesta", (req, res) => {
  const idDetalleEncuesta = req.params.idDetalleEncuesta;
  const { Tipo, FechaInicio, FechaFin, Nombre, idCurso } = req.body;
  db.query(
    "UPDATE detalleencuesta SET Tipo = ?, FechaInicio = ?, FechaFin = ?, Nombre = ?, idCurso = ? WHERE idDetalleEncuesta = ?",
    [Tipo, FechaInicio, FechaFin, Nombre, idCurso, idDetalleEncuesta],
    (err) => {
      if (err) {
        res.status(500).send("Error updating DetalleEncuesta");
        return;
      }
      db.query(
        "SELECT * FROM detalleencuesta WHERE idDetalleEncuesta = ?",
        [idDetalleEncuesta],
        (err, result) => {
          if (err) {
            res.status(500).send("Error fetching updated DetalleEncuesta");
            return;
          }
          res.json(result[0]);
        }
      );
    }
  );
});
app.delete("/detalleencuesta/:idDetalleEncuesta", (req, res) => {
  const idDetalleEncuesta = req.params.idDetalleEncuesta;
  db.query(
    "DELETE FROM detalleencuesta WHERE idDetalleEncuesta = ?",
    idDetalleEncuesta,
    (err) => {
      if (err) {
        res.status(500).send("Error deleting DetalleEncuesta");
        return;
      }
      res.status(200).json({ msg: "DetalleEncuesta deleted successfully" });
    }
  );
});

/* Start server */
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
