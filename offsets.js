const fs = require('fs');
const https = require('https');
const path = require('path');

(async function() {
  const cBaseEntity = await fetchAsync('https://apex.dumps.host/?class=CBaseEntity');
  const cPlayer = await fetchAsync('https://apex.dumps.host/?class=CPlayer');
  const offsets = await fetchAsync('https://apex.dumps.host/offsets');
  
  writeAsync('coreOffsets', {
    levelName: BigInt(find(offsets, 'level_name')),
    clEntityList: BigInt(find(offsets, 'cl_entitylist')),
    localPlayer: BigInt(find(offsets, 'local_player'))
  });
  
  writeAsync('entityOffsets', {
    localOrigin: Number(find(cBaseEntity, 'm_localOrigin')) + 0x100,
    iTeamNum: Number(find(cBaseEntity, 'm_iTeamNum')),
    iName: Number(find(cBaseEntity, 'm_iName')),
    glowEnable: Number(BigInt(0x3c8)),
    glowThroughWall: Number(BigInt(0x3d0))
  });

  writeAsync('playerOffsets', {
    lifeState: Number(find(cPlayer, 'm_lifeState')),
    viewAngles: Number(find(cPlayer, 'm_ammoPoolCapacity')) - 0x14,
    bleedoutState: Number(find(cPlayer, 'm_bleedoutState'))
  });
})();

/**
 * @param {String} url 
 * @returns {Promise<String>}
 */
async function fetchAsync(url) {
  return await new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const chunks = [];
      res.on('error', reject);
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    }).on('error', reject);
  });
}

/**
 * @param {String} html
 * @param {String} name 
 * @returns {string}
 */
function find(html, name) {
  const expression = new RegExp(`${name}.*(0x[0-9A-Z]+)`, 'i');
  const match = html.match(expression);
  if (match) return match[1];
  throw new Error(`Invalid offset ${name} in ${html}`);
}

/**
 * @param {String} name
 * @param {Record<string, BigInt>} values 
 * @returns {String}
 */
async function writeAsync(name, values) {
  const entries = Object.entries(values).map(([k, v]) => `${k}: BigInt('0x${v.toString(16)}')`);
  const filePath = path.join('src/lib/core/offsets', `${name}.ts`);
  const result = `export const ${name} = {\n${entries.map(x => `  ${x}`).join(',\n')}\n};\n`;
  await fs.promises.writeFile(filePath, result);
}
