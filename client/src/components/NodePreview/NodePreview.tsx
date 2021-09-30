import React from 'react'
import { Link } from 'react-router-dom'
import { nodeTypeIcon, pathToString } from '../../global'
import { INode } from '../../types'
import { INodeContentProps, NodeContent } from '../NodeContent'
import { FolderContentType } from '../NodeView'
import './NodePreview.scss'

export interface INodePreviewProps {
  node: INode
  onDeleteButtonClick: (node: INode) => unknown
  onMoveButtonClick: (node: INode) => unknown
  setSelectedNode: (node: INode) => void
  childNodes?: INode[]
  folderContentType?: FolderContentType
}

/** Full page view focused on a node's content, with annotations and links */
export const NodePreview = (props: INodePreviewProps) => {
  const { node, setSelectedNode, onDeleteButtonClick, onMoveButtonClick, childNodes } =
    props
  const { type, title, content } = node
  return (
    <Link to={`/${pathToString(node.filePath)}`}>
      <div
        className={'grid-nodePreview'}
        onClick={() => {
          setSelectedNode(node)
        }}
      >
        <div className="content-preview">
          <NodeContent {...props} type={type} content={content} preview={true} />
        </div>
        <div className="node-info">
          <div className="info-container">
            <div className="main-info">
              {nodeTypeIcon(node.type)}
              <div className="title">{title}</div>
            </div>
            <div className="sub-info">
              {node.dateCreated && (
                <div className="dateCreated">
                  {'Created on ' + new Date(node.dateCreated).toLocaleDateString('en-US')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
