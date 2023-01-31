import OS from 'https://raw.githubusercontent.com/justaos/os/v2.2.0/os/mod.ts';

import config from './config.json' assert { type: 'json' };
import FileUtils from "https://deno.land/x/justaos_utils@1.3.0/file-utils/mod.ts";

if (!config.setupComplete) {
    console.log("performing initial setup")
    config.setupComplete = true;
    const key = await crypto.subtle.generateKey(
        { name: 'HMAC', hash: 'SHA-512' },
        true,
        ['sign', 'verify']
    )
    config.programs.platform.jwtKey = await crypto.subtle.exportKey("jwk", key);
    FileUtils.writeTextFileSync('./config.json', JSON.stringify(config, null, 4));
}

new OS(Deno.cwd()).run();
