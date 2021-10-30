<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/products" v-if="isLoggedIn"> Products</router-link>
      <router-link to="/products/create" v-if="isLoggedIn"> | Create Product</router-link>
      <a @click="logout" v-if="isLoggedIn"> | Logout</a>
      <router-link to="/login" v-if="!isLoggedIn"> | Login</router-link>
    </div>
    <router-view/>
  </div>
</template>
<script>
import axios from 'axios'
import {authheader} from './axios'
  export default {
    components: {
      
    },
    data() {
      return {
        isLoggedIn: false,
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('userToken')
        window.location.reload();
      }
    },  
    mounted() {
       this.isLoggedIn=localStorage.getItem('userToken')?true:false
       axios.get('https://127.0.0.1:8000/api/profile',authheader)
        .then(response => {
          console.log(response.status)
        })
        .catch(error => {
          localStorage.removeItem('userToken')
          this.$router.push('/login')
          console.log(error.response.data.message)
        })
    }
  }
</script>

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
</style>
