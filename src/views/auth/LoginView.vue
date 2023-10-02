<template>
  <v-container>
    <v-row justify="center">
      <v-col md="6">
        <v-card>
          <v-card-title class="headline">ログイン</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field
                label="ユーザー名"
                v-model="username"
                :rules="nameRules"
                required
              ></v-text-field>
              <v-text-field
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
            <v-btn :disabled="!valid" color="primary" @click="login">
              ログイン
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { easyFetch } from '../../utils/submit';

const apiUrl = import.meta.env.VITE_APP_API_DOMAIN;


const router = useRouter();

const valid = ref(true);
const showPassword = ref(false);
const username = ref('');
const password = ref('');

const nameRules = [
  (v: string) => !!v || 'ユーザー名は必須です',
  (v: string) => v.length <= 10 || 'ユーザー名は10文字以内で入力してください',
];

const passwordRules = [
  (v: string) => !!v || 'パスワードは必須です',
  (v: string) => v.length >= 8 || 'パスワードは8文字以上で入力してください',
];

const login = async () => {
  try {
    const res = await easyFetch('POST', new URL(apiUrl+'/auth/login'), {

      username: username.value,
      password: password.value,
    });
    console.log(res);
    // alert('ログインしました');
    router.push('/');
  } catch (e) {
    console.log(e);
    alert('ログインに失敗しました');
  }
};
</script>