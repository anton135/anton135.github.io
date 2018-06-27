<template>
  <section>
    <nav class="navbar navbar-dark bg-dark justify-content-end">
      <form class="form-inline">
      <button class="btn btn-outline-success mr-3" type="button" @click="ChangeState('sign-in')">Войти</button>
      <button class="btn btn-outline-success" type="button"  @click="ChangeState('sign-up')">Регистрация</button>
      </form>
</nav>
<section class="container">
<sign-in v-if="state=='sign-in'"></sign-in>
<sign-up v-else @regSuccess="state=$event"></sign-up>
</section>
  </section>
</template>

<script>
import SignIn from "./components/SignIn.vue"
import SignUp from "./components/SignUp.vue"
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      state:"sign-in"
    }
  },
  components:{
    SignIn,
    SignUp
  },
  methods:{
    ChangeState(newState)
    {
      this.state=newState;
    }
  }
}
</script>

<style>

</style>
