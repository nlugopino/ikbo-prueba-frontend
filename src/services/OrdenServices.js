import axios from 'axios';
import { Notify } from 'quasar';

export default {
    async obtenerTipoOrdenes() {
        try {
            const response = await axios.get('/api/tipo_ordenes/');
            return response.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    },
    async guardarOrden(model) {
        try {
            const response = await axios.post('/api/ordenes/', model);
            if (response.status === 201) {
                Notify.create({
                    message: 'Orden creada correctamente.',
                    color: 'green'
                });
                return true;
            } else {
                Notify.create({
                    message: 'Se presentó un error al crear la orden.',
                    color: 'red'
                });
                return false;
            }
        } catch (error) {
            if (error.status === 400) {
                Notify.create({
                    message: error.response.data.error,
                    color: 'red'
                });
            } else {
                Notify.create({
                    message: 'Error en la solicitud.',
                    color: 'red'
                });
            }
            return false;
        }
    },
};