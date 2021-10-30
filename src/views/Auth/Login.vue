<template>
  <div id="login">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <h1 class="display-4 text-center">Log In</h1>
          <p class="lead text-center">
            Sign in to your DevConnector account
          </p>
          <form @submit.prevent="login" method="POST" >
           
            <div class="form-group">
              <input type="text" class="form-control form-control-lg" placeholder="username" name="email" v-model="formData.username">
            </div>
            <div class="form-group">
              <input type="password" class="form-control form-control-lg" placeholder="Password" name="password" v-model="formData.password">
            </div>
            <button type="submit" class="btn btn-info btn-block btn-lg">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Login',
  data() {
    return {
      formData:{
        username: '',
        password: ''
        }
    }
  },
 
  methods: {
    async login() {
     const response =await axios.post('https://127.0.0.1:8000/api/login_check', this.formData);
     localStorage.setItem('userToken', response.data.token);
    //   const user = {
    //     email: this.email,
    //     password: this.password
    //   }
    //   this.$http.post('/api/login', user).then(response => {
    //     this.$router.push('/')
    //   })
    }
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
  margin-top: 60px;
}
</style>
