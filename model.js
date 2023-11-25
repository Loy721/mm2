  function readData() {
    n = document.getElementById("tableSize").value;
    T = document.getElementById("time").value * 365;
    dt = document.getElementById("dt").value;

    for (var i = 0; i < n; i++) {
      var rowData = [];
  
      // Считываем данные из таблицы слева
      var leftInputId = "left_" + i + "_0";
      var leftInputValue = parseFloat(document.getElementById(leftInputId).value) || 0;
      Ni.push(leftInputValue);
  
      // Считываем данные из таблицы по центру
      var centerInputId = "center_" + i + "_0";
      var centerInputValue = parseFloat(document.getElementById(centerInputId).value) || 0;
      Ai.push(centerInputValue);
  
      // Считываем данные из таблицы справа
      for (var j = 0; j < n; j++) {
        var rightInputId = "right_" + i + "_" + j;
        var rightInputValue = parseFloat(document.getElementById(rightInputId).value) || 0;
        rowData.push(rightInputValue);
      }
  
      Bij.push(rowData);
    }
  
    displayData();
    showModel()
  }
  
  function displayData() {
    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = "Ni: " + JSON.stringify(Ni) + "Ai: " + JSON.stringify(Ai) + "Bij: " + JSON.stringify(Bij);
  }

  //////////////////////logic

  function showModel() {
    [x, y] = calcModel();
    const data = {
      labels: x,
      datasets: []
    };
    for(let i = 0; i < n; ++i){
      let hlp = {
        label: 'Dataset '+ (i+1),
        data: y[i],
        borderColor: getRandomColor()
      }
      data.datasets.push(hlp);
    }
    const config = {
      type: 'line',
      data: data,
      options: {
        scales: {
          y: {
            title:{
                display: true,
                text: "Число особей"
            }
          },
          x: {
            type: 'linear',
            title:{
                display: true,
                text: "Время(лет)"
            }
          }
        }
      },
    };
    let plotCtx = document.getElementById('plot').getContext('2d');
    let chart =  new Chart(plotCtx, config);
  }

  function calcModel() {
    let x = []
    let y = []
    for(let i = 0; i < n; ++i)
      y[i] = []
    let prevNi = Ni

    for(let q = 0; q < Math.ceil(T / dt); q++) {// СРАВНИВАЕМ ДАБЛЫ!
      x[q] = q * dt;
      let currNiHlp = []
      for(let i = 0; i < n; ++i) {
        y[i][q] = (Ai[i] * prevNi[i] + interactionWithOtherSpecies(i, prevNi)) * dt + prevNi[i];
        currNiHlp.push(y[i][q]);
      }
      prevNi = currNiHlp;
    } 
    return [x, y];
  }

  function interactionWithOtherSpecies(i, prevNi) {
    let result = 0;
    let currN = prevNi[i]
    for(let j = 0; j < n; ++j) 
      result += Bij[i][j] * prevNi[j] * currN;
    return result;
  }

  function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++)
        color += letters[Math.floor(Math.random() * 16)];
    return color;
}
///////////////////////////

n = 0;
T = 0;
dt = 0;
Ni = [];
Ai = [];
Bij = [];
