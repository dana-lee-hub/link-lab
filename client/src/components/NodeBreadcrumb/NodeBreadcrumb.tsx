import React from 'react'
import './NodeBreadcrumb.scss'
import { FaAngleRight } from 'react-icons/fa'
import { isNotNullOrUndefined } from '../../global'
import { NodeIdsToNodes, INode } from '../../types'

export interface INodeBreadcrumbProps {
  path: string[]
  nodeIdsToNodes: NodeIdsToNodes
  setSelected: (node: INode) => void
}

/** Render a breadcrumb that shows the path from the root to the current node */
export const NodeBreadcrumb = ({
  path,
  nodeIdsToNodes,
  setSelected,
}: INodeBreadcrumbProps) => {
  const pathNodes = path
    .map((nodeId: string) => nodeIdsToNodes[nodeId])
    .filter(isNotNullOrUndefined)
  if (pathNodes.length === 0) return null
  const parentNodes = pathNodes.slice(0, -1)
  const currentNode = pathNodes[pathNodes.length - 1]

  return (
    <div className="node-breadcrumb">
      {parentNodes.map((node: INode) => (
        <div className="breadcrumb-item-wrapper" key={node.nodeId}>
          <div className={'breadcrumb-item'} onClick={() => setSelected(node)}>
            {node.title}
          </div>
          <FaAngleRight />
        </div>
      ))}
      <div key={currentNode.nodeId} className={'breadcrumb-item selected'}>
        {currentNode.title}
      </div>
    </div>
  )
}
