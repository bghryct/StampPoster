
const fontUpload = document.getElementById("font-upload");
fontUpload.addEventListener('change', handleFontUpload, false);
// adding in font upload capability

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const previewCanvas = document.getElementById("preview-canvas"); // New canvas element for preview
const previewContext = previewCanvas.getContext("2d"); // Context for preview canvas
let currentFont = "Arial";
let currentCharacter = "A";
let currentSize = "12";
let currentColor = "#000000";




function drawCharacter(x, y) {
  context.font = currentSize + "pt " + currentFont;
  context.fillStyle = currentColor;
  context.fillText(currentCharacter, x, y);
}

function drawPreviewCharacter(x, y) {
  previewContext.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
  previewContext.font = currentSize + "pt " + currentFont;
  previewContext.fillStyle = currentColor;
  previewContext.globalAlpha = 0.5;
  const width = previewContext.measureText(currentCharacter).width;
  previewContext.fillText(currentCharacter, x, y);
  previewContext.globalAlpha = 1;
}

canvas.addEventListener("mousemove", function(event) { // Listen for mouse move event
   const rect = canvas.getBoundingClientRect();
   const x = event.clientX - rect.left;
   const y = event.clientY - rect.top;
   drawPreviewCharacter(x, y);
});

canvas.addEventListener("click", function(event) {
   const rect = canvas.getBoundingClientRect();
   const x = event.clientX - rect.left;
   const y = event.clientY - rect.top;
   drawCharacter(x, y);
});

const fontSelect = document.getElementById("font-select");
fontSelect.addEventListener("change", function(event) {
   currentFont = event.target.value;
});

const characterSelect = document.getElementById("character-select");
characterSelect.addEventListener("change", function(event) {
   currentCharacter = event.target.value;
});

const sizeSelect = document.getElementById("size-select");
sizeSelect.addEventListener("change", function(event) {
   currentSize = event.target.value;
});

const colorPicker = document.getElementById("color-picker");
colorPicker.addEventListener("input", function(event) {
   currentColor = event.target.value;
});
//save as svg functionality
document.getElementById("save-button").addEventListener('click', function () {
   let svg = new XMLSerializer().serializeToString(canvas);
   let blob = new Blob([svg], {type: "image/svg+xml;charset=utf-8"});
   saveAs(blob, "download.svg");
});
// font handling for svg save
function getFontDataURL(font) {
  return new Promise(function(resolve, reject) {
    let reader = new FileReader();
    reader.onload = function() {
      let arrayBuffer = reader.result;
      let uint8Array = new Uint8Array(arrayBuffer);
      let data = btoa(String.fromCharCode.apply(null, uint8Array));
      let format = font.split('.').pop();
      let url = 'data:font/' + format + ';base64,' + data;
      resolve(url);
    };
    reader.readAsArrayBuffer(font);
  });
}

function handleFontUpload(event) {
  const file = event.target.files[0];
  const font = new FontFace('customFont', 'url(' + URL.createObjectURL(file) + ')');
  font.load().then(function(loadedFont) {
    document.fonts.add(loadedFont);
    getFontDataURL(file).then(function(dataURL) {
      canvas.style.fontFamily = 'customFont';
      let svg = new XMLSerializer().serializeToString(canvas);
      svg = svg.replace(/<text/g, '<text font-family="' + dataURL + '"');
      let blob = new Blob([svg], {type: "image/svg+xml;charset=utf-8"});
      saveAs(blob, "download.svg");
    });
  });
}
