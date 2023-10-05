<!-- BlogUpdate -->
<template>
  <div class="all-content">
    <div class="main">
      <h1>BlogPost</h1>
      <div class="form">
        <div class="form-item">
          <label for="title">タイトル</label>
          <input type="text" id="title" v-model="title" />
        </div>
        <div class="form-item">
          <label for="description">概要</label>
          <input type="text" id="description" v-model="description" />
        </div>
        <div class="form-item">
          <label for="content">本文</label>
          <textarea id="content" v-model="content"></textarea>
        </div>
        <div class="form-item">
          <button @click="submit">送信</button>
          <p class="error-message">{{ error_message }}</p>
        </div>
      </div>
    </div>
    <div class="main md">
      <h1 v-if="title != ''">{{ title }}</h1>
      <h3 v-if="description != ''">概要</h3>
      <p>{{ description }}</p>
      <div v-html="convertedMarkdown"></div>
    </div>
  </div>
</template>