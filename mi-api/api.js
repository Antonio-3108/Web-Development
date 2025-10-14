// ========================================
// API REST SIMPLE PARA GESTIONAR PROYECTOS
// ========================================

// 1. IMPORTAR LAS LIBRERÍAS QUE NECESITAMOS
const express = require('express'); // Express: framework para crear APIs
const cors = require('cors');       // CORS: permite que otros sitios web usen nuestra API

// 2. CONFIGURAR NUESTRA APLICACIÓN
const app = express();              // Crear la aplicación Express
const PORT = 3001;                  // Puerto donde va a correr nuestro servidor

// 3. CONFIGURAR MIDDLEWARES (funciones que se ejecutan antes de las rutas)
app.use(cors());                    // Permitir peticiones desde cualquier origen
app.use(express.json());            // Convertir JSON del body de las peticiones a objetos JavaScript

// 4. CREAR NUESTRA "BASE DE DATOS" EN MEMORIA
// ⚠️ IMPORTANTE: Esta base de datos se borra cuando apagamos el servidor

// Habilidades con Nivel
let skills = [
    { id: 1, name: 'Python',     level: 80, category: 'Backend' },
    { id: 2, name: 'C',          level: 55, category: 'Backend' },
    { id: 3, name: 'C++',        level: 45, category: 'Backend' },
    { id: 4, name: 'PostgreSQL', level: 35, category: 'DevOps'  },
];

// ========================================
// DEFINIR LAS RUTAS DE NUESTRA API
// ========================================

// 5. RUTA GET /projects - OBTENER TODOS LOS PROYECTOS
app.get('/skills', (req, res) => {
    // req = request (petición que llega)
    // res = response (respuesta que enviamos)
    res.json(skills); // Enviar todos los proyectos como JSON
});

// 6. RUTA GET /projects/:id - OBTENER UN PROYECTO ESPECÍFICO POR ID
app.get('/skills/:id', (req, res) => {
    const id = Number(req.params.id);           // Convertir el ID de string a número
    const skill = skills.find(p => p.id === id); // Buscar el proyecto con ese ID

    // Si no encuentra el proyecto, devolver error 404
    if (!skill) {
        return res.status(404).json({ error: 'Skill no encontrada' });
    }

    res.json(skill); // Enviar el proyecto encontrado
});

// 7. RUTA POST /projects - CREAR UN NUEVO PROYECTO
app.post('/skills', (req, res) => {
    const { name, level, category } = req.body; // Extraer name y level del body de la petición

    // Validar que el nombre sea obligatorio
    if (!name) {
        return res.status(422).json({ error: 'El campo "name" es obligatorio' });
    }

    // Generar un nuevo ID (el más alto + 1)
    const nuevoId = Math.max(0, ...skills.map(p => p.id)) + 1;

    // Crear el nuevo proyecto
    const nuevaSkill = {
        id: nuevoId,
        name: name,
        level: Number(level) || 0,  // Convertir level a número, si no existe usar 0
        category: category
    };

    skills.push(nuevaSkill); // Agregar el proyecto a nuestra "base de datos"
    res.status(201).json(nuevaSkill); // Devolver el proyecto creado con código 201
});

// 8. RUTA PATCH /projects/:id - ACTUALIZAR PARCIALMENTE UN PROYECTO
app.patch('/skills/:id', (req, res) => {
    const id = Number(req.params.id);           // ID del proyecto a actualizar
    const skill = skills.find(p => p.id === id); // Buscar el proyecto

    // Si no encuentra el proyecto, devolver error 404
    if (!skill) {
        return res.status(404).json({ error: 'Skill no encontrada' });
    }

    const { name, level, category } = req.body; // Datos nuevos que queremos actualizar

    // Actualizar solo los campos que vienen en la petición
    if (name !== undefined) skill.name = name;             // Si viene name, actualizarlo
    if (level !== undefined) skill.level = Number(level);  // Si viene level, actualizarlo
    if (category !== undefined) skill.category = category; // Si viene category, actualizarlo

    res.json(skill); // Devolver el proyecto actualizado
});

// 9. RUTA DELETE /projects/:id - ELIMINAR UN PROYECTO
app.delete('/skills/:id', (req, res) => {
    const id = Number(req.params.id);                    // ID del proyecto a eliminar
    const indice = skills.findIndex(p => p.id === id); // Buscar el índice del proyecto

    // Si no encuentra el proyecto, devolver error 404
    if (indice === -1) {
        return res.status(404).json({ error: 'Skill no encontrada' });
    }

    // Eliminar el proyecto del array y guardarlo en una variable
    const skillEliminada = skills.splice(indice, 1)[0];
    res.json(skillEliminada); // Devolver el proyecto que se eliminó
});

// 10. MANEJAR RUTAS NO ENCONTRADAS (404)
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// 11. INICIAR EL SERVIDOR
app.listen(PORT, () => {
    console.log(`🚀 API escuchando en http://localhost:${PORT}`);
    console.log(`📋 Endpoints disponibles:`);
    console.log(`   GET    /skills     - Ver todas las skills`);
    console.log(`   GET    /skills/:id - Ver una skills específica`);
    console.log(`   POST   /skills     - Crear una skill nueva`);
    console.log(`   PATCH  /skills/:id - Actualizar una skill`);
    console.log(`   DELETE /skills/:id - Eliminar una skill`);
});