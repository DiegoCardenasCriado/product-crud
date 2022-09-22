<template>
    <div class="Product container">
      <div class="table-responsive">
    <!-- Insert the Navbar component for the filters -->
      <NavFilter :user="user" ref="edit" @loadData="loadData" />
        <table class="table table-hover table-striped caption-top text-center">
          <caption>
            <!-- Insert the NavCaption component for the filters -->
            <NavCaption @search="FilterProducts" @filter="SelectFilter" />
          </caption>
            <thead class="table-dark">
              <tr>
              <th scope="col">Serial</th>
              <th scope="col">Condition</th>
              <th scope="col">Owner</th>
              <th scope="col">Location</th>
              <th scope="col">Create at</th>
              <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in filtered" :key="item.id">
              <td>
                <a type="button" @click="InfoId(item.id)" class="btn" id="btnProductInfo" data-bs-toggle="modal" data-bs-target="#producInfoModal">
                    {{item.serial}}
                </a>
              </td>
              <td>{{item.condition}}</td>
              <td>{{item.owner}}</td>
              <td>{{item.location}}</td>
              <td>{{item.created_at}}</td>
              <td>
                <div>
                  <button type="button" @click="EditById(item.id)" class="btn btn-outline-success btn-sm m-md-1" id="btnProducEditModal" data-bs-toggle="modal" data-bs-target="#producEditModal"><fa icon="edit" /></button>
                  <button type="button" @click="Delete(item.id)" class="btn btn-outline-danger btn-sm" id="btnProductDelete"><fa icon="trash-alt" /></button>            
                </div>
              </td>
              </tr>
            </tbody>
          </table>
          <!-- Pagination -->
          <nav aria-label="..." v-if='(listData != "" )'>
            <ul class="pagination">
              <li class="page-item" v-bind:class = "(page==0)?'disabled':''">
                <span class="page-link" v-on:click="loadData(page -= 1)">
                  &laquo;
                </span>
              </li>
              <li class="page-item" aria-current="page"
                  v-for="pageNumb in pages" :key="pageNumb"
                  v-bind:class = "((pageNumb-1) == page)?'active':''">
                <a href="#" v-on:click="loadData(page = (pageNumb-1))" class="page-link">{{(pageNumb)}}</a>
              </li>
              <li class="page-item" v-bind:class = "(page==(pages-1))?'disabled':''">
  
                <a class="page-link" href="#" v-on:click="loadData(page += 1)">
                  &raquo;
                </a>
              </li>
            </ul>
          </nav>
          <!-- Alert There are no records -->
          <div v-else class="alert alert-warning" role="alert">
            <strong> <fa icon="exclamation-triangle" /> There are no </strong>
            records in the database or the connection to the API 
            <strong> <fa icon="bomb" /> was lost.</strong><br>
            <Strong><fa icon="wifi" /> Check</Strong> your internet connection.
          </div>
          <!-- Alert no match -->
          <div v-if="msg" class="alert alert-warning" role="alert">
            <strong>
                <fa icon="exclamation-triangle" />
                 No
            </strong> match 
          </div>
      </div>
      <!-- Agregamos el modal para guardar Productos -->
      <ProducAddModal @eventoHijo="loadData"/>
      <!-- Agregamos el modal para editar Productos -->
      <ProducEditModal ref="edit" @eventoHijo="loadData" />
      <ModalInfoProducto ref="info" @editar="EditById"/>
      <!-- Agregamos componente TOAST para las notificaciones push -->
      <Toast ref="toast" />       
    </div>
  </template>
  <script>
  // Importamos axios para las peticiones a la api
  import axios from 'axios'
  // Importamos los modales 
  import ProducAddModal from '@/views/product/ProducAddModal.vue';
  import ProducEditModal from '@/views/product/ProducEditModal.vue';
//   import ModalInfoProducto from '@/views/producto/ModalInfoProducto.vue'

  import NavFilter from '@/views/navbars/NavFilter.vue'
  import NavCaption from '@/views/navbars/NavCaption.vue';
//   import NavPagination from '@/views/navbars/NavPagination.vue';
  // Importamos el componente para las notificaciones push (Toast) 
  import Toast from '@/views/Toast.vue'
  
  export default {
    name:'Product',
    components:{
      ProducAddModal,
      ProducEditModal,
    //   ModalInfoProducto,
      NavFilter,
      NavCaption,
    //   NavPagination,
      Toast
    },
    data() {
      return {
        listData:[],
        filtered: [],
        filter: '',
        size: 5,
        pages: 0,
        page: 0,
        msg: false,
        user: ''
      }
    },
    created() {
        let user = JSON.parse(localStorage.getItem('user_token'));
        if ( !user ) {
            this.$router.push({ path: 'login' })
        } else {
            this.user = user;
            this.loadData();
        }
    },
    methods: {
      Delete:function(id){
        this.$swal({
            title: 'Are you sure?',
            text: 'This action cannot be reversed!',
            type: 'warning',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, leave it!',
            showCloseButton: true,
            showLoaderOnConfirm: true
          }).then(  async (result) => {
            if(result.value) {
              await axios.delete('https://ops.enerbit.dev/learning/api/v1/meters/'+id,)
              .then( () =>{
                this.$refs.toast.msg("Eliminado","Successfully removed!","success");              
                this.loadData();
              })
              .catch((error)=>{
                console.log(error);
                this.$refs.toast.msg("Error","Could not be deleted","error");
              })
              
            } else {
              this.$refs.toast.msg("Right on time","Your registration is intact!","info");
            }
          })
      },                    
      loadData: async function( page = this.page ){
        await axios.get(`https://ops.enerbit.dev/learning/api/v1/meters?size=${this.size}&page=${page}`)
        .then(result =>{
  
          const { pages, items } = result.data;
          this.listData = items;
          this.filtered = items;
          this.pages = pages;
  
        })
        .catch(( )=>{
          this.page -= 1;
        })
      },
      FilterProducts(value){
  
        if ( value == '' ) {
            this.filtered = this.listData;
            this.msg = false;
            console.log("181 filter");
            this.$router.get(0);
            console.log("depués 183 filter");
        }
  
        if (value && value.length > 0) {
            this.filtered = this.listData.filter(product => (product.serial).includes(value));
            if (this.filtered.length === 0) {
                this.msg = true;
            }
        }
      },
      EditById:function(id){
        this.$refs.edit.FindByid(id);
      },
      InfoId:function(id){
        this.$refs.info.FindByid(id);
      }
  
    },      
  }
  </script>