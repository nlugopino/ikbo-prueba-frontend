<template>
  <q-page class="q-pa-lg">
    <div class="row q-col-gutter-md">
      <div class="col-12">
        <div class="row">
          <div class="col-12 col-md-6">
            <label class="text-h5">Listado de productos</label>
          </div>
          <div class="col-12 col-md-6">
            <div class="row justify-end q-gutter-x-md">
              <div>
                <q-btn-dropdown unelevated rounded color="primary" label="Nuevo" icon="mdi-plus">
                  <q-list>
                    <q-item clickable v-close-popup @click="accionesProductos(1)">
                      <q-item-section>
                        <q-item-label>Producto</q-item-label>
                      </q-item-section>
                    </q-item>
                    <q-item clickable v-close-popup @click="nuevaOrden">
                      <q-item-section>
                        <q-item-label>Orden</q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12">
        <listado
          v-model="productos"
          @editarProducto="accionesProductos(2, $event)"
        />
      </div>
    </div>
    <producto ref="producto" @reload="listarProductos()" />
    <orden ref="orden" @reload="listarProductos()" />
  </q-page>
</template>

<script>
import listado from "../components/listado.vue";
import producto from "../components/producto.vue";
import ProductoServices from "src/services/ProductoServices.js";
import orden from '../components/orden.vue';
export default {
  name: "Index",
  components: {
    listado,
    producto,
    orden,
  },
  data() {
    return {
      productos: [],
    };
  },
  methods: {
    accionesProductos(tipo, model = null) {
      if (tipo == 1) {
        // Nuevo prodcuto
        this.$refs.producto.nuevoProducto();
      } else {
        // Editar producto
        this.$refs.producto.editarProducto(model);
      }
    },
    async listarProductos() {
      this.productos = await ProductoServices.obtenerProductos();
    },
    nuevaOrden() {
      this.$refs.orden.nuevaOrden();
    },
  },
  created() {
    this.listarProductos();
  },
};
</script>
