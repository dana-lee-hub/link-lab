import React from 'react'
import { Button } from '../Button'
import './Header.scss'
import * as ri from 'react-icons/ri'
import { IAnchor } from '../../types'

interface IHeaderProps {
  onHomeClick: () => unknown
  onCreateButtonClick: () => unknown
  isLinking?: boolean
  linkFrom: IAnchor | null
  setLinkFrom: (anchor: IAnchor | null) => void
  setIsLinking: (isLinking: boolean) => void
}

export const Header = ({
  onCreateButtonClick,
  onHomeClick,
  isLinking = false,
  linkFrom,
  setLinkFrom,
  setIsLinking,
}: IHeaderProps) => {
  const customButtonStyle = { width: 30, height: 30, marginLeft: 10 }

  const handleCancelLink = () => {
    setLinkFrom(null)
    setIsLinking(false)
  }

  return (
    <div className={isLinking ? 'header-linking' : 'header'}>
      <div className="left-bar">
        <div className="name" onClick={onHomeClick}>
          My<b>Hypermedia</b>
        </div>
        <Button
          isWhite={isLinking}
          style={customButtonStyle}
          icon={<ri.RiHome2Line />}
          onClick={onHomeClick}
        />
        <Button
          isWhite={isLinking}
          style={customButtonStyle}
          icon={<ri.RiAddCircleLine />}
          onClick={onCreateButtonClick}
        />
      </div>
      {isLinking && linkFrom && (
        <div className="right-bar">
          <div>Linking from {linkFrom.nodeId} </div>
          <Button
            onClick={handleCancelLink}
            isWhite
            text="Cancel"
            style={{ fontWeight: 600, height: 30, marginLeft: 20 }}
            icon={<ri.RiCloseLine />}
          />
        </div>
      )}
    </div>
  )
}
