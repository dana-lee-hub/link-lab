import React from 'react'
import { IAnchor } from '../../../types'
import { INodeContentProps } from '../NodeContent'
import { generateRandomTextAnchors } from './textAnchors'
import './TextContent.scss'

/** Full page view focused on a node's content, with annotations and links */
export const TextContent = (props: INodeContentProps) => {
  const { node, content, preview, setSelectedExtent } = props
  // This handles the case where we render text as a preview
  if (preview) {
    return <div className="textContent-preview">{content}</div>
  }

  /**
   * TODO [Lab]: Add a use ref so that we can keep track of the text content
   */

  /**
   * TODO [Lab]: Add an onPointerUp method to update the selected extent
   *
   * 1. Use document.getSelection() to get the currently selected text
   *    https://developer.mozilla.org/en-US/docs/Web/API/Selection
   * 2. Create an ITextExtent object based on the currently selected text
   * 3. Check if setSelectedExtent is passed in and update our currently selected extent
   *
   * Hint: Look at the docs!
   *
   * @param e: React.PointerEvent
   * @returns void
   */

  /**
   * TODO [Lab]: Write a method where we filter through the existing anchors.
   * Normally we would fetch these from the database, but for the simplicity
   * of this lab we have pre-created them in the `textAnchors.ts` file in the
   * `TextContent` folder.
   *
   * Hints:
   * We want to loop through our list of existing anchors and have access to the current useRef
   * object that our text is contained within. This is tricky, so feel free to ask a TA for
   * guidance on this!
   *
   * Some useful things to know:
   * - textRef.current.innerHTML will give you the innerHTML of your text.
   *   https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML
   *
   * - textRef.current.innerText will give you the innerText of your text
   *   the startCharacter and end Character should be relative to this.
   *   https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/innerText
   */
  const textAnchors = (): void => {
    const anchors: IAnchor[] = generateRandomTextAnchors(node.nodeId, content)
    // TODO
  }

  /**
   * TODO 3 [Lab]: Set the selected extent to null when this component loads
   *
   * Within this hook (which one is it?) we should be doing two things:
   *    1. loading our existing anchors (which we would normally fetch from the databased,
   *       but in this case are fetching from anchors.ts)
   *    2. Setting the selected extent to null
   *
   * Hint: Think back to Lab 1, how do we trigger commands when our component loads
   * If you can't figure this out - ask a TA!
   *
   */

  /**
   * Return text content
   * TODO [Lab]:
   *
   * 1. Add a ref object
   * 2. Add an onPointerUp method so that when we release our mouse we update the selected extent
   */
  return <div className="textContent-wrapper">{content}</div>
}
