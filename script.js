function showTime() {
	document.getElementById('currentTime').innerHTML = new Date().toUTCString();
}
// Only call showTime if the element exists (it's on index.html, not script.html)
if (document.getElementById('currentTime')) {
  showTime();
  setInterval(function () {
    showTime();
  }, 1000);
}


function generatePdf() {
  const sectionElement = document.getElementById('pdfForm');
  // Use html2pdf to generate the PDF from the sectionElement
  html2pdf().from(sectionElement).save();
} 

const windowEl = document.getElementById('exampleWindow');
// Note: The following event listener is for 'index.html' and might cause an error if exampleWindow doesn't exist on other pages.
// If this script is shared, consider adding checks or moving page-specific JS.
if (windowEl) {
  document.querySelector('.dock-icon').addEventListener('click', () => {
    windowEl.style.display = windowEl.style.display === 'block' ? 'none' : 'block';
  });

  // Close button
  document.querySelector('.close-btn').addEventListener('click', () => {
    windowEl.style.display = 'none';
  });

  // Optional: Drag functionality for windows
  let isDragging = false;
  let offsetX, offsetY;

  const header = windowEl.querySelector('.window-header');
  header.addEventListener('mousedown', e => {
    isDragging = true;
    offsetX = e.clientX - windowEl.offsetLeft;
    offsetY = e.clientY - windowEl.offsetTop;
  });

  document.addEventListener('mousemove', e => {
    if (isDragging) {
      windowEl.style.left = `${e.clientX - offsetX}px`;
      windowEl.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
}

// --- Word Processor Functions for script.html ---
function formatDoc(command, value) {
  document.execCommand(command, false, value);
  document.getElementById('editor').focus(); // Keep focus on the editor
}

function saveContent() {
  const editorContent = document.getElementById('editor').innerHTML;
  localStorage.setItem('scriptEditorContent', editorContent);
  alert('Content saved!');
}

function loadContent() {
  const savedContent = localStorage.getItem('scriptEditorContent');
  if (savedContent) {
    document.getElementById('editor').innerHTML = savedContent;
    alert('Content loaded!');
  } else {
    alert('No saved content found.');
  }
}

// Load content on page load if available
document.addEventListener('DOMContentLoaded', () => {
  const editor = document.getElementById('editor');
  if (editor) {
    const savedContent = localStorage.getItem('scriptEditorContent');
    if (savedContent) {
      editor.innerHTML = savedContent;
    }
    editor.focus(); // Focus on editor when page loads
  }
});
