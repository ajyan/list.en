import Chart from 'chart.js';
import $ from 'jquery';

export default function buildChart(
  features,
  songTitle,
  playlistFeatures,
  playlistTitle
) {
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
          backgroundColor: 'rgba(5,209,178,0.2)',
          borderColor: 'rgba(5,209,178,1)',
          fill: 'origin',
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
            features.liveness,
            features.valence,
            features.instrumentalness,
          ],
        },
        {
          label: `${playlistTitle} Avg`,
          backgroundColor: 'rgba(54,54,54,0.2)',
          borderColor: 'rgba(54,54,54,1)',
          fill: 'origin',
          radius: 3,
          pointRadius: 3,
          pointBorderWidth: 3,
          pointBorderColor: 'rgba(54,54,54,1)',
          pointHoverRadius: 5,
          pointHoverColor: 'rgba(54,54,54,1)',
          data: [
            playlistFeatures.acousticness,
            playlistFeatures.danceability,
            playlistFeatures.energy,
            playlistFeatures.liveness,
            playlistFeatures.valence,
            playlistFeatures.instrumentalness,
          ],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scale: {
        ticks: {
          suggestedMin: 0,
          suggestedMax: 1,
          stepSize: 0.2,
        },
      },
    },
  });
  return radarChart;
}
