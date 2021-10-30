<template>
  <div id="login">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <p class="lead text-center">Create new product</p>
          <form @submit.prevent="onSubmit" method="POST" >
     
            <div class="form-group">
              <label for="name">name</label><br/>
              <input type="text" class="form-control form-control-lg" placeholder="Name" name="name" v-model="formData.name">
            </div>
            <div class="form-group">
                 <label for="name">price</label><br/>
              <input type="number" class="form-control form-control-lg" placeholder="Price" name="price" v-model="formData.price">
            </div>
             <div class="form-group">
                 <label for="name">stock</label><br/>
              <input type="number" class="form-control form-control-lg" placeholder="stock" name="stock" v-model="formData.stock">
            </div>
            <div class="form-group">
                 <label for="name">description</label><br/>
                <textarea name="description" id="" cols="30" rows="10" v-model="formData.description"></textarea>
            </div>
            <div class="form-group">
              <label for="name">Seo Title</label><br/>
              <input type="text" class="form-control form-control-lg" placeholder="Seo Title" name="seoTitle" v-model="formData.seoTitle">
            </div>
            <div class="form-group">
              <label for="name">Seo Keywords</label><br/>
              <input type="text" class="form-control form-control-lg" placeholder="Keywords" name="seoKeywords" v-model="formData.seoKeywords">
            </div>
            <div class="form-group">
                 <label for="name">seo description</label><br/>
                <textarea name="seoDescription" id="" cols="30" rows="10" v-model="formData.seoDescription"></textarea>
            </div>
            <div class="form-group" v-if="isSeller">
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
  name: 'Products',
  data() {
    return {
      formData: {},
      isSeller: true
    }
  },
 
  methods: {
   async onSubmit(){
        await axios.post('https://127.0.0.1:8000/api/admin/products/create',this.formData,authheader )
        this.$router.push('/products')
    }
  },
  async mounted() {
    const roles=JSON.parse(localStorage.getItem('userRole'))
    if(!roles.includes('ROLE_SELLER')){
      this.isSeller=false
    
    }
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
