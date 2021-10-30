<template>
  <div id="login">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <table v-if="products">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(product,key) in products" :key="key">
                <td>{{ product.name }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.status }}</td>
                <td>
                  <button class="btn btn-primary" @click="editProduct(product.id)">Edit</button>
                  <button class="btn btn-primary" @click="approveProduct(product.id)">Approve</button>
                  <button class="btn btn-danger" @click="deleteProduct(product.id)">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
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
      products: [],
    }
  },
 
  methods: {
    editProduct(id) {
      this.$router.push({ path: `/products/${id}/edit/`});
    },
     approveProduct(id) {
      this.$router.push({ path: `/products/${id}/approve/`});
    },
    async deleteProduct(productId) {
       await axios.post(`https://127.0.0.1:8000/api/admin/products/${productId}/delete`,{},authheader)
        this.products=this.products.filter(product => product.id !== productId)
    }
  },
  async mounted() {
    const products=await axios.get('https://127.0.0.1:8000/api/admin/products',authheader )
    this.products=products.data
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
