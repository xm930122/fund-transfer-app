export const getTime = () => {
  const hours = new Date().getHours()
  // 如果小时数小于12，返回 'AM'，否则返回 'PM'
  return hours < 12 ? 'AM' : 'PM'
}

export const getFormattedTime = () => {
  const date = new Date()
  return (
    date.getHours().toString().padStart(2, '0') +
    ':' +
    date.getMinutes().toString().padStart(2, '0') +
    ':' +
    date.getSeconds().toString().padStart(2, '0')
  )
}