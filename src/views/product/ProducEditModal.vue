<template>
    <div id="producEdit">
        <!-- Modal editar Productos -->
        <div class="modal fade" id="producEditModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">    
            <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Editar usuario</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                         <div>
                            <input type="hidden" v-model="id">
                            <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="connection_type" v-model="connection_type" placeholder="Connection type">
                                <label for="nombre">Connection type</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="storage_system" v-model="storage_system" placeholder="Storage system">
                                <label for="descripcion">Storage system</label>
                            </div>                            
                            <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="condition" v-model="condition" placeholder="Condition">
                                <label for="precio_compra">Condition</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="owner" v-model="owner" placeholder="Owner">
                                <label for="precio_venta">Owner</label>
                            </div>                            
                            <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="serial" v-model="serial" placeholder="Serial">
                                <label for="num_lote">Serial</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="location" v-model="location" placeholder="Location">
                                <label for="cantidad">Location</label>
                            </div>
                            <div  class="form-floating mb-2">
                                <input type="text" class="form-control" id="purchase" v-model="purchase" placeholder="Purchase">
                                <label for="vencimiento">Purchase</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="i_max" v-model="i_max" placeholder="i max">
                                <label for="origen">i max</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="i_b" v-model="i_b" placeholder="i b">
                                <label for="origen">i b</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="i_n" v-model="i_n" placeholder="i n">
                                <label for="origen">i n</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="text" class="form-control" id="manufacturer" v-model="manufacturer" placeholder="Manufacturer">
                                <label for="origen">Manufacturer</label>
                            </div>
                            <div class="form-floating mb-2">
                                <input type="number" class="form-control" id="seals" v-model="seals" placeholder="Seals">
                                <label for="origen">Seals</label>
                            </div>                                                        
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="button" @click="Update()" class="btn btn-primary" data-bs-dismiss="modal">Editar</button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Agregamos componente TOAST para las notificaciones push -->
        <Toast ref="toast" />    
    </div>
</template>

<script>
// Importamos axios para las peticiones a la api
import axios from 'axios'
// Importamos el componente para las notificaciones push (Toast) 
import Toast from '../Toast.vue'

export default {
    name:'ProducEdit',
    components:{
      Toast
    },
    data() {
    return {
      id:0,
      connection_type: '',
      storage_system: '',
      condition: '',
      owner: '',
      serial: '',
      location: '',
      purchase: '',
      i_max: 0,
      i_b: 0,
      i_n: 0,
      manufacturer: '',
      seals: 0, 
    }
  },
    methods: {       
    Update:function(){
      let data = {
          connection_type: this.connection_type,
          storage_system: this.storage_system,
          condition: this.condition,
          owner: this.owner,
          serial: this.serial,
          location:this.location,
          purchase: this.purchase,
          i_max:  this.i_max,
          i_b: this.i_b,
          i_n:  this.i_n,
          manufacturer: this.manufacturer,
          seals:  this.seals                           
      };
      axios.patch('https://ops.enerbit.dev/learning/api/v1/meters/'+this.id,data).then(() =>{
        this.$emit('eventoHijo');
        this.$refs.toast.msg("Modified","Successfully modified!","success"); 
      })
      .catch(()=>{
        this.$refs.toast.msg("Error","Could not be modified","error"); 
      })
      
    },
    FindByid:function(id){
      // metodo para consutlar por el id del boton editar en la vista
      axios.get('https://ops.enerbit.dev/learning/api/v1/meters/'+id)
      .then(result =>{
        this.id = result.data.id,
        this.connection_type = result.data.connection_type,
        this.storage_system = result.data.storage_system,
        this.condition = result.data.condition,
        this.owner = result.data.owner,
        this.serial = result.data.serial,
        this.location = result.data.location,
        this.purchase = result.data.purchase,
        this.i_max = result.data.i_max,
        this.i_b = result.data.i_b,
        this.i_n = result.data.i_n,
        this.manufacturer = result.data.manufacturer,
        this.seals = result.data.seals
      })
      .catch(()=>{
        this.$refs.toast.msg("Error","Try again","Warning"); 
      })
    }
    },
}
</script>