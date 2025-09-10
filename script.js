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