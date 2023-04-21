import fs from 'fs';
// import ora from 'ora';
// import fetch from 'node-fetch';
// import path from 'path';
import { getColors, getDeploy, getTypography, getSpacing } from './types/index.js';
// const DESIGN_TOKENS_PATH = path.join(process.cwd(), '.', 'tokens');
const genFile = tokens => {
  return tokens
  // if (!fs.existsSync(DESIGN_TOKENS_PATH)) {
  //   fs.mkdirSync(DESIGN_TOKENS_PATH);
  // }
  // fs.writeFile(`${DESIGN_TOKENS_PATH}/tokens.json`, JSON.stringify(tokens, null, 2), err => {
  //   if (err) throw new Error(`\x1b[31m\n\n❌ ${err}\n\n`);
  //   console.log('\x1b[32m✔︎\x1b[0m Figma design tokens created!\n');
  // });
};
export default async function genTokens(apikey, id) {
  // const spinner = ora('🚀 Connecting with Figma...\n').start();
  const FETCH_PATH = 'https://api.figma.com/v1/files';
  const FETCH_URL = `${FETCH_PATH}/${id}`;
  const FETCH_DATA = {
    method: 'GET',
    headers: { 'X-Figma-Token': apikey }
  };
  const req = await fetch(FETCH_URL, FETCH_DATA)
  const styles = await req.json();

  if (styles.status !== 403 && styles.status !== 404) {
    const figmaTree = styles.document.children[0].children;
    return genFile({
      ...getColors('Colors', figmaTree),
      ...getDeploy('isReadyForDeploy', figmaTree),
      ...getSpacing('Layout', figmaTree),
      ...getTypography('Typography', figmaTree)
      // ...getShadows('Shadows', figmaTree),
      // ...getRadius('Radius', figmaTree),
      // ...getBreakpoints('Breakpoints', figmaTree)
    });
  }
}