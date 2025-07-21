// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  themeToggle.innerHTML = document.body.classList.contains('light-mode') 
    ? '<i class="fas fa-sun"></i>' 
    : '<i class="fas fa-moon"></i>';
});

// Set current year
document.getElementById('currentYear').textContent = new Date().getFullYear();

// File Upload Feedback
const fileInput = document.getElementById('resume_pdf');
const fileText = document.getElementById('fileText');
const fileValidated = document.getElementById('fileValidated');

fileInput.addEventListener('change', () => {
  if (fileInput.files.length > 0) {
    fileText.textContent = fileInput.files[0].name;
    fileValidated.innerHTML = '<i class="fas fa-check-circle"></i>';
    fileValidated.classList.add('show');
  } else {
    fileText.textContent = 'Choose a file';
    fileValidated.classList.remove('show');
  }
});

// Form Submission
document.getElementById('resumeForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const loadingBox = document.getElementById('loading');
  const resultBox = document.getElementById('result');

  loadingBox.classList.remove('hidden');
  resultBox.classList.add('hidden');

  try {
    const response = await fetch('https://resume-ranker-i32q.onrender.com/match-resume/', {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.detail || 'Failed to process your request. Please try again.');
    }

    const data = await response.json();

    document.getElementById('score').textContent = `${(data.match_score * 100).toFixed(0)}%`;
    document.getElementById('fit').textContent = data.fit.toString();
    document.getElementById('match_result').textContent = data.match_result;
    document.getElementById('excerpt').textContent = data.resume_excerpt || 'No excerpt available.';
    document.getElementById('rawResponse').textContent = JSON.stringify(data, null, 2);

    loadingBox.classList.add('hidden');
    resultBox.classList.remove('hidden');
  } catch (error) {
    console.error('Error:', error);
    alert('Error: ' + error.message);
    loadingBox.classList.add('hidden');
  }
});

// Try Again Button
document.getElementById('tryAgainBtn').addEventListener('click', () => {
  const form = document.getElementById('resumeForm');
  const resultBox = document.getElementById('result');

  form.reset();
  resultBox.classList.add('hidden');
  fileText.textContent = 'Choose a file';
  fileValidated.classList.remove('show');
});

// Particle.js Background
particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#a78bfa' },
    shape: { type: 'circle' },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: '#8b5cf6', opacity: 0.4, width: 1 },
    move: { enable: true, speed: 3, direction: 'none', random: true, straight: false, out_mode: 'out' }
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'repulse' } }
  },
  retina_detect: true
});
