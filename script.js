      //not sure if this helps
         window.jsPDF = window.jspdf.jsPDF;
         
         const canvas = document.getElementById("canvas");
         const context = canvas.getContext("2d");
         let currentFont = "Arial";
         let currentCharacter = "A";
         let currentSize = "12";
         
         function drawCharacter(x, y) {
           context.font = currentSize + "pt " + currentFont;
           context.fillText(currentCharacter, x, y);
         }
         
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
         
         // Download button
         document.getElementById("save-button").addEventListener('click', function () {
         let pdf = null;
         let width = canvas.width; 
         let height = canvas.height;
         
         //set the orientation
         if(width > height){
         pdf = new jsPDF('l', 'px', [width, height]);
         }
         else{
         pdf = new jsPDF('p', 'px', [height, width]);
         }
         //then we get the dimensions from the 'pdf' file itself
         width = pdf.internal.pageSize.getWidth();
         height = pdf.internal.pageSize.getHeight();
         pdf.addImage(canvas.toDataURL(), 'PNG', 0, 0, width, height);
         pdf.save("download.pdf");
         });
