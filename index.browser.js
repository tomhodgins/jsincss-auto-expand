function expand(selector, option) {
  const attr = (selector + option).replace(/\W/g, '')
  const features = {
    width: tag => {
      const computed = getComputedStyle(tag)
      tag.style.width = 'inherit'
      const width = parseInt(computed['border-left-width'])
      + parseInt(computed['padding-left'])
      + tag.scrollWidth
      + parseInt(computed['padding-right'])
      + parseInt(computed['border-right-width'])
      tag.style.width = ''
      return `width: ${width}px;`
    },
    height: tag => {
      const computed = getComputedStyle(tag)
      tag.style.height = 'inherit'
      const height = parseInt(computed['border-top-width'])
      + parseInt(computed['padding-top'])
      + tag.scrollHeight
      + parseInt(computed['padding-bottom'])
      + parseInt(computed['border-bottom-width'])
      tag.style.height = ''
      return `height: ${height}px;`
    },
    both: tag => features.width(tag) + features.height(tag)
  }
  const result = Array.from(document.querySelectorAll(selector))
    .reduce((output, tag, count) => {
      const evaluated = features[option](tag)
      output.add.push({tag: tag, count: count})
      output.styles.push(`${selector}[data-expand-${attr}="${count}"] { ${evaluated} }`)
      return output
    }, {add: [], remove: [], styles: []})
  result.add.forEach(tag => tag.tag.setAttribute(`data-expand-${attr}`, tag.count))
  result.remove.forEach(tag => tag.setAttribute(`data-expand-${attr}`, ''))
  return result.styles.join('\n')
}
