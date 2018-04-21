mixin('expand', ['selector', 'option'],
  prelude('  const features = {\n\
    width: tag => {\n\
      const computed = getComputedStyle(tag)\n\
      tag.style.width = \'inherit\'\n\
      const width = parseInt(computed.getPropertyValue(\'border-left-width\'), 10)\n\
        + parseInt(computed.getPropertyValue(\'padding-left\'), 10)\n\
        + tag.scrollWidth\n\
        + parseInt(computed.getPropertyValue(\'padding-right\'), 10)\n\
        + parseInt(computed.getPropertyValue(\'border-right-width\'), 10)\n\
      tag.style.width = \'\'\n\
      return `width: ${width}px;`\n\
    },\n\
    height: tag => {\n\
      const computed = getComputedStyle(tag)\n\
      tag.style.height = \'inherit\'\n\
      const height = parseInt(computed.getPropertyValue(\'border-top-width\'), 10)\n\
        + parseInt(computed.getPropertyValue(\'padding-top\'), 10)\n\
        + tag.scrollHeight\n\
        + parseInt(computed.getPropertyValue(\'padding-bottom\'), 10)\n\
        + parseInt(computed.getPropertyValue(\'border-bottom-width\'), 10)\n\
      tag.style.height = \'\'\n\
      return `height: ${height}px;`\n\
    },\n\
    both: tag => {\n\
      return features.width(tag) + features.height(tag)\n\
    }\n\
  }\n\n',
  returnValue('Array.from(document.querySelectorAll(selector))',
    reduceFunc(
      prelude('      const evaluated = features[option](tag)\n\n',
        createAttribute(['selector'],
          addAttribute('tag', 'expand',
            addRule('${selector}', '', 'expand', '${evaluated}'))))))))
