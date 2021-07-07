const { readdirSync } = require('fs')
const path = require('path')

function getSidebar(dirname) {
  let files = readdirSync(path.resolve(`${__dirname}/../${dirname}`))
  let sidebar = files.map(filename => {
    filename = filename.replace(/\.md/, '')
    // 分别表示文件名和侧边栏文字
    // 只设置文件名则侧边栏默认显示该文件的首级标题
    return [filename, filename]
  })
  return sidebar
}

module.exports = {
  getSidebar
}
