import { INodeViewProps } from '..'
import * as ri from 'react-icons/ri'
import * as bi from 'react-icons/bi'
import { Button } from '../../Button'
import React from 'react'

interface INodeHeaderProps extends INodeViewProps {
	onHandleStartLinkClick: () => void
	onHandleCompleteLinkClick: () => void
}

export const NodeHeader = (props: INodeHeaderProps) => {
	const {
		node,
		nodeIdsToNodes,
		setSelectedNode,
		onDeleteButtonClick,
		onMoveButtonClick,
		onCompleteLinkClick,
		setLinkFrom,
		linkFrom,
		isLinking,
		setIsLinking,
		onHandleStartLinkClick,
		onHandleCompleteLinkClick,
	} = props

	const {
		title,
		type,
		filePath: { path },
		content,
	} = node

	const notRoot: boolean = node.nodeId !== 'root'
	return (
		<div className="nodeView-info">
			<div className="nodeView-title">{title}</div>
			<div className="nodeView-buttonBar">
				{notRoot && (
					<>
						<Button
							icon={<ri.RiDeleteBin6Line />}
							text="Delete"
							onClick={() => onDeleteButtonClick(node)}
						/>
						<Button
							icon={<ri.RiDragDropLine />}
							text="Move"
							onClick={() => onMoveButtonClick(node)}
						/>
						<Button
							icon={<ri.RiExternalLinkLine />}
							text="Start Link"
							onClick={onHandleStartLinkClick}
						/>
						{isLinking && (
							<Button
								text="Complete Link"
								icon={<bi.BiLinkAlt />}
								onClick={onHandleCompleteLinkClick}
							/>
						)}
					</>
				)}
			</div>
		</div>
	)
}
