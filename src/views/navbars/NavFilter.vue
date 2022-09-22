<template>
    <div id="NavFilter">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2"><span class="part1">ener</span><span class="part2">Bit</span></h1>
        <div class="btn-toolbar mb-2 mb-md-0">
            <div class="dropdown">
                <a class="btn btn-outline-warning dropdown-toggle" href="#" role="button" id="dropdownMenuLink" 
                    data-bs-toggle="dropdown" aria-expanded="false">
                    Welcome {{user.user}}
                    <fa icon="laugh" /> 
                </a>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li>
                        <a class="dropdown-item"><fa icon="user" /> User: {{user.user}}</a>
                    </li>
                    <li>
                        <a class="dropdown-item" ><fa icon="award" /> Role: {{user.role}}</a>
                    </li>
                    <li>
                        <hr class="dropdown-divider">
                    </li>
                    <li>
                        <!-- <router-link to="/" class="dropdown-item"> <fa icon="sign-out-alt" /> Cerrar sesión</router-link> -->
                        <a class="dropdown-item" href="#" @click="LogOut()"> <fa icon="sign-out-alt" /> Log out</a>
                    </li>
                </ul>
            </div>
        </div>
      </div>

        <!-- Agregamos componente TOAST para las notificaciones push -->
        <Toast ref="toast" />    
    </div>
</template>

<script>

// Importamos el componente para las notificaciones push (Toast) 
import Toast from '../Toast.vue';

export default {
    name:'NavFilter',
    components:{
      Toast
    },
    props: {
        user: null
    },
    methods: {       
        LogOut:function(){
        localStorage.removeItem('user_token');
        this.$router.push({ path: '/login' });

    }
    },
}
</script>

<style scoped>
.part1{
    color: #ED7004;
}
.part2{
    color: #53358e;
}
</style>