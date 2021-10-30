<template>
  <div id="login">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <p class="lead text-center">Approve a product</p>
          <form @submit.prevent="onSubmit" method="POST" >
     
            
            <div class="form-group" >
                 <label for="name">status</label><br/>
                <select v-model="formData.status">
                  <option>ACCEPT</option>
                  <option>REJECT</option>
                </select>
            </div>
            <div class="form-group">
              <input type="submit" class="btn btn-info btn-block btn-lg" :value="!formData.id?'Create':'Edit'">
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import {authheader} from '../../axios'
export default {
  name: 'Approve',
  data() {
    return {
      formData: {},
      isSeller: true
    }
  },
 
  methods: {
   async onSubmit(){
        await axios.post(`https://127.0.0.1:8000/api/admin/products/transitions/${this.$router.currentRoute.params.id}`,this.formData,authheader)
        this.$router.push('/products')
    }
  },
  async mounted() {

 
    if(this.$router.currentRoute.params.id){
      const product=await axios.get(`https://127.0.0.1:8000/api/admin/products/${this.$router.currentRoute.params.id}/show`,authheader)
      this.formData=product.data.data
    }
  
  },
  watch:{
    $route (){
        this.formData = {};
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
