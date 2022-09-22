<template>
    <div id="NavCaption">
        <strong class="d-flex justify-content-between align-items-center">
            <nav class="navbar bg-light">
                <div class="container-fluid">
                <form class="d-flex" role="search">
                    <select v-model="selectFiltre" @click="SelectValue()" class="form-select form-select-sm">
                        <option value="">Select filtre</option>
                        <option value="connection_type">Connection_type</option>
                        <option value="create_at">Create at</option>
                    </select>
                    <input class="form-control ms-2" type="search" placeholder="Search" aria-label="Search" @change="onChange" @keyup="onChange" v-model="filterInput">
                </form>
                </div>
            </nav>
            <button class="btn btn-outline-warning me-2" id="btnAddProduct" data-bs-toggle="modal" data-bs-target="#producAddModal">
                Agregar <fa icon="plus-circle" />
            </button>
        </strong>
    </div>
</template>

<script>

export default {
    name:'NavCaption',
    data() {
    return {
      id:0,
      filterInput: '',
      selectFiltre: '',
    }
  },
    methods: {       
    onChange: function(){
      this.$emit('search', this.filterInput);
    },
    SelectValue:function() {
        this.$emit('filter', this.selectFiltre);
    }
    },
}
</script>