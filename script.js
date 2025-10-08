function modoOscuro() {
document.body.classList.toggle("oscuro");
}

document.addEventListener('DOMContentLoaded', function () {
  const DURATION = 300;

  function setupCollapse(collapseId, arrowSpanId) {
    const collapseEl = document.getElementById(collapseId);
    const arrowSpan = document.getElementById(arrowSpanId);
    if (!collapseEl || !arrowSpan) return;

    if (!arrowSpan.querySelector('i')) {
      arrowSpan.innerHTML = '<i class="bi bi-chevron-down"></i>';
    }

    collapseEl.addEventListener('show.bs.collapse', () => {
      arrowSpan.classList.add('rotated');

      const body = collapseEl.querySelector('.card-body');
      if (body) {
        body.style.animation = `fadeInUp ${DURATION}ms ease forwards`;
      }
    });

    collapseEl.addEventListener('hide.bs.collapse', () => {
      arrowSpan.classList.remove('rotated');

      const body = collapseEl.querySelector('.card-body');
      if (body) {
        body.style.animation = `fadeOutDown ${DURATION}ms ease forwards`;
      }
    });

    collapseEl.addEventListener('shown.bs.collapse', () => {
      const body = collapseEl.querySelector('.card-body');
      if (body) body.style.animation = '';
    });
    collapseEl.addEventListener('hidden.bs.collapse', () => {
      const body = collapseEl.querySelector('.card-body');
      if (body) body.style.animation = '';
    });
  }

  setupCollapse('educacionCollapse', 'arrowIcon');
  setupCollapse('experienciaCollapse', 'arrowIconExp');
});

// Función para crear el buscador de habilidades
function crearBuscadorHabilidades() {
    const sobreMiSection = document.getElementById('Sobre mi');
    const h3Element = sobreMiSection.querySelector('h3');
    
    // Crear un contenedor flex para el título y el buscador
    const headerContainer = document.createElement('div');
    headerContainer.className = 'sobre-mi-header d-flex justify-content-between align-items-center mb-3';
    
    // Mover el h3 al nuevo contenedor
    headerContainer.appendChild(h3Element);
    
    // Crear el buscador más compacto
    const buscadorContainer = document.createElement('div');
    buscadorContainer.className = 'buscador-inline';
    buscadorContainer.innerHTML = `
        <div class="input-group input-group-sm">
            <span class="input-group-text">
                <i class="bi bi-search"></i>
            </span>
            <input type="text" 
                   id="buscadorHabilidades" 
                   class="form-control" 
                   placeholder="Buscar habilidades...">
            <button class="btn btn-outline-secondary" 
                    type="button" 
                    id="limpiarBusqueda"
                    title="Limpiar búsqueda">
                <i class="bi bi-x-lg"></i>
            </button>
        </div>
    `;
    
    // Agregar el buscador al contenedor
    headerContainer.appendChild(buscadorContainer);
    
    // Insertar el contenedor al inicio de la sección
    sobreMiSection.insertBefore(headerContainer, sobreMiSection.firstChild);
    
    // Crear contenedor para resultados debajo del header
    const resultadosContainer = document.createElement('div');
    resultadosContainer.id = 'resultadosBusqueda';
    resultadosContainer.className = 'mb-3';
    sobreMiSection.insertBefore(resultadosContainer, sobreMiSection.querySelector('.sobre-mi-container'));
    
    // Configurar los event listeners
    configurarEventListeners();
}

// Función para configurar los event listeners del buscador
function configurarEventListeners() {
    const buscador = document.getElementById('buscadorHabilidades');
    const btnLimpiar = document.getElementById('limpiarBusqueda');
    const resultados = document.getElementById('resultadosBusqueda');
    
    // Event listener para la búsqueda en tiempo real
    buscador.addEventListener('input', function() {
        const termino = this.value.toLowerCase().trim();
        
        if (termino === '') {
            mostrarTodasLasHabilidades();
            resultados.innerHTML = '';
        } else {
            filtrarHabilidades(termino);
        }
    });
    
    // Event listener para limpiar la búsqueda
    btnLimpiar.addEventListener('click', function() {
        buscador.value = '';
        mostrarTodasLasHabilidades();
        resultados.innerHTML = '';
        buscador.focus();
    });
    
    // Limpiar con Escape
    buscador.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            this.value = '';
            mostrarTodasLasHabilidades();
            resultados.innerHTML = '';
        }
    });
}

