import { useEffect, useRef } from 'react'
import { predictClass } from '../../utils/predictClass'
import Icons8 from '../elements/Icons8'

const DynamicDropdown = ({ button, position, children, openOnHover = false }) => {
  const dropdownParent = useRef(null)

  const useOutsideClick = (combobox) => {
    useEffect(() => {
      const handleOutsideClick = (e) => {
        if (combobox.current && !combobox.current.contains(e.target)) {
          dropdownParent.current.classList.remove('active')
        }
      }
      document.addEventListener('click', handleOutsideClick)
      return () => document.removeEventListener('click', handleOutsideClick)
    }, [combobox])
  }

  useOutsideClick(dropdownParent)
  const toggleDropdown = () => {
    if (openOnHover) return
    dropdownParent.current.classList.toggle('active')
  }

  const onMouseEnter = () => {
    if (!openOnHover) return
    dropdownParent.current.classList.add('active')
  }

  const onMouseLeave = () => {
    if (!openOnHover) return
    dropdownParent.current.classList.remove('active')
  }

  return (
    <div
      className={`dynamic-dropdown-group${predictClass(() => position, position)}${predictClass(
        () => openOnHover,
        'on-hover'
      )}`}
      ref={dropdownParent}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="dy-button" onClick={toggleDropdown}>
        {button}
      </div>
      <div className="dy-menu">
        <span className="dp-point"></span>
        {children}
      </div>
    </div>
  )
}

const DyGroup = ({ name }) => {
  const switchPoint = (event) => {
    const point = event.target.parentElement.parentElement.parentElement.children[0]
    const offsetTopElement = event.target.offsetParent.offsetTop

    point.setAttribute('style', `--offset-top: ${offsetTopElement}px`)
  }
  return (
    <div className="dy-group-button" onMouseEnter={switchPoint}>
      {name}
      <div className="icon">
        <Icons8 icon="forward" style="filled" size={'11px'} />
      </div>
    </div>
  )
}

const Li = ({
  name,
  leftIcon = null,
  leftIconSize = '11px',
  leftIconStyle = 'regular',
  rightIcon = null,
  rightIconSize = '11px',
  rightIconStyle = 'regular',
  brightness = 'var(--icon4)',
  disabled = false,
  callback = async () => {}
}) => {
  const onClick = async (event) => {
    if (disabled === true) return
    await callback(event)
    event.target.parentElement.parentElement.classList.remove('active')
  }
  const switchPoint = (event) => {
    if (disabled === true) return
    const point = event.target.parentElement.children[0]
    const offsetTopElement = event.target.offsetTop

    point.setAttribute('style', `--offset-top: ${offsetTopElement}px`)
  }
  return (
    <div className={`dp-list${predictClass(() => disabled, 'disabled')}`} onClick={onClick} onMouseEnter={switchPoint}>
      <div className="dp-left-icon">
        {leftIcon && <Icons8 icon={leftIcon} style={leftIconStyle} size={leftIconSize} filter={brightness} />}
      </div>
      {name}
      <div className="dp-right-icon">
        {rightIcon && <Icons8 icon={rightIcon} style={rightIconStyle} size={rightIconSize} filter={brightness} />}
      </div>
    </div>
  )
}

const Separator = () => {
  return <span className="dp-separator"></span>
}

DynamicDropdown.Li = Li
DynamicDropdown.Separator = Separator
DynamicDropdown.DyGroup = DyGroup
export default DynamicDropdown