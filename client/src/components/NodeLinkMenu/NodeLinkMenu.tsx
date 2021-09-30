import { useEffect, useMemo, useState } from 'react'
import AnchorGateway from '../../anchors/AnchorGateway'
import LinkGateway from '../../links/LinkGateway'
import { IAnchor, ILink, INode, NodeIdsToNodes } from '../../types'
import './NodeLinkMenu.scss'

interface INodeLinkMenuProps {
	nodeAnchors: IAnchor[]
	nodeIdsToNodes: NodeIdsToNodes
	selectedAnchor: IAnchor | null
	setSelectedAnchor: (anchor: IAnchor) => void
	setSelectedNode: (node: INode | null) => void
	selectedNode: INode | null
}

export const NodeLinkMenu = (props: INodeLinkMenuProps) => {
	const {
		nodeAnchors,
		nodeIdsToNodes,
		selectedAnchor,
		setSelectedAnchor,
		setSelectedNode,
		selectedNode,
	} = props
	const [links, setLinks] = useState<ILink[]>([])

	useEffect(() => {
		loadLinks()
	}, [selectedAnchor, nodeAnchors])

	const loadLinks = async () => {
		// Intentionally left blank
		return {}
	}

	const fetchNodeFromLink = async (link: ILink) => {
		// Intentionally left blank
		return {}
	}

	return (
		<div className="linkMenu">
			{links.map((link) => {
				return (
					<div className="linkItem" key={link.linkId}>
						{link.linkId}
					</div>
				)
			})}
		</div>
	)
}
