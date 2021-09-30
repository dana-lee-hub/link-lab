import React from 'react'
import './Button.scss'

export interface IButtonProps {
  /** Optional button icon */
  icon?: JSX.Element
  /** Optional button label */
  text?: string
  /** Optional function that gets called when button is clicked */
  onClick?: () => any
  /** Optional nodeId prop for a button */
  nodeId?: string
  /**  Optional button background color */
  style?: Object
  isWhite?: boolean
}

/**
 * This is the button component. It responds to an onClick event.
 *
 * @param props: IButtonProps
 * @returns Button component
 */
export const Button = ({
  icon,
  text,
  onClick,
  style,
  isWhite,
}: IButtonProps): JSX.Element => {
  return (
    <div
      className={`button ${isWhite ? 'whiteButton' : 'nonWhiteButton'}`}
      onClick={onClick}
      style={style}
    >
      {icon && <div className="icon">{icon}</div>}
      {text && <span className="text">{text}</span>}
    </div>
  )
}
