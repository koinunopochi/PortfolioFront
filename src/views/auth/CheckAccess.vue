<!-- CheckAccess.vue -->
<template>
  <div class="main">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div>
            <h1>Check Access</h1>
            <p>Check Access</p>
            <input type="date" v-model="date" />
            <select name="methods" id="methods" v-model="method">
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="Delete">Delete</option>
            </select>
            <input type="text" v-model="ip" />
            <input type="text" v-model="url" />
            <canvas id="access" width="400" height="200"></canvas>
          </div>

          <h1>Check Access</h1>
          <p>Check Access</p>
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-12">
                  <h2>Logs</h2>
                  <div class="table-responsive">
                    <table class="table table-striped">
                      <thead>
                        <tr>
                          <th>Time</th>
                          <th>IP</th>
                          <th>Method</th>
                          <th>URL</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="log in logs" :key="log.id">
                          <td>{{ log.time }}</td>
                          <td>{{ log.ip }}</td>
                          <td>{{ log.method }}</td>
                          <td>{{ log.url }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { easyFetch } from '../../utils/submit';
import Chart from 'chart.js/auto';

const date = ref('');
const method = ref('GET');
const ip = ref('');
const url = ref('');

const logs = ref([] as any[]);
const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;

const submit = async () => {
  try {
    const res = await easyFetch(
      'GET',
      new URL(`${apiUrl}/access?start=2023-10-9`),
      {}
    );
    const res_json = await res.json();
    console.log(res_json);
    logs.value = res_json;
  } catch (e) {
    console.log(e);
  }
};

const chart = (startDate: Date, endDate: Date) => {
  // ログデータを絞り込む
  const filteredLogs = logs.value.filter((log) => {
    const date = new Date(log.time);
    return (
      date >= startDate &&
      date <= endDate &&
      log.method === method.value &&
      log.ip === ip.value &&
      log.url === url.value
    );
  });

  console.log(filteredLogs);
  // アクセス数を時間ごとに集計
  const accessCounts: any = {};
  // ログデータから集計
  filteredLogs.forEach((log) => {
    const date = new Date(log.time);
    // 時間単位で集計（例：'2023-10-09T02'）
    const hour = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}T${date.getHours()}`;
    accessCounts[hour] = (accessCounts[hour] || 0) + 1;
  });

  // 開始日時から終了日時までの各時間帯について、集計データを埋める
  for (
    let date = new Date(startDate);
    date <= endDate;
    date.setHours(date.getHours() + 1)
  ) {
    const hour = `${date.getFullYear()}-${
      date.getMonth() + 1
    }-${date.getDate()}T${date.getHours()}`;
    if (!(hour in accessCounts)) {
      accessCounts[hour] = 0; // ログが存在しない時間は0回とする
    }
  }

  // ソートされたラベル（時間）とデータ（アクセス数）の配列を生成
  const labels = Object.keys(accessCounts).sort();
  const data = labels.map((label) => accessCounts[label]);
  console.log(data);

  // グラフを描画
  ChartCreate('access', labels, 'アクセス数', data, 'rgb(75, 192, 192)');
};

onMounted(async () => {
  await submit();
});

watch(date, (newVal, oldVal) => {
  chart(new Date(newVal + 'T00:00:00'), new Date(newVal + 'T23:59:59'));
});
watch(method, (newVal, oldVal) => {
  chart(new Date(date.value + 'T00:00:00'), new Date(date.value + 'T23:59:59'));
});
watch(ip, (newVal, oldVal) => {
  chart(new Date(date.value + 'T00:00:00'), new Date(date.value + 'T23:59:59'));
});
watch(url, (newVal, oldVal) => {
  chart(new Date(date.value + 'T00:00:00'), new Date(date.value + 'T23:59:59'));
});
</script>
<script lang="ts">
const ChartCreate = (
  id: string,
  labels: string[],
  label: string,
  data: any[],
  borderColor: string
) => {
  // 既存のチャートを破棄する
  const existingChart = Chart.getChart(id); // チャートのIDを使って取得
  if (existingChart) {
    existingChart.destroy();
  }
  const ctx = document.getElementById(id).getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: label,
          data: data,
          fill: false,
          borderColor: borderColor,
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};
</script>
