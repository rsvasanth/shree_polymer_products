import { readFile } from 'fs/promises';
import { join } from 'path';

const common_site_config_path = join(__dirname, '../../../sites/common_site_config.json');

export default {
    '^/(app|api|assets|files|private)': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        ws: true,
        router: async function (req: any) {
            try {
                const config = JSON.parse(await readFile(common_site_config_path, 'utf-8'));
                const webserver_port = config.webserver_port || 8000;
                const site_name = req.headers.host.split(':')[0];
                return `http://${site_name}:${webserver_port}`;
            } catch (e) {
                return `http://127.0.0.1:8000`;
            }
        }
    }
};
