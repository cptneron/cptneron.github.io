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

const GITHUB_OWNER = 'nloupia';
const GITHUB_REPO = 'nloupia.github.io';

function formatRelativeDate(dateStr) {
  const date = new Date(dateStr);
  const now = new Date();
  const diffDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
  if (diffDays === 0) return "aujourd'hui";
  if (diffDays === 1) return 'hier';
  if (diffDays < 30) return `il y a ${diffDays} j`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths === 1) return 'il y a 1 mois';
  return `il y a ${diffMonths} mois`;
}

async function loadRepoBadges() {
  const lastCommitEl = document.getElementById('badge-last-commit');
  const commitCountEl = document.getElementById('badge-commit-count');
  if (!lastCommitEl || !commitCountEl) return;

  try {
    const commitsRes = await fetch(`https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/commits?per_page=100`);
    if (!commitsRes.ok) throw new Error('API indisponible');
    const commits = await commitsRes.json();

    if (commits.length > 0) {
      const lastDate = commits[0].commit.author.date;
      lastCommitEl.textContent = formatRelativeDate(lastDate);

      const now = new Date();
      const thisMonthCount = commits.filter(c => {
        const d = new Date(c.commit.author.date);
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
      }).length;
      commitCountEl.textContent = thisMonthCount;
    }
  } catch (e) {
    lastCommitEl.textContent = 'n/d';
    commitCountEl.textContent = 'n/d';
  }
}

loadRepoBadges();
