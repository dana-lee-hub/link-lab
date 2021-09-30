import React from 'react'
import { INode } from '../../../types'
import { FolderContentType } from '../../NodeView'
import './FolderContent.scss'
import { GridView } from './GridView'

export interface IFolderContentProps {
  setSelectedNode: (node: INode) => void
  onDeleteButtonClick: (node: INode) => unknown
  onMoveButtonClick: (node: INode) => unknown
  childNodes: INode[]
  viewType?: FolderContentType
  preview?: boolean
}

/** Full page view focused on a node's content, with annotations and links */
export const FolderContent = (props: IFolderContentProps) => {
  const {
    childNodes,
    setSelectedNode,
    viewType,
    onDeleteButtonClick,
    onMoveButtonClick,
    preview,
  } = props

  if (preview) {
    return <div>hello world!</div>
  }

  let nodes
  switch (viewType) {
    case 'grid':
      nodes = (
        <GridView
          onDeleteButtonClick={onDeleteButtonClick}
          onMoveButtonClick={onMoveButtonClick}
          childNodes={childNodes}
          setSelectedNode={setSelectedNode}
        />
      )
      break
    default:
      nodes = null
      break
  }

  return <div>{nodes}</div>
}
