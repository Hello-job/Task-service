const dayjs = require('dayjs')

/**
 *
 * @param {格式化数据} data
 * @param {格式化类型} format
 * @param {key值或nudefined} keys
 * @returns
 */

const formatDataTime = (data, format, keys) => {
  if (typeof data === 'object') {
    if (Array.isArray(keys)) {
      Object.keys(data).forEach(key => {
        if (keys.includes(key)) {
          data[key] = dayjs(data[key]).format(format)
        }
      })
    } else if (typeof keys === 'string') {
      data[keys] = dayjs(data[keys]).format(format)
    }
  } else if (typeof data === 'string') {
    data = dayjs(data).format(format)
    return data
  }
}

module.exports = { formatDataTime }
