function createTables() {
  // Получаем значение размера таблицы от пользователя
  var n = document.getElementById("tableSize").value;

  // Получаем контейнер для таблиц
  var tablesContainer = document.getElementById("tablesContainer");

  // Очищаем содержимое контейнера
  tablesContainer.innerHTML = "";

  // Создаем таблицу слева размером n x 1 с подписями "N1", "N2", и так далее
  var leftTable = createTableWithLabels(n, 1, "left", "N");
  tablesContainer.appendChild(leftTable);

  // Добавляем отступ между таблицами
  tablesContainer.appendChild(document.createElement("div"));

  // Создаем таблицу по центру размером n x 1 с подписями "A1", "A2", и так далее
  var centerTable = createTableWithLabels(n, 1, "center", "A");
  tablesContainer.appendChild(centerTable);

  // Добавляем отступ между таблицами
  tablesContainer.appendChild(document.createElement("div"));

  // Создаем таблицу справа размером n x n с подписями "N1", "N2", и так далее
  var rightTable = createTableWithLabels(n, n, "right", "");
  tablesContainer.appendChild(rightTable);
}

function createTable(rows, cols, id) {
  var table = document.createElement("table");

  for (var i = 0; i < rows; i++) {
    var row = table.insertRow();
    for (var j = 0; j < cols; j++) {
      var cell = row.insertCell();
      var input = document.createElement("input");
      input.type = "number";
      input.id = id + "_" + i + "_" + j;
      cell.appendChild(input);
    }
  }

  return table;
}

function createTableWithLabels(rows, cols, id, labelPrefix) {
  var table = document.createElement("table");

  for (var i = 0; i < rows; i++) {
    var row = table.insertRow();

    // Создаем ячейку для подписи
    var labelCell = row.insertCell();
    labelCell.textContent = labelPrefix + (i + 1);
    labelCell.classList.add("left");

    for (var j = 0; j < cols; j++) {
      var cell = row.insertCell();
      var input = document.createElement("input");
      input.type = "number";
      input.id = id + "_" + i + "_" + j;
      cell.appendChild(input);
    }
  }

  return table;
}