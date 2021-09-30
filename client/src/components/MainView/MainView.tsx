import { ChakraProvider } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { makeRootWrapper } from '.'
import NodeGateway from '../../nodes/NodeGateway'
import { Extent, IAnchor, ILink, INode, NodeIdsToNodes } from '../../types'
import { TreeWrapper } from '../../types/TreeWrapper'
import { CreateNodeModal } from '../CreateNodeModal'
import { Header } from '../Header'
import { LoadingScreen } from '../LoadingScreen'
import { MoveNodeModal } from '../ModeNodeModal'
import { NodeView } from '../NodeView'
import { TreeView } from '../TreeView'
import './MainView.scss'
import { createNodeIdsToNodesMap, emptyNode } from './mainViewUtils'

export const MainView = () => {
  // State variables
  const [selectedNode, setSelectedNode] = useState<INode | null>(null)
  const [createNodeModalOpen, setCreateNodeModalOpen] = useState(false)
  const [completeLinkModalOpen, setCompleteLinkModalOpen] = useState(false)
  const [moveNodeModalOpen, setMoveNodeModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [rootNodes, setRootNodes] = useState<TreeWrapper[]>([new TreeWrapper(emptyNode)])
  const [isLinking, setIsLinking] = useState(false)
  const [linkFrom, setLinkFrom] = useState<IAnchor | null>(null)
  const [linkTo, setLinkTo] = useState<IAnchor | null>(null)
  const [selectedAnchor, setSelectedAnchor] = useState<IAnchor | null>(null)
  const [selectedExtent, setSelectedExtent] = useState<Extent | null>(null)
  const [updateLink, setUpdateLink] = useState(false)

  /** Map each nodeId to its full node object for easy access */
  const nodeIdsToNodes: NodeIdsToNodes = createNodeIdsToNodesMap(rootNodes)

  const url = useLocation().pathname.slice(0, -1)
  const lastUrlParam = url.substring(url.lastIndexOf('/') + 1)

  useEffect(() => {
    async function fetchNodeFromUrl() {
      const fetchResp = await NodeGateway.getNode(lastUrlParam)
      if (fetchResp.success) {
        setSelectedNode(fetchResp.payload)
      }
    }
    if (lastUrlParam.length) {
      fetchNodeFromUrl()
    }
  }, [lastUrlParam])

  const handleCreateButtonClick = async () => {
    setCreateNodeModalOpen(true)
  }

  const handleDeleteButtonClick = async (node: INode) => {
    if (node) {
      await NodeGateway.deleteNode(node.nodeId)
      const path: string[] = node.filePath.path
      const parentId: string = path[path.length - 2]
      const parentResp = await NodeGateway.getNode(parentId)
      if (parentResp.success) setSelectedNode(parentResp.payload)
      else setSelectedNode(null)
    }
  }

  const handleMoveButtonClick = () => {
    setMoveNodeModalOpen(true)
  }

  const handleCompleteLinkClick = (anchor1: IAnchor, anchor2: IAnchor) => {
    // Intentionally left blank
  }

  const handleHomeClick = () => {
    setSelectedNode(null)
  }

  /** Update our frontend root nodes from the DB */
  const loadRootsFromDB = async () => {
    const rootsFromDB = await NodeGateway.getRoots()
    if (rootsFromDB.success) {
      rootsFromDB.payload && setRootNodes(rootsFromDB.payload)
      setIsLoading(false)
    }
  }

  /**
   *  When selectedNode changes, we want to re-load the node tree from the DB
   */
  useEffect(() => {
    loadRootsFromDB()
  }, [selectedNode])

  const rootTreeWrapper: TreeWrapper = makeRootWrapper(rootNodes)

  const selectedNodeChildren = () => {
    if (!selectedNode) return undefined
    return selectedNode.filePath.children.map(
      (childNodeId) => nodeIdsToNodes[childNodeId]
    )
  }

  return (
    <ChakraProvider>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="main-container">
          <Header
            onHomeClick={handleHomeClick}
            onCreateButtonClick={handleCreateButtonClick}
            isLinking={isLinking}
            linkFrom={linkFrom}
            setLinkFrom={setLinkFrom}
            setIsLinking={setIsLinking}
          />
          <CreateNodeModal
            isOpen={createNodeModalOpen}
            onClose={() => setCreateNodeModalOpen(false)}
            setSelectedNode={setSelectedNode}
            roots={rootNodes}
          />
          {selectedNode && (
            <MoveNodeModal
              isOpen={moveNodeModalOpen}
              onClose={() => setMoveNodeModalOpen(false)}
              onSubmit={loadRootsFromDB}
              setSelectedNode={setSelectedNode}
              node={selectedNode}
              roots={rootNodes}
            />
          )}
          <div className="content">
            <div className="nodeBrowser-wrapper">
              <TreeView
                roots={rootNodes}
                selectedNode={selectedNode}
                setSelected={setSelectedNode}
              />
            </div>
            <div className="nodeView-wrapper">
              <NodeView
                childNodes={
                  selectedNode
                    ? selectedNodeChildren()
                    : rootNodes.map((root) => root.node)
                }
                setSelectedNode={setSelectedNode}
                folderContentType={'grid'}
                node={selectedNode ? selectedNode : rootTreeWrapper.node}
                onDeleteButtonClick={handleDeleteButtonClick}
                onMoveButtonClick={handleMoveButtonClick}
                onCompleteLinkClick={handleCompleteLinkClick}
                nodeIdsToNodes={nodeIdsToNodes}
                setLinkFrom={setLinkFrom}
                linkFrom={linkFrom}
                isLinking={isLinking}
                setIsLinking={setIsLinking}
                selectedAnchor={selectedAnchor}
                setSelectedAnchor={setSelectedAnchor}
                selectedExtent={selectedExtent}
                setSelectedExtent={setSelectedExtent}
                updateLink={updateLink}
              />
            </div>
          </div>
        </div>
      )}
    </ChakraProvider>
  )
}
