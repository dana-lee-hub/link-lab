/**
 *  An anchor to be used in links. Consists of a `nodeId` and the
 *  `extent` of the anchor in that node
 */
export interface IAnchor {
  anchorId: string
  nodeId: string
  /**
   * Defines the extent of the anchor in the document,
   * e.g. start / end characters in a text node. If extent is null,
   * the anchor points to the node as a whole.
   */
  extent: Extent | null
}

/**
 * Defines the extent of an anchor in a document,
 * e.g. start / end characters in a text node.
 */
export type Extent = ITextExtent | IImageExtent

/** Defines the extent of an anchor on a text node */
export interface ITextExtent {
  type: 'text'
  startCharacter: number
  endCharacter: number
  text?: string
}

/** Defines the extent of an anchor on an image node */
export interface IImageExtent {
  type: 'image'
  left: number
  top: number
  width: number
  height: number
}

/** Coordinates of an image pixel */
interface ICoordinate {
  x: number
  y: number
}

/**
 * Get a snippet of the content described by an anchor's extent.
 * Return null if there's no user-friendly way to describe an anchor's extent,
 * e.g. for the rectangular selection on an image node.
 */
export const getAnchorContentSnippet = ({
  extent,
  content,
}: {
  extent: Extent
  content: string
}): string | null => {
  if (extent.type === 'text') {
    const { startCharacter, endCharacter } = extent
    return content.slice(startCharacter, endCharacter)
  } else {
    return null
  }
}
