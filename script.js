const projectStart = new Date('2023-09-01T00:00:00');

function formatUptime() {
  const now = new Date();
  const diffMs = now - projectStart;
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const years = Math.floor(days / 365);
  const remDays = days % 365;
  const months = Math.floor(remDays / 30);
  let parts = [];
  if (years > 0) parts.push(years + (years === 1 ? ' an' : ' ans'));
  if (months > 0) parts.push(months + (months === 1 ? ' mois' : ' mois'));
  return parts.join(', ') + ' de pratique continue';
}

const uptimeEl = document.getElementById('uptime-out');
if (uptimeEl) uptimeEl.textContent = formatUptime();

const updatedEl = document.getElementById('last-updated');
if (updatedEl) {
  const opts = { year: 'numeric', month: 'long', day: 'numeric' };
  updatedEl.textContent = new Date().toLocaleDateString('fr-FR', opts);
}
