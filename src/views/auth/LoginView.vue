<template>
  <v-container class="fill-height">
    <v-row justify="center" align="center">
      <v-col md="6">
        <v-card class="elevation-12 rounded-lg">
          <v-card-title class="headline blue--text text--darken-3"
            >ログイン</v-card-title
          >
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                outlined
                label="ユーザー名"
                v-model="username"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
                outlined
                label="パスワード"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"
                :rules="passwordRules"
                required
                autocomplete="current-password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              large
              :disabled="!valid"
              color="blue darken-3"
              @click="login"
            >
              ログイン
            </v-btn>
          </v-card-actions>
          <v-card-text class="text-center mt-3">
            <!-- mt-3で上にマージンを追加 -->
            <v-btn text to="/">Home</v-btn>
            <v-btn text to="/about-me">About Me</v-btn>
            <v-btn text to="/project-blog">ProjectBlog</v-btn>
            <v-btn text to="/contact">Contact</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <InformationModal
    :type="'error'"
    v-model:isOpen="showModal"
    :content="'ログインに失敗しました。'"
  >
  </InformationModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { easyFetch } from '../../utils/submit';
import InformationModal from '../../components/InformationModal.vue';

const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;

const router = useRouter();

const valid = ref(true);
const showPassword = ref(false);
const username = ref('');
const password = ref('');
const showModal = ref(false);

const nameRules = [
  (v: string) => !!v || 'ユーザー名は必須です',
  (v: string) => v.length <= 125 || 'ユーザー名は125文字以内で入力してください',
];

const passwordRules = [
  (v: string) => !!v || 'パスワードは必須です',
  (v: string) => v.length >= 8 || 'パスワードは8文字以上で入力してください',
];

const login = async () => {
  try {
    const res = await easyFetch('POST', new URL(apiUrl + '/auth/login'), {
      username: username.value,
      password: password.value,
    });
    console.log(res);
    router.push('/');
  } catch (e) {
    console.log(e);
    console.log('ログインに失敗しました');
    showModal.value = true;
  }
};
</script>
