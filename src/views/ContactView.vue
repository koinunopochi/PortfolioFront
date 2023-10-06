<!-- ContactView.vue -->
<template>
  <div class="contact-container">
    <section class="contact-form-section">
      <h2 class="title">Contact Me</h2>
      <form @submit.prevent="submit">
        <div class="form-item">
          <label for="company">会社名</label>
          <div class="input-container">
            <input type="text" id="company" v-model="company" />
            <p class="error-message">{{ company_error }}</p>
          </div>
        </div>
        <div class="form-item">
          <label for="person">担当者名</label>
          <input type="text" id="person" v-model="person" />
        </div>
        <div class="form-item">
          <label for="email">email</label>
          <div class="input-container">
            <input type="email" name="" id="email" v-model="email" />
            <p class="error-message">{{ email_error }}</p>
          </div>
        </div>
        <div class="form-item">
          <label for="requirements">本文</label>
          <div class="input-container">
            <textarea id="requirements" v-model="requirements"></textarea>
            <p class="error-message">{{ requirements_error }}</p>
          </div>
        </div>
        <div class="button-submit">
          <button type="submit">送信</button>
        </div>
      </form>
    </section>
    <section class="social-links-section">
      <h3>Follow Me</h3>
      <div class="social-links">
        <a
          href="https://twitter.com/a1a2a3b1b2b3b4"
          class="social-link twitter"
          target="_blank"
          rel="noopener noreferrer"
          >X(旧Twitter)</a
        >
        <a
          href="https://qiita.com/koinunopochi"
          class="social-link qiita"
          target="_blank"
          rel="noopener noreferrer"
          >Qiita</a
        >
        <a
          href="https://github.com/koinunopochi"
          class="social-link github"
          target="_blank"
          rel="noopener noreferrer"
          >GitHub</a
        >
      </div>
    </section>

    <InformationModal
      :type="type"
      v-model:isOpen="showModal"
      :content="message"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { easyFetch } from '../utils/submit';
import InformationModal from '../components/InformationModal.vue';
import { type } from 'os';

const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;

const email = ref('');
const company = ref('');
const person = ref('');
const requirements = ref('');

const type = ref('success');
const showModal = ref(false);
const message = ref('');

const email_error = ref('');
const company_error = ref('');
const requirements_error = ref('');

watch(email, (newValue) => {
  if (newValue.length <= 0) {
    email_error.value = 'メールアドレスは必須の値です。';
  } else {
    email_error.value = '';
  }
});
watch(company, (newValue) => {
  if (newValue.length <= 0) {
    company_error.value = '会社名は必須の値です。';
  } else {
    company_error.value = '';
  }
});
watch(requirements, (newValue) => {
  if (newValue.length <= 0) {
    requirements_error.value = '要件は必須の値です。';
  } else {
    requirements_error.value = '';
  }
});

const submit = async () => {
  try {
    const res = await easyFetch('POST', new URL(apiUrl + '/contact'), {
      email: email.value,
      company: company.value,
      person: person.value,
      content: requirements.value,
    });
    type.value = 'success';
    showModal.value = true;
    message.value = '送信に成功しました。';
  } catch (e) {
    console.log(e);
    type.value = 'error';
    showModal.value = true;
    message.value = '送信に失敗しました。';
  }
};
</script>

<style scoped>
.form-item {
  align-items: center; /* ラベルと入力ボックスを中央揃えにする */
  margin-bottom: 20px;
}
.title {
  text-align: center;
}
.input-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1; /* 余ったスペースをこのコンテナが占めるように */
}

.form-item label {
  width: 100px; /* ラベルの幅を固定して揃える */
  margin-right: 10px; /* ラベルと入力ボックスの間のスペース */
}

.form-item input,
.form-item textarea {
  width: 100%; /* 入力ボックスの幅を親要素に合わせる */
  border: 1px solid #b0e57c; /* 薄い黄緑のボーダー */
  padding: 8px; /* 入力ボックスの内側のスペース */
  box-sizing: border-box; /* ボーダーとパディングを含めてサイズを固定 */
}

.form-item textarea {
  resize: vertical; /* 垂直方向にのみサイズ変更を許可 */
  min-height: 100px; /* 最小の高さを指定 */
}
.contact-container {
  font-family: 'Helvetica', 'Arial', sans-serif;
  max-width: 800px;
  margin: 50px auto;
  padding: 40px;
}

.contact-form-section {
  background-color: white;
  padding: 20px;
  border: 2px solid green;
  margin-bottom: 20px;
}
.button-submit {
  text-align: right;
}

button {
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 0;
}

button:hover {
  background-color: green;
}

.social-links-section {
  text-align: center;
}

.social-link {
  margin: 10px;
  font-size: 1.2em;
}

.social-link.twitter {
  color: black;
}

.social-link.qiita {
  color: #55c500;
}

.social-link.github {
  color: black;
}
.error-message {
  color: red;
  margin-top: 5px; /* エラーメッセージの上部の余白を追加 */
}
</style>
