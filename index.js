export default (selector, option) => {

  let styles = ''
  let count = 0

  const features = {
    width: tag => {
      const computed = getComputedStyle(tag)
      tag.style.width = 'inherit'
      const width = parseInt(computed.getPropertyValue('border-left-width'), 10)
                   + parseInt(computed.getPropertyValue('padding-left'), 10)
                   + tag.scrollWidth
                   + parseInt(computed.getPropertyValue('padding-right'), 10)
                   + parseInt(computed.getPropertyValue('border-right-width'), 10)
      tag.style.width = ''
      return `width: ${width}px;`
    },
    height: tag => {
      const computed = getComputedStyle(tag)
      tag.style.height = 'inherit'
      const height = parseInt(computed.getPropertyValue('border-top-width'), 10)
                   + parseInt(computed.getPropertyValue('padding-top'), 10)
                   + tag.scrollHeight
                   + parseInt(computed.getPropertyValue('padding-bottom'), 10)
                   + parseInt(computed.getPropertyValue('border-bottom-width'), 10)
      tag.style.height = ''
      return `height: ${height}px;`
    },
    both: tag => {
      return features.width(tag) + features.height(tag)
    }
  }

  document.querySelectorAll(selector).forEach(tag => {

    const attr = selector.replace(/\W/g, '')
    const evaluated = features[option](tag)

    tag.setAttribute(`data-${attr}`, count)
    styles += `${selector}[data-${attr}="${count}"] { ${evaluated} }\n`
    count++

  })

  return styles

}