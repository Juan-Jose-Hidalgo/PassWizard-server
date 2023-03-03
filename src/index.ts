import 'dotenv/config';
import app from './app';
import { sequelize } from './database/database.conexion';

const PORT = process.env.PORT || 3002;
const main = async () => {
    try {
        await sequelize.sync({ force: true });
        app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
    } catch (error) {
        console.error('Error en la conexión a la BBDD:', error);
    }
}

main();
