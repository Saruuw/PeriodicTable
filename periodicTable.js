getData();

async function getData() {
  let path = "./periodic-table-data.json";
  let result = await api.fetchData(path);
  sessionStorage.setItem("periodicElements", JSON.stringify(result));
  fillTable();
}

function fillTable() {
  let periodicElements = JSON.parse(sessionStorage.getItem("periodicElements"));
  let sortedList = periodicElements.sort(function (a, b) {
    return a.row - b.row;
  });
  let table = document.querySelector("#periodicTable");
  let row = 1;
  let col = 1;

  let newRow = document.createElement("div");
  newRow.className = "divRow";

  while (row < 10) {
    for (let i = 0; i < sortedList.length; ) {
      if (col < 19) {
        if (sortedList[i].column == col) {
          let box = document.createElement("div");

          switch (sortedList[i].block) {
            case "s":
              box.setAttribute("class", "divCell sBlock");
              box.addEventListener("click", blockClick("sBlock", "#ff9999"));
              break;

            case "p":
              box.setAttribute("class", "divCell pBlock");
              box.addEventListener("click", blockClick("pBlock", "#f7f89f"));
              break;

            case "d":
              box.setAttribute("class", "divCell dBlock");
              box.addEventListener("click", blockClick("dBlock", "#99ccff"));
              break;

            case "f":
              box.setAttribute("class", "divCell fBlock");
              box.addEventListener("click", blockClick("fBlock", "#9bff99"));
              break;

            default:
              box.setAttribute("class", "divCell");
              break;
          }

          let atomicNr = document.createElement("p");
          let atomicNumber = sortedList[i].atomicNumber;
          atomicNr.setAttribute("id", "atomicNumber");
          atomicNr.innerHTML = atomicNumber;

          let sym = document.createElement("p");
          let symbol = sortedList[i].symbol;
          sym.setAttribute("id", "symbol");
          sym.innerHTML = symbol;

          let na = document.createElement("p");
          let name = sortedList[i].name;
          na.setAttribute("id", "name");
          na.innerHTML = name;

          box.appendChild(atomicNr);
          box.appendChild(sym);
          box.appendChild(na);
          newRow.appendChild(box);
          col++;
          i++;
          continue;
        } else {
          let emptyBox = document.createElement("div");
          emptyBox.className = "emptyBox";

          emptyBox.innerHTML = "";
          newRow.appendChild(emptyBox);
          col++;
        }
      } else {
        console.log("ny rad");
        row++;
        col = 1;
        table.appendChild(newRow);
        newRow = document.createElement("div");
        newRow.className = "divRow";
        console.log("test");

        if (row > 9) {
          return;
        }
      }
    }
    table.appendChild(newRow);
  }
}

function blockClick(blockName, originalColor) {
  var elements = document.getElementsByClassName(blockName);
  console.log(elements.length);
  for (let e = 0; e < elements.length; e++) {
    elements[e].onclick = function () {
      for (let u = 0; u < elements.length; u++) {
        if (elements[u].style.backgroundColor != "white") {
          elements[u].style.backgroundColor = "white";
        } else {
          elements[u].style.backgroundColor = originalColor;
        }
      }
    };
  }
}
