let currentIndex = 0;
const alerts = JSON.parse(localStorage.getItem('alerts')) || [];

// Função para carregar alertas do localStorage e atualizar a interface
function loadAlerts() {
  const alertsFromStorage = JSON.parse(localStorage.getItem('alerts')) || [];
  if (alertsFromStorage.length !== alerts.length) {
    alerts.length = 0;
    alerts.push(...alertsFromStorage);
    currentIndex = 0;
    displayAlert(currentIndex);
  }
}

// Função para exibir um alerta na interface
function displayAlert(index) {
  if (alerts.length > 0) {
    const alert = alerts[index];
    document.getElementById('modalAlertDetails').innerHTML = `
      <h2>Informações Enviadas:</h2>
      <p><strong>ALAGAMENTO:</strong> ${alert.alagamento ? 'Sim' : 'Não'}</p>
      <p><strong>ACIDENTE:</strong> ${alert.acidente ? 'Sim' : 'Não'}</p>
      <p><strong>TRANSITO:</strong> ${alert.transito ? 'Sim' : 'Não'}</p>
      <p><strong>Descrição:</strong> ${alert.description}</p>
      ${alert.imageSrc ? `<img src="${alert.imageSrc}" alt="Imagem" style="object-fit: cover; width: 100%; height: auto; max-height: 200px;" />` : ''}
    `;
  } else {
    document.getElementById('modalAlertDetails').innerHTML = '<p>Nenhum dado enviado.</p>';
  }
}

// Função para adicionar um novo alerta
document.getElementById('submitButton').addEventListener('click', function() {
  const alagamento = document.getElementById('alagamento').checked;
  const acidente = document.getElementById('acidente').checked;
  const transito = document.getElementById('transito').checked;
  const description = document.getElementById('textbox').value;
  const imagePreview = document.getElementById('imagePreview');
  const imageSrc = imagePreview.src ? imagePreview.src : '';

  const alertData = {
    alagamento,
    acidente,
    transito,
    description,
    imageSrc
  };

  let alerts = JSON.parse(localStorage.getItem('alerts')) || [];
  alerts.push(alertData);
  localStorage.setItem('alerts', JSON.stringify(alerts));

  document.getElementById('alert').style.display = 'block';
  setTimeout(() => {
    document.getElementById('alert').style.display = 'none';
    document.getElementById('alertModal').style.display = 'none';
    document.getElementById('textbox').value = '';
    document.querySelectorAll('.checkbox-group input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
    imagePreview.style.display = 'none';
    imagePreview.src = '';
    loadAlerts();  // Atualiza os alertas imediatamente após o envio de um novo
  }, 3000);
});

// Função para exibir a imagem carregada no formulário
document.getElementById('fileInput').addEventListener('change', function(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const imagePreview = document.getElementById('imagePreview');
      imagePreview.src = e.target.result;
      imagePreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

// Event listeners para navegação e modais
document.getElementById('sinal').addEventListener('click', function() {
  displayAlert(currentIndex);
  document.getElementById('alertDetailsModal').style.display = 'block';
});

document.querySelectorAll('.close').forEach(function(closeBtn) {
  closeBtn.addEventListener('click', function() {
    closeBtn.parentElement.parentElement.style.display = 'none';
  });
});

window.onclick = function(event) {
  if (event.target == document.getElementById('alertDetailsModal')) {
    document.getElementById('alertDetailsModal').style.display = 'none';
  } else if (event.target == document.getElementById('alertModal')) {
    document.getElementById('alertModal').style.display = 'none';
  }
};

document.getElementById('prev').addEventListener('click', function() {
  if (currentIndex > 0) {
    currentIndex--;
    displayAlert(currentIndex);
  }
});

document.getElementById('next').addEventListener('click', function() {
  if (currentIndex < alerts.length - 1) {
    currentIndex++;
    displayAlert(currentIndex);
  }
});

document.getElementById('imagem').addEventListener('click', function() {
  document.getElementById('alertModal').style.display = 'block';
});

// Carrega os alertas inicialmente
loadAlerts();
