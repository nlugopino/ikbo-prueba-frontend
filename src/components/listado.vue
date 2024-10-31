<template>
  <div class="row q-gutter-y-md">
    <div class="col-2">
      <q-input
        dense
        outlined
        rounded
        v-model="filter"
        type="text"
        label="Filtrar"
      />
    </div>
    <div class="col-12">
      <q-table flat bordered :data="value" :columns="columns" :filter="filter" row-key="name">
        <template v-slot:body-cell-acciones="props">
          <q-td :props="props">
            <div>
              <q-btn
                dense
                unelevated
                size="sm"
                color="primary"
                icon="mdi-pencil"
                @click="editarProducto(props.row)"
              >
                <q-tooltip>Editar</q-tooltip>
              </q-btn>
            </div>
          </q-td>
        </template>
      </q-table>
    </div>
  </div>
</template>

<script>
import producto from "./producto.vue";
export default {
  name: "Listado",
  props: {
    value: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data() {
    return {
      filter: null,
      columns: [
        {
          name: "nombre",
          label: "Nombre",
          align: "left",
          field: "nombre",
          sortable: true,
        },
        {
          name: "cantidad",
          label: "Cantidad",
          align: "left",
          field: "cantidad",
          sortable: true,
        },
        {
          name: "fecha_caducidad",
          label: "Fecha de caducidad",
          align: "left",
          field: "fecha_caducidad",
          sortable: true,
        },
        {
          name: "estado",
          label: "Estado",
          align: "left",
          field: "estado",
          sortable: true,
        },
        {
          name: "acciones",
          label: "Acciones",
          align: "center",
        },
      ],
    };
  },
  methods: {
    editarProducto(model) {
      this.$emit("editarProducto", { ...model });
    },
  },
};
</script>

<style>
</style>