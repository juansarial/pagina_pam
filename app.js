// Reemplaza esta línea con el ID real de la hoja de Google Sheets
const SHEET_ID = 'TU_HOJA_DE_GOOGLE_SHEETS_ID_AQUI';
const SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/1`;

async function cargarProductos() {
  const container = document.getElementById('products-container');

  try {
    const respuesta = await fetch(SHEET_URL);
    if (!respuesta.ok) throw new Error('Error al conectar');

    const productos = await respuesta.json();
    container.innerHTML = '';

    productos.forEach((prod) => {
      if (!prod.nombre) return;

      const card = document.createElement('article');
      card.className = 'product-card';

      const imgSideUrl = prod.imglado || prod.imgfrente;
      const linkDirect = prod.linkinstagram || 'https://www.instagram.com/direct/inbox/';

      card.innerHTML = `
        <div class="view-toggle">
          <button class="toggle-btn active" onclick="switchView(this, 'front')">Vista Frontal</button>
          <button class="toggle-btn" onclick="switchView(this, 'side')">Vista Lateral</button>
        </div>
        <div class="image-viewer">
          <img src="${prod.imgfrente}" alt="${prod.nombre} Frente" class="product-img img-front active" loading="lazy">
          <img src="${imgSideUrl}" alt="${prod.nombre} Lado" class="product-img img-side" loading="lazy">
        </div>
        <div class="product-info">
          <span class="product-name">${prod.nombre}</span>
        </div>
        <a href="${linkDirect}" target="_blank" rel="noopener noreferrer" class="btn-order">
          Consultar pelo Instagram Direct
        </a>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error('Error:', error);
    container.innerHTML = '<p style="text-align:center; grid-column: 1/-1;">Erro ao carregar os produtos.</p>';
  }
}

function switchView(button, view) {
  const card = button.closest('.product-card');
  const buttons = card.querySelectorAll('.toggle-btn');
  const imgFront = card.querySelector('.img-front');
  const imgSide = card.querySelector('.img-side');

  buttons.forEach(btn => btn.classList.remove('active'));
  button.classList.add('active');

  if (view === 'front') {
    imgFront.classList.add('active');
    imgSide.classList.remove('active');
  } else {
    imgSide.classList.add('active');
    imgFront.classList.remove('active');
  }
}

document.addEventListener('DOMContentLoaded', cargarProductos);