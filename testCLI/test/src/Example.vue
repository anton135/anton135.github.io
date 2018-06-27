<template>
  <section>
    <h1>{{message}}</h1>
    <app-input :msg="message" @messChange="message=$event"></app-input> 
  </section>
</template>

<script>
import Input from "./Field.vue";
export default {
  data() {
    return {
    message:"ttttt"
    }
    },
    components: {
      "app-input": Input
    }
}
</script>