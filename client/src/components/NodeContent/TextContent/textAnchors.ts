import uniqid from 'uniqid'
import { IAnchor } from '../../../types'

export const generateRandomTextAnchors = (nodeId: string, content: string): IAnchor[] => {
  const anchors: IAnchor[] = []
  for (let i = 0; i < 3; i++) {
    const startCharacter = getRandomArbitrary(0, content.length - 20)
    const endCharacter = getRandomArbitrary(startCharacter + 5, startCharacter + 15)
    anchors.push({
      nodeId: nodeId,
      anchorId: generateAnchorId(),
      extent: {
        type: 'text',
        startCharacter: startCharacter,
        endCharacter: endCharacter,
      },
    })
  }
  return anchors
}

const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min
}

export function generateAnchorId() {
  return uniqid('anchor.')
}
