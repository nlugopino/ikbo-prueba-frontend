<template>
  <q-dialog ref="modal" persistent>
    <q-card style="width: 500px; max-width: 80vw">
      <q-card-section class="row items-center">
        <q-icon name="mdi-plus" size="sm" />
        <span class="q-ml-sm">Nueva orden</span>
      </q-card-section>
      <q-card-section>
        <q-form
          ref="form"
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md"
        >
          <div class="row q-col-gutter-y-md">
            <div class="col-12">
              <q-select
                outlined
                rounded
                dense
                v-model="model.tipo_orden"
                :options="tipo_orden"
                label="Tipo de orden *"
                emit-value
                map-options
                option-value="id"
                option-label="nombre"
                :rules="[(val) => !!val || 'Este campo es requerido']"
                @input="validarTipoOrden"
              />
            </div>
            <div class="col-12">
              <q-input
                outlined
                rounded
                dense
                v-model="model.fecha_orden"
                type="date"
                label="Fecha de la orden *"
                :rules="[(val) => !!val || 'Este campo es requerido']"
              />
            </div>
            <div class="col-12">
              <q-select
                outlined
                rounded
                dense
                v-model="model.producto"
                :options="productos"
                label="Producto *"
                emit-value
                map-options
                option-value="id"
                option-label="nombre"
                :rules="[(val) => !!val || 'Este campo es requerido']"
              />
            </div>
            <div class="col-12">
              <q-input
                outlined
                rounded
                dense
                v-model="model.cantidad"
                type="number"
                label="Cantidad *"
                :rules="[
                  (val) => !!val || 'Este campo es requerido',
                  (val) => val > 0 || 'La cantidad debe ser mayor a 0',
                ]"
              />
            </div>
            <div class="col-12">
              <q-input
                outlined
                rounded
                dense
                v-model="model.fecha_caducidad"
                type="date"
                label="Fecha de caducidad *"
                :rules="[(val) => !!val || 'Este campo es requerido']"
                v-if="model.tipo_orden != 2"
              />
            </div>
            <div class="col-12">
              <div class="row justify-end q-gutter-x-sm">
                <q-btn
                  label="Cancelar"
                  type="reset"
                  color="red"
                  rounded
                  flat
                  class="q-ml-sm"
                  v-close-popup
                />
                <q-btn
                  unelevated
                  rounded
                  label="Guardar"
                  type="submit"
                  color="primary"
                />
              </div>
            </div>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
  
  <script>
import OrdenServices from "src/services/OrdenServices.js";
import ProductoServices from "src/services/ProductoServices.js";
export default {
  name: "Orden",
  data() {
    return {
      model: {
        id: null,
        fecha_orden: null,
        cantidad: null,
        fecha_caducidad: null,
        producto: null,
        tipo_orden: null,
      },
      tipo_orden: [],
      productos: [],
    };
  },
  methods: {
    async nuevaOrden() {
      this.onReset();
      this.tipo_orden = await OrdenServices.obtenerTipoOrdenes();
      this.productos = await ProductoServices.obtenerProductos();
      this.$refs.modal.show();
    },
    async onSubmit() {
      const validate = await this.$refs.form.validate();
      if (validate) {
        const success = await OrdenServices.guardarOrden(this.model);
        if (success) {
          this.$refs.modal.hide();
          this.$emit("reload");
        }
      }
    },
    validarTipoOrden(val) {
      if (val == 2) {
        this.model.fecha_caducidad = null;
      }
    },
    onReset() {
      this.model = {
        id: null,
        fecha_orden: null,
        cantidad: null,
        fecha_caducidad: null,
        producto: null,
        tipo_orden: null,
      };
    },
  },
};
</script>
  
  <style>
</style>