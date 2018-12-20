<template>
  <div>
    <nav>
      <div class="nav-wrapper grey darken-3 row">
        <!-- large screens -->
        <ul class="hide-on-small-only right">
          <li>
            <router-link class="link" to="/">Ramo</router-link>
          </li>
          <li>
            <router-link class="link" to="/slider">Slider</router-link>
          </li>
          <li>
            <router-link class="link" to="/animate">Animate</router-link>
          </li>
          <!-- <li>
            <router-link class="link" to="/cip">Cip</router-link>
          </li>-->
        </ul>
      </div>
    </nav>
  </div>
</template>
  <style>
.router-link-exact-active {
  background: #3eb0ae;
}
.tooltipped {
  cursor: help;
}
.material-icons {
  cursor: pointer;
}
.fas {
  cursor: pointer;
}
.link:hover {
  background-color: #8e8e8e;
}
</style>