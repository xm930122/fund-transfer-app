import React, { Suspense } from 'react'
import styles from './index.module.less'

// 批量导入 assets/icon 下所有 .svg 文件
const iconModules = import.meta.glob('@/assets/icon/*.svg', {
  query: '?react',
  import: 'default',
})

// 存储懒加载组件
const iconComponentMap: Record<string, React.LazyExoticComponent<React.ComponentType<React.SVGProps<SVGSVGElement>>>> = {}

for (const [path, importFn] of Object.entries(iconModules)) {
  const fileName = path.split('/').pop()?.replace(/\.svg$/, '') || ''
  // 修正：lazy 工厂函数需要返回一个 Promise，resolve 一个 { default: Component } 结构
  // 因为 importFn() 直接返回 Component，所以要包装一下
  iconComponentMap[fileName] = React.lazy(() => importFn().then(component => ({ default: component })))
}

interface SvgIconProps {
  name: string
  size?: number | string
  color?: string
  className?: string
  onClick?: () => void
}

const SvgIcon: React.FC<SvgIconProps> = ({ name, size = 24, color, className, onClick }) => {
  const IconComponent = iconComponentMap[name]

  if (!IconComponent) {
    console.warn(`SvgIcon: 图标 "${name}" 未在 src/assets/icon 目录中找到`)
    return null
  }

  const sizeStyle = typeof size === 'number' ? `${size}px` : size

  return (
    <i
      className={`${styles.svgIcon} ${className || ''}`}
      style={{ width: sizeStyle, height: sizeStyle, color }}
      onClick={onClick}
    >
      <Suspense fallback={<span style={{ display: 'inline-block', width: sizeStyle, height: sizeStyle }} />}>
        <IconComponent />
      </Suspense>
    </i>
  )
}

export default SvgIcon