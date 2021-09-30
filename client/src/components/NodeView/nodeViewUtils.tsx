import uniqid from 'uniqid'

export function generateAnchorId() {
  return uniqid('anchor.')
}
