<template>
  <div class="nav-bar">
    <a href="/">HOME</a>
    <a href="/about-me">ABOUT ME</a>
  </div>
</template>

<style scoped>
.nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: end;
  width: 100%;
  height: 50px;
  background-color: #fff;
  padding-top: 10px;
  padding-right: 20px;
}
.nav-bar a {
  margin-right: 20px;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  color: #545555;
  transition: color 0.3s, text-decoration 0.3s;
}
.nav-bar a:hover {
  text-decoration: underline;
}
</style>