// Función para obtener todas las habilidades organizadas por categoría
function obtenerTodasLasHabilidades() {
    const categorias = {
        'Lenguajes de Programación': [],
        'Tecnologias': [],
        'Softskills': []
    };
    
    // Obtener elementos de cada categoría
    const columnas = document.querySelectorAll('.sobre-mi-columna');
    
    columnas.forEach(columna => {
        const titulo = columna.querySelector('h3').textContent.trim();
        const items = columna.querySelectorAll('li');
        
        items.forEach(item => {
            if (categorias[titulo]) {
                categorias[titulo].push({
                    texto: item.textContent.trim(),
                    elemento: item
                });
            }
        });
    });
    
    return categorias;
}

// Función para filtrar habilidades
function filtrarHabilidades(termino) {
    const habilidades = obtenerTodasLasHabilidades();
    const resultados = document.getElementById('resultadosBusqueda');
    
    // Limpiar el área de resultados
    resultados.innerHTML = '';
    
    // Ocultar todas las habilidades primero
    Object.values(habilidades).forEach(categoria => {
        categoria.forEach(habilidad => {
            habilidad.elemento.style.display = 'none';
        });
    });
    
    // Buscar coincidencias y mostrar solo las que coinciden
    Object.entries(habilidades).forEach(([nombreCategoria, categoria]) => {
        categoria.forEach(habilidad => {
            if (habilidad.texto.toLowerCase().includes(termino)) {
                // Mostrar el elemento
                habilidad.elemento.style.display = 'block';
                
                // Resaltar el término de búsqueda
                const textoOriginal = habilidad.texto;
                const regex = new RegExp(`(${termino})`, 'gi');
                const textoResaltado = textoOriginal.replace(regex, '<mark>$1</mark>');
                habilidad.elemento.innerHTML = textoResaltado;
            }
        });
    });
}

// Función para mostrar todas las habilidades
function mostrarTodasLasHabilidades() {
    const habilidades = obtenerTodasLasHabilidades();
    
    Object.values(habilidades).forEach(categoria => {
        categoria.forEach(habilidad => {
            habilidad.elemento.style.display = 'block';
            // Remover cualquier resaltado
            habilidad.elemento.innerHTML = habilidad.texto;
        });
    });
}

// Función para agregar estilos CSS adicionales
function agregarEstilosBuscador() {
    const estilos = `
        <style>
        .buscador-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            margin: 20px 0;
        }
        
        .oscuro .buscador-container {
            background-color: #101010;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }
        
        .oscuro .input-group-text {
            background-color: #181818;
            border-color: #333;
            color: #cccccc;
        }
        
        .oscuro .form-control {
            background-color: #181818;
            border-color: #333;
            color: #cccccc;
        }
        
        .oscuro .form-control:focus {
            background-color: #181818;
            border-color: #3b82f6;
            color: #cccccc;
            box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
        }
        
        .oscuro .btn-outline-secondary {
            color: #cccccc;
            border-color: #333;
        }
        
        .oscuro .btn-outline-secondary:hover {
            background-color: #333;
            border-color: #333;
            color: white;
        }
        
        .categoria-resultado {
            padding: 5px 10px;
            background: #f8f9fa;
            border-radius: 4px;
            margin: 5px 0;
        }
        
        .oscuro .categoria-resultado {
            background: #181818;
        }
        
        .oscuro .alert-info {
            color: #7dd3fc;
            background-color: #0c1618;
            border-color: #164e63;
        }
        
        .oscuro .alert-success {
            color: #86efac;
            background-color: #0f1611;
            border-color: #15803d;
        }
        
        mark {
            background-color: #fef08a;
            color: #854d0e;
            padding: 2px 4px;
            border-radius: 3px;
        }
        
        .oscuro mark {
            background-color: #fbbf24;
            color: #1f2937;
        }
        
        .input-group .btn {
            z-index: 3;
        }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', estilos);
}

// Inicializar el buscador cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Esperar un poco para asegurar que todo esté cargado
    setTimeout(() => {
        agregarEstilosBuscador();
        crearBuscadorHabilidades();
    }, 100);
});