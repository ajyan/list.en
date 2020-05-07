import Chart from 'chart.js';
import $ from 'jquery';

export default function buildChart(features, songTitle) {
  $('#radarChart').remove();
  $('#chartContainer').prepend('<canvas id="radarChart"/>');
  var ctx = document.getElementById('radarChart').getContext('2d');
  var radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
      labels: [
        'acousticness',
        'danceability',
        'energy',
        'liveness',
        'valence',
        'instrumentalness',
      ],

      datasets: [
        {
          label: songTitle,
          backgroundColor: 'rgba(5,209,178,1)',
          borderColor: 'rgba(5,209,178,1)',
          fill: false,
          radius: 3,
          pointRadius: 3,
          pointBorderWidth: 3,
          pointBorderColor: 'rgba(5,209,178,1)',
          pointHoverRadius: 5,
          pointHoverColor: 'rgba(5,209,178,1)',
          data: [
            features.acousticness,
            features.danceability,
            features.energy,
            features.liveliness,
            features.valuence,
            features.instrumentalness,
          ],
        },
      ],
    },
    options: {
      responsive: true,
    },
  });
  return radarChart;
}
