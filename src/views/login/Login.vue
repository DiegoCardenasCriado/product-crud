<template>
  <div class="container py-5 h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-12 col-md-8 col-lg-6 col-xl-5">
        <div class="card shadow-2-strong" style="border-radius: 1rem;">
          <div class="card-body p-5 text-center">

            <div class="img">
                <img src="@/assets/logo.png" alt="LOGIN PHOTO" srcset="">
            </div>
            <h1 class="mb-5">Sign in</h1>

            <div class="form-floating mb-3">
                <input v-model="user" type="text" class="form-control" id="floatingInput" placeholder="User">
                <label for="floatingUser">User</label>
            </div>
            <div class="form-floating">
                <input v-model="pass" type="password" class="form-control" id="floatingPassword" placeholder="Password" >
                <label for="floatingPassword">Password</label>
            </div>
            <!-- Login button -->
            <button class="btn btn-primary btn-lg btn-block mt-4 w-50" @click="Sign_in()">Login</button>

          </div>
        </div>
      </div>
    </div>
    <!-- Agregamos componente TOAST para las notificaciones push -->
    <Toast ref="toast" />    
  </div>
</template>
<script>
  // Importamos el componente para las notificaciones push (Toast) 
  import Toast from '@/views/Toast.vue'
  
  export default {
    name:'Producto',
    components:{
      Toast
    },
    data() {
      return {
        user: '',
        pass: ''
      }
    },
    created() {
      let user = JSON.parse(localStorage.getItem('user_token'));
        if ( user ) {
          this.$router.push({ path: '/' });
        }
    },
    methods: {                    
      Sign_in: async function(){
        if ( this.user === "" || this.pass === "" ) {
          
          this.$refs.toast.msg("Info","All fields are required!","info");
        } else if ( this.user != "admin" || this.pass != "admin" ) {
          this.$refs.toast.msg("Error","Invalid username or password!","warning");
        }else if ( this.user === process.env.VUE_APP_VALID_USER_LOGIN || this.pass === process.env.VUE_APP_VALID_PASSWORD_LOGIN ) {
          const user = {
            user: this.user,
            role: this.user,
          }
          localStorage.setItem('user_token', JSON.stringify(user));
          this.$router.push({ path: '/' });

        }
      }
    },      
  }
  </script>