import OS from 'https://raw.githubusercontent.com/justaos/os/v2.2.0/os/mod.ts';

import config from './config.json' assert { type: 'json' };
import {FileUtils} from "https://raw.githubusercontent.com/justaos/kernel/1.5.1/core/mod.ts";

if (!config.programs.platform.jwtKey) {
    config.programs.platform.jwtKey = crypto.subtle.generateKey(
        { name: 'HMAC', hash: 'SHA-512' },
        true,
        ['sign', 'verify']
    )
    FileUtils.writeJsonFileSync('./config.json', config);
}

new OS(Deno.cwd()).run();
