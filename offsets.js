const fs = require('fs');
const https = require('https');
const path = require('path');

(async function() {
  const cBaseEntity = await fetchAsync('https://apex.dumps.host/?class=CBaseEntity');
  const cPlayer = await fetchAsync('https://apex.dumps.host/?class=CPlayer');
  const offsets = await fetchAsync('https://apex.dumps.host/offsets');
  
  writeAsync('coreOffsets', {
    levelName: find(offsets, 'level_name'),
    clEntityList: find(offsets, 'cl_entitylist'),
    localPlayer: find(offsets, 'local_player')
  });
  
  writeAsync('playerOffsets', {
    localOrigin: BigInt('0x158'),
    shieldHealth: find(cBaseEntity, 'm_shieldHealth'),
    shieldHealthMax: find(cBaseEntity, 'm_shieldHealthMax'),
    iHealth: find(cPlayer, 'm_iHealth'),
    iTeamNum: find(cBaseEntity, 'm_iTeamNum'),
    iMaxHealth: find(cPlayer, 'm_iMaxHealth'),
    lifeState: find(cPlayer, 'm_lifeState'),
    viewAngles: find(cPlayer, 'm_ammoPoolCapacity') - BigInt(0x14),
    bleedoutState: find(cPlayer, 'm_bleedoutState')
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
 * @returns {BigInt}
 */
function find(html, name) {
  const expression = new RegExp(`${name}.*(0x[0-9A-Z]+)`, 'i');
  const match = html.match(expression);
  return match ? BigInt(match[1]) : undefined;
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
