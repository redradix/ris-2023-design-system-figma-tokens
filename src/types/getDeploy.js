import { getTokens, camelCase, rgbaGenObject, fullColorHex } from '../utils.js'
export default function getDeploy(layerName, stylesArtboard) {
  const palette = {
    isReadyForDeploy: {}
  }
  const decorator = element => {
    const { name } = element
    const { r, g, b, a } = element.children[0].fills[0].color
    const colorRGBA = rgbaGenObject(r, g, b, a)
    const tokens = {
      [camelCase(name)]: `${fullColorHex(colorRGBA.r, colorRGBA.g, colorRGBA.b)}`
    }

    Object.assign(palette.isReadyForDeploy, tokens, {
      isReady: tokens.color.toLowerCase() === '#00ff00'
    })
  }
  return getTokens(layerName, stylesArtboard, palette, decorator)
}
