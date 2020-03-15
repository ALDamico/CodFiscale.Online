<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

/* Revert icons to their original state */
button>.button-animated-icon-check, .button-animated-icon-undo {
  transition: 1s linear;
  transform: scale(1);
  transform: rotate(0deg);
}

button:hover>.button-animated-icon-check {
  transition: 1s linear;
  transform: scale(1.10);
}

button:hover>.button-animated-icon-undo {
  transition: 1s linear;
  transform: rotate(-90deg);
}
</style>
