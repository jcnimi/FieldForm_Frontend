

// Joindre les fichiers au checklist

function findFileLabel(fileInput, fileLabels, index) {
    return fileLabels.find((label, i) => {
      return label.htmlFor.toLowerCase() === fileInput.id.toLowerCase() && i === index;
    });
  }


  const fileInputs = document.querySelectorAll("input[type='file']");
  const fileLabels = Array.from(document.querySelectorAll(".file-label"));
  
  let fileLabel;


for (let index = 0; index < fileInputs.length; index++) {
    const fileInput = fileInputs[index];
    const fileLabel = findFileLabel(fileInput, fileLabels, index);
  
    fileInput.addEventListener("change", (event) => {
      const file = event.target.files[0];
      fileLabel.querySelector(".file-name").textContent = file.name;
      fileLabel.querySelector(".file-name").style.display = "block";
      // Add a class to the file label to indicate that it has a file selected.
      fileLabel.classList.add("has-file");
    });
  
    fileLabel.addEventListener("dblclick", (event) => {
      const file = fileInput.files[0];
      const message = `Souhaitez-vous télécharger ou remplacer le fichier ${file.name} ?`;
      const options = [
        {
          text: "Télécharger",
          value: "download",
        },
        {
          text: "Remplacer",
          value: "replace",
        },
      ];
  
      const confirm = new window.ConfirmDialog(message, options);
      confirm.show();
  
      switch (confirm.result) {
        case "download":
          window.open(file.url);
          break;
        case "replace":
          fileInput.replaceFile(file);
          break;
      }
    });
  }