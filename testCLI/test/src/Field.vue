<template>
  <section>
    <h3>{{msg}}</h3>
    <input type="text" :value="msg" @input="changeMess">
    <p>{{mess}}</p>
  </section>
</template>

<script>
export default {
    props: ["msg"],
    data (){
        return{
            mess:""
        }
    },
    methods:{
        changeMess(event){
            this.mess=event.target.value;
            this.$emit('messChange',this.mess);
        }
    }
}
</script>