<template>
  <nav id="nav" class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="btn btn-default" to="/">HR App</router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link class="btn btn-default" to="/employees">Employees</router-link>
        </li>
        <li class="nav-item">
          <router-link class="btn btn-default" to="/jobs">Jobs</router-link>
        </li>
        <li class="nav-item">
          <router-link class="btn btn-default" to="/comments">Comments</router-link>
        </li>
        <li class="nav-item">
          <router-link class="btn btn-default" to="/projects">Projects</router-link>
        </li>
      </ul>
    </div>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
