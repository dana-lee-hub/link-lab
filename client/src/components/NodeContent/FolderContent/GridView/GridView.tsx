import React from 'react'
import { INode } from '../../../../types'
import { NodePreview } from '../../../NodePreview'
import './GridView.scss'

export type IViewType = 'list' | 'grid'

export interface IGridViewProps {
  childNodes: INode[]
  setSelectedNode: (node: INode) => void
  onDeleteButtonClick: (node: INode) => unknown
  onMoveButtonClick: (node: INode) => unknown
}

/** Full page view focused on a node's content, with annotations and links */
export const GridView = (props: IGridViewProps) => {
  const { childNodes, setSelectedNode, onDeleteButtonClick, onMoveButtonClick } = props

  const nodes = childNodes.map((childNode) => (
    <NodePreview
      onDeleteButtonClick={onDeleteButtonClick}
      onMoveButtonClick={onMoveButtonClick}
      key={childNode.nodeId}
      node={childNode}
      setSelectedNode={setSelectedNode}
    />
  ))

  return <div className={'gridView-wrapper'}>{nodes}</div>
}
