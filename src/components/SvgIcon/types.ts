export interface SvgIconProps {
  /** 图标文件名（不含 .svg 后缀），例如 'wifi' */
  name: string
  /** 图标尺寸，默认 24px */
  size?: number | string
  /** 图标颜色（会覆盖 SVG 默认颜色，需 SVG 内部支持 currentColor） */
  color?: string
  /** 自定义类名 */
  className?: string
  /** 点击事件 */
  onClick?: () => void
}