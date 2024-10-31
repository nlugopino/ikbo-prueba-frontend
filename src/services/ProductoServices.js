import axios from 'axios';
import { Notify } from 'quasar';

export default {
    async obtenerProductos() {
        try {
            const response = await axios.get('/api/productos/');
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    async guardarProducto(model) {
        try {
            let url = '/api/productos/';
            let response = null;
            if (model.id == null) {
                response = await axios.post('/api/productos/', model);
            } else {
                url += `${model.id}/`;
                response = await axios.put(url, model);
            }
            if (response.status === 201) {
                Notify.create({
                    message: 'Producto creado correctamente.',
                    color: 'green'
                });
                return true;
            } else if (response.status === 202) {
                Notify.create({
                    message: 'Producto actualizado correctamente.',
                    color: 'green'
                });
                return true;
            } else {
                Notify.create({
                    message: `Se presentó un error al ${model.id == null ? 'crear' : 'actualizar'} el producto.`,
                    color: 'red'
                });
                return false;
            }
        } catch (error) {
            console.error(error);
            Notify.create({
                message: 'Error en la solicitud.',
                color: 'red'
            });
            return false;
        }
    },
};