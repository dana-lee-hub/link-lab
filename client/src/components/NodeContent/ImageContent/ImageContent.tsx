import React, { useEffect, useRef } from 'react'
import * as fa from 'react-icons/fa'
import { IAnchor, IImageExtent } from '../../../types'
import { INodeContentProps } from '../NodeContent'
import { generateRandomImageAnchors } from './imageAnchors'
import './ImageContent.scss'

/** Full page view focused on a node's content, with annotations and links */
export const ImageContent = (props: INodeContentProps) => {
  const { node, content, preview, anchors, selectedAnchor, setSelectedExtent } = props
  if (preview) {
    return (
      <div className="imageContent-preview">
        <img src={content} />
      </div>
    )
  }

  let dragging: boolean = false
  let currentTop: number
  let currentLeft: number

  useEffect(() => {
    setSelectedExtent && setSelectedExtent(null)
  }, [setSelectedExtent])

  /**
   * onPointerDown initializes the selection
   * @param e
   */
  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragging = true
    const top = imageContainer.current?.getBoundingClientRect().top
    const left = imageContainer.current?.getBoundingClientRect().left

    const x = e.clientX
    const y = e.clientY
    if (selection.current && left && top) {
      selection.current.style.left = String(x - left) + 'px'
      selection.current.style.top = String(y - top) + 'px'
      currentLeft = x - left
      currentTop = y - top
      selection.current.style.width = '0px'
      selection.current.style.height = '0px'
    }
  }

  /**
   * onMove resizes the selection
   * @param e
   */
  const onMove = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (dragging) {
      const x = e.clientX
      const y = e.clientY
      const deltaX = e.movementX
      const deltaY = e.movementY
      if (selection.current) {
        const imageTop = imageContainer.current?.getBoundingClientRect().top
        const imageLeft = imageContainer.current?.getBoundingClientRect().left
        let left = parseFloat(selection.current.style.left)
        let top = parseFloat(selection.current.style.top)
        let width = parseFloat(selection.current.style.width)
        let height = parseFloat(selection.current.style.height)

        // TODO: Change this depending on your screen resolution
        const divider = 1

        if (imageLeft && x - imageLeft < currentLeft) {
          width -= deltaX / divider
          left += deltaX / divider
          selection.current.style.left = String(left) + 'px'
        } else {
          width += deltaX / divider
        }

        if (imageTop && y - imageTop < currentTop) {
          console.log(top)
          height -= deltaY / divider
          top += deltaY / divider
          selection.current.style.top = String(top) + 'px'
        } else {
          height += deltaY / divider
        }

        selection.current.style.width = String(width) + 'px'
        selection.current.style.height = String(height) + 'px'
      }
    }
  }

  /**
   * onPointerUp updates and completes the selection
   * @param e
   */
  const onPointerUp = (e: React.PointerEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragging = false
    if (selection.current) {
      currentTop = 0
      currentLeft = 0
      const extent: IImageExtent = {
        type: 'image',
        left: parseFloat(selection.current.style.left),
        top: parseFloat(selection.current.style.top),
        width: parseFloat(selection.current.style.width),
        height: parseFloat(selection.current.style.height),
      }
      if (setSelectedExtent) {
        setSelectedExtent(extent)
      }
    }
  }

  const imageContainer = useRef<HTMLHeadingElement>(null)
  const selection = useRef<HTMLHeadingElement>(null)

  const onHandleClearSelectionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (setSelectedExtent) {
      setSelectedExtent(null)
      if (selection.current) {
        // Note: This is a rather hacky solution to hide the selected region
        selection.current.style.left = '-50px'
        selection.current.style.top = '-50px'
        selection.current.style.width = '0px'
        selection.current.style.height = '0px'
      }
    }
  }

  /**
   * TODO [Lab]: Write a method where we filter through the existing anchors.
   * Normally we would fetch these from the database, but for the simplicity
   * of this lab we are randomly generating them in the `imageAnchors.ts` file in the
   * `ImageContent` folder.
   *
   * Unlike text, where we were changing existing HTML, in this we are adding another
   * layer on top of the image. This turns out to actually be quite a lot easier!
   *
   * Hints:
   * We want to loop through our list of existing anchors and have access and render
   * them on top of the image - see where {imageAnchors()} is in the return method!
   *
   * You will also want to make sure that it renders ON TOP of the image, so you should
   * look into changing the SCSS for whatever you render (hint: use absolute!)
   */
  const imageAnchors = (): JSX.Element[] => {
    const imageWidth = imageContainer.current?.getBoundingClientRect().width
    const imageHeight = imageContainer.current?.getBoundingClientRect().height
    if (imageWidth && imageHeight) {
      const anchors: IAnchor[] = generateRandomImageAnchors(
        node.nodeId,
        imageWidth,
        imageHeight
      )
    }
    // TODO: We should be returning the different anchors!
    return []
  }

  return (
    <div
      ref={imageContainer}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerMove={onMove}
      className="imageContent-wrapper"
    >
      {imageAnchors()}
      {
        <div className="selection" ref={selection}>
          <div
            onClick={onHandleClearSelectionClick}
            onPointerDown={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className="selection-close"
          >
            <fa.FaTimes />
          </div>
        </div>
      }
      <img src={content} />
    </div>
  )
}
