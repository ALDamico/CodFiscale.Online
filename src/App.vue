<template>
  <div>
    <navbar class="navbar-app"></navbar>
    <div id="app" class="container">
      <router-view class="router-view"/>
    </div>
  </div>
</template>

<style>
/*  #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
  }*/

/* Revert icons to their original state */
.navbar-app {
  margin: 0;
  top:0px;
  left:0px;
}

.router-view {
  margin-top: 25px;
}

button > .button-animated-icon-check, .button-animated-icon-undo {
  transition: 1s linear;
  transform: scale(1);
  transform: rotate(0deg);
}

button:hover > .button-animated-icon-check {
  transition: 1s linear;
  transform: scale(1.10);
}

button:hover > .button-animated-icon-undo {
  transition: 1s linear;
  transform: rotate(-90deg);
}

</style>
