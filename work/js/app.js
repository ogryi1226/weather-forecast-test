const getWeatherButton = document.getElementById('get-weather');
const citySelect = document.getElementById('city-select');

getWeatherButton.addEventListener('click', () => {
  const cityCode = citySelect.value;

  if (cityCode === '') {
    console.log('都市を選択してください');
    return;
  }

  const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${cityCode}.json`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
        const publishingOffice = data[0].publishingOffice;
        document.querySelector('#publishingOffice td').textContent = publishingOffice;

        const reportDatetime = data[0].reportDatetime;
        document.querySelector('#reportDatetime td').textContent = reportDatetime;

        const targetArea = data[0].timeSeries[0].areas[0].area.name;
        document.querySelector('#targetArea td').textContent = targetArea;

        const tempsArea = data[1].tempAverage.areas[0];
        document.querySelector('#todayHighTemperature td').textContent =
        `${tempsArea.max}℃`;
        document.querySelector('#todayLowTemperature td').textContent =
        `${tempsArea.min}℃`;

        const area = data[0].timeSeries[0].areas[0];
        document.getElementById("today").lastElementChild.textContent = area.weathers[0];
        document.getElementById("tomorrow").lastElementChild.textContent = area.weathers[1];
        document.getElementById("dayAfterTomorrow").lastElementChild.textContent = area.weathers[2];
        
    })
    .catch(error => console.error('エラー:', error));
});
