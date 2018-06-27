<template>
<section>
    <p>Форма регистрации</p>
    <form class="mt-5">
    <article class="form-group" >
        <label for="email"> Email:
        <input type="email" class="form-control" id="userEmail" placeholder="Ввведите email" v-model="user.email" required></label>
    </article>
    <article class="form-group">
        <label for="password"> Пароль:
        <input type="password" class="form-control" id="password" placeholder="Ввведите пароль" v-model="user.password" required></label>
    </article>
    <article class="form-group">
        <label for="password"> Повторите пароль:
        <input type="password" class="form-control" id="passwordCheck" placeholder="Ввведите пароль еще раз" v-model="user.passwordCheck" required></label>
    </article>
    <article class="alert alert-danger" role="alert" v-if="passwErr">
        Пароли не совпадают!
    </article>
    <article class="alert alert-danger" role="alert" v-if="passwSmallErr">
        Пароль должен быть больше 6 символов!
    </article>
    <button  class="btn btn-primary" @click="registerUser">Зарегистрироваться</button>
    </form>
    {{msg}}
    {{user.email+" "+user.password}}
</section>
</template>

<script>
import firebase from 'firebase'

export default {
    name:"sign-up",
    data(){
        return {
            user:{
            email: "",
            password:"",
            passwordCheck: ""
        },
        msg:"hello"
        }

    },
    computed:{
        passwErr()
        {
            return (this.user.password!=this.user.passwordCheck);
        },
        passwSmallErr()
        {
            return (this.user.password.length<6||this.user.passwordCheck.length<6);
        }
    },
    methods:
    {
        registerUser(){
            
            firebase.auth().createUserWithEmailAndPassword(this.user.email,this.user.password);
            this.msg= this.user.email;
            
           
        }
    }
}
</script>
