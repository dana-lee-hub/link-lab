import React, { useEffect, useState } from 'react'
import AnchorGateway from '../../anchors/AnchorGateway'
import { Extent, IAnchor, INode, NodeIdsToNodes } from '../../types'
import { NodeBreadcrumb } from '../NodeBreadcrumb'
import { NodeContent } from '../NodeContent'
import { NodeLinkMenu } from '../NodeLinkMenu'
import { NodeHeader } from './NodeHeader'
import './NodeView.scss'
import { generateAnchorId } from './nodeViewUtils'

export type FolderContentType = 'list' | 'grid'
export interface INodeViewProps {
  node: INode
  onDeleteButtonClick: (node: INode) => unknown
  onMoveButtonClick: (node: INode) => unknown
  onCompleteLinkClick: (anchor1: IAnchor, anchor2: IAnchor) => unknown
  /** Used for rendering the breadcrumb */
  nodeIdsToNodes: NodeIdsToNodes
  childNodes?: INode[]
  folderContentType?: FolderContentType
  setSelectedNode: (node: INode | null) => void
  linkFrom: IAnchor | null
  setLinkFrom: (anchor: IAnchor) => void
  setIsLinking: (isLinking: boolean) => void
  selectedAnchor: IAnchor | null
  selectedExtent: Extent | null
  setSelectedExtent: (extent: Extent | null) => void
  setSelectedAnchor: (anchor: IAnchor | null) => void
  updateLink: boolean
  isLinking: boolean
}

/** Full page view focused on a node's content, with annotations and links */
export const NodeView = (props: INodeViewProps) => {
  const {
    node,
    nodeIdsToNodes,
    setSelectedNode,
    onCompleteLinkClick,
    setLinkFrom,
    setIsLinking,
    linkFrom,
    selectedAnchor,
    selectedExtent,
    setSelectedExtent,
    setSelectedAnchor,
    updateLink,
    isLinking,
  } = props

  const [anchors, setAnchors] = useState<IAnchor[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const {
    title,
    type,
    filePath: { path },
    content,
  } = node

  const handleSetSelected = (extent: Extent | null): Extent | null => {
    setSelectedExtent(extent)
    return selectedExtent
  }

  const loadAnchorsFromNodeId = async () => {
    // Intentionally left blank
  }

  const handleStartLinkClick = () => {
    // Intentionally left blank
    if (selectedExtent?.type == 'image') {
      alert(
        'top: ' +
          selectedExtent.top +
          '\n' +
          'left: ' +
          selectedExtent.left +
          '\n' +
          'width: ' +
          selectedExtent.width +
          '\n' +
          'height: ' +
          selectedExtent.height
      )
    } else if (selectedExtent?.type == 'text') {
      alert(
          'startCharacter: ' +
            selectedExtent.startCharacter +
            '\n' +
            'endCharacter: ' +
            selectedExtent.endCharacter +
            '\n' +
            'text: ' +
            selectedExtent.text
      )
    } else {
      alert(selectedExtent)
    }
    setIsLinking(true)
  }

  const handleCompleteLinkClick = () => {
    // Intentionally left blank
  }

  useEffect(() => {
    loadAnchorsFromNodeId()
  }, [node.nodeId, updateLink])

  const hasBreadcrumb: boolean = path.length > 1
  return (
    <div className="nodeView">
      {hasBreadcrumb && (
        <div className="nodeView-breadcrumb">
          <NodeBreadcrumb
            path={path}
            nodeIdsToNodes={nodeIdsToNodes}
            setSelected={setSelectedNode}
          />
        </div>
      )}
      <NodeHeader
        {...props}
        onHandleStartLinkClick={handleStartLinkClick}
        onHandleCompleteLinkClick={handleCompleteLinkClick}
      />
      <div className="nodeMain-content">
        <div
          className="nodeView-content"
          style={{
            maxHeight: hasBreadcrumb ? 'calc(100% - 118px)' : 'calc(100% - 72px)',
          }}
        >
          <NodeContent
            {...props}
            anchors={anchors}
            selectedAnchor={selectedAnchor}
            type={type}
            content={content}
          />
        </div>
      </div>
    </div>
  )
}
