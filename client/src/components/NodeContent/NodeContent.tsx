import React from 'react'
import { Extent, IAnchor, INode, NodeType } from '../../types'
import { FolderContentType, INodeViewProps } from '../NodeView'
import './NodeContent.scss'
import { FolderContent } from './FolderContent'
import { ImageContent } from './ImageContent'
import { TextContent } from './TextContent'

/** Props needed to render any node content */

// node: INode
//   onDeleteButtonClick: (node: INode) => unknown
//   onMoveButtonClick: (node: INode) => unknown
//   setSelected: (node: INode) => void
//   folderContentType?: FolderContentType

export interface INodeContentProps {
  node: INode
  onDeleteButtonClick: (node: INode) => unknown
  onMoveButtonClick: (node: INode) => unknown
  setSelectedNode: (node: INode) => void
  type: NodeType
  content: any
  setSelectedExtent?: (extent: Extent | null) => void
  selectedAnchor?: IAnchor | null
  anchors?: IAnchor[]
  folderContentType?: FolderContentType
  childNodes?: INode[]
  preview?: boolean
}

/**
 * This is the node content.
 *
 * @param props: INodeContentProps
 * @returns Content that any type of node renders
 */
export const NodeContent = (props: INodeContentProps) => {
  const {
    node,
    onDeleteButtonClick,
    onMoveButtonClick,
    setSelectedNode,
    childNodes,
    folderContentType,
    type,
    preview,
  } = props
  switch (type) {
    case 'image':
      return <ImageContent preview={preview} {...props} />
    case 'text':
      return <TextContent preview={preview} {...props} />
    case 'folder':
      if (childNodes && (folderContentType || preview)) {
        return (
          <FolderContent
            onDeleteButtonClick={onDeleteButtonClick}
            onMoveButtonClick={onMoveButtonClick}
            setSelectedNode={setSelectedNode}
            childNodes={childNodes}
            viewType={folderContentType}
            preview={preview}
          />
        )
      }
  }
  return null
}
