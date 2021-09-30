import uniqid from 'uniqid'
import { IAnchor } from '../../../types'

export const generateRandomImageAnchors = (
  nodeId: string,
  width: number,
  height: number
): IAnchor[] => {
  const anchors: IAnchor[] = []
  for (let i = 0; i < 3; i++) {
    const top = getRandomArbitrary(0, height - 100)
    const left = getRandomArbitrary(0, width - 100)
    const extentWidth = getRandomArbitrary(50, 100)
    const extentHeight = getRandomArbitrary(50, 100)
    anchors.push({
      nodeId: nodeId,
      anchorId: generateAnchorId(),
      extent: {
        type: 'image',
        top: top,
        left: left,
        width: extentWidth,
        height: extentHeight,
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
