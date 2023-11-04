<!-- CheckAccess.vue -->
<template>
  <div class="main">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <div>
            <h1>Check Access</h1>
            <p>Check Access</p>
            <label for="date">Date</label>
            <input type="date" id="date" v-model="date" />
            <label for="methods">Methods</label>
            <select name="methods" id="methods" v-model="method">
              <option value="">ALL METHODS</option>
              <option value="GET">GET</option>
              <option value="POST">POST</option>
              <option value="PUT">PUT</option>
              <option value="Delete">Delete</option>
            </select>
            <div>
              <label for="ip">IP</label>
              <input type="text" id="ip" v-model="ip" @focus="handleFocusIp" @blur="handleBlur"/>
              <ul v-if="isShowIP" class="result-list">
                <li v-for="ip in ips" :key="ip">
                  <button :value="ip" @click="inputIp(ip)">{{ ip }}</button>
                </li>
              </ul>
            </div>
            <div>
              <label for="url">URL</label>
              <input type="text" id="url" v-model="url" @focus="handleFocusUrl" @blur="handleBlur"/>
              <ul v-if="isShowURL" class="result-list">
                <li v-for="url in urls" :key="url">
                  <button :value="url" @click="inputUrl(url)">{{ url }}</button>
                </li>
              </ul>
            </div>
            <canvas id="access" width="400" height="200"></canvas>
          </div>

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

<style scoped>
.main{
  width: 80%;
  margin: 0 auto;

}
</style>
<style scoped>
/* 全体のスタイリングをリセットして、一貫性を持たせます。 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* フォントのデフォルトを指定 */
body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  background-color: #f4f4f4;
  padding: 20px;
}

/* コンテナのスタイリング */
.container {
  max-width: 800px;
  margin: 0 auto;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* フォーム要素間のスペース */
form div {
  margin-bottom: 20px;
}

/* ラベルのスタイリング */
label {
  display: block;
  margin-bottom: 5px;
}

/* 入力フィールドのスタイリング */
input[type='text'],
input[type='date'],
select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* 検索結果のリストスタイリング */
.result-list {
  list-style: none;
  margin-top: 5px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  border-radius: 4px;
  background: #fff;
  position: absolute;
  width: 95%;
  max-height: 300px;
  overflow-y: auto;
  z-index: 2;
}

/* 検索結果の項目スタイリング */
.result-list li {
  padding: 10px;
  border-bottom: 1px solid #ccc;
}

/* 最後の項目の境界線を削除 */
.result-list li:last-child {
  border-bottom: none;
}

/* ボタンのスタイリング */
.result-list button {
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  width: 100%;
  text-align: left;
  cursor: pointer;
}

/* ボタンにホバーした際のスタイリング */
.result-list button:hover {
  background-color: #f5f5f5;
}

/* キャンバスのスタイリング */
#access {
  display: block;
  margin-top: 20px;
  background: #fff;
  border: 1px solid #ccc;
}

</style>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { easyFetch } from '../../utils/submit';
import Chart from 'chart.js/auto';

const date = ref('');
const method = ref('');
const ip = ref('');
const url = ref('');

const isShowIP = ref(false);
const isShowURL = ref(false);

const handleFocusIp = () => {
  isShowIP.value = true;
};

const handleFocusUrl = () => {
  isShowURL.value = true;
};
const handleBlur = () => {
  // クリックしたときにulが消えてしまうので、setTimeoutで遅らせる
  setTimeout(() => {
    isShowIP.value = false;
    isShowURL.value = false;
  }, 150);
};

const logs = ref([] as any[]);
const ips = ref([] as any[]);
const urls = ref([] as any[]);

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

// ipの値が変更されたときに実行される
const inputIp = (input: string) => {
  isShowIP.value = false;
  ip.value = input;
};

// urlの値が変更されたときに実行される
const inputUrl = (input: string) => {
  isShowURL.value = false;
  url.value = input;
};

const chart = (startDate: Date, endDate: Date) => {
  // ログデータを絞り込む
  const filteredLogs = logs.value.filter((log) => {
    const logDate = new Date(log.time);

    // startDateとendDateはフィルタリングの必須条件
    const isWithinDateRange = logDate >= startDate && logDate <= endDate;
    // method、ip、urlは存在すればフィルタリングの条件として加える
    const isMethodMatch = method.value ? log.method === method.value : true;
    const isIpMatch = ip.value ? log.ip === ip.value : true;
    const isUrlMatch = url.value ? log.url === url.value : true;

    // すべての条件を満たすかチェック
    return isWithinDateRange && isMethodMatch && isIpMatch && isUrlMatch;
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

// ページが読み込まれたときに実行される
onMounted(async () => {
  await submit();
  date.value = new Date().toISOString().slice(0, 10);
  // 同じipは1回だけ表示する
  ips.value = Array.from(new Set(logs.value.map((log) => log.ip)));
  urls.value = Array.from(new Set(logs.value.map((log) => log.url)));
});

watch(date, (newVal, oldVal) => {
  chart(new Date(newVal + 'T00:00:00'), new Date(newVal + 'T23:59:59'));
});

watch(method, (newVal, oldVal) => {
  chart(new Date(date.value + 'T00:00:00'), new Date(date.value + 'T23:59:59'));
});

// ipの値が変更されたときに実行される
watch(ip, (newVal, oldVal) => {
  chart(new Date(date.value + 'T00:00:00'), new Date(date.value + 'T23:59:59'));
  isShowIP.value = true;
  // ipsの値と,newValの値が部分的に一致するかどうか
  ips.value = Array.from(
    new Set(
      logs.value.map((log) => log.ip).filter((ip) => ip.indexOf(newVal) !== -1)
    )
  );
  // isShowをfalseにする。これをしないと、ボタンをクリックしたときに再表示されてしまう
  if (ips.value.length === 1 && ips.value[0] === newVal) {
    isShowIP.value = false;
  }
});

// urlの値が変更されたときに実行される
watch(url, (newVal, oldVal) => {
  chart(new Date(date.value + 'T00:00:00'), new Date(date.value + 'T23:59:59'));
  isShowURL.value = true;
  urls.value = Array.from(
    new Set(
      logs.value.map((log) => log.url).filter((url) => url.indexOf(newVal) !== -1)
    )
  );
  // isShowをfalseにする。これをしないと、ボタンをクリックしたときに再表示されてしまう
  if (urls.value.length === 1 && urls.value[0] === newVal) {
    isShowURL.value = false;
  }
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

