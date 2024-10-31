<template>
  <q-dialog ref="modal" persistent>
    <q-card style="width: 500px; max-width: 80vw">
      <q-card-section class="row items-center">
        <q-icon name="mdi-plus" size="sm" />
        <span class="q-ml-sm">Nuevo producto</span>
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
              <q-input
                outlined
                rounded
                dense
                v-model="model.nombre"
                type="text"
                label="Nombre del producto *"
                :rules="[(val) => !!val || 'Este campo es requerido']"
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
import ProductoServices from "src/services/ProductoServices.js";
export default {
  name: "Producto",
  data() {
    return {
      model: {
        id: null,
        nombre: null,
        cantidad: 0,
      },
    };
  },
  methods: {
    nuevoProducto() {
      this.onReset();
      this.$refs.modal.show();
    },
    editarProducto(model) {
      this.model = model;
      this.$refs.modal.show();
    },
    async onSubmit() {
      const validate = await this.$refs.form.validate();
      if (validate) {
        const success = await ProductoServices.guardarProducto(this.model);
        if (success) {
          this.$refs.modal.hide();
          this.$emit("reload");
        }
      }
    },
    onReset() {
      this.model = {
        id: null,
        nombre: null,
        cantidad: 0,
      };
    },
  },
};
</script>

<style>
</style>