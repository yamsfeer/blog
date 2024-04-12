import { sidebar } from 'vuepress-theme-hope'
import path from 'path'
import { readdirSync } from 'fs'

function dir(dirname) {
  return readdirSync(path.resolve(`${__dirname}/../${dirname}`))
    .filter((filename) => filename.includes('.md'))
    .map((filename) => {
      return {
        text: filename.split('.md')[0],
        link: filename,
      }
    })
}

function sort(files) {
  return files.sort((A, B) => {
    const { text: nameA } = A,
      { text: nameB } = B
    const reg = /[\d+.]+/
    if (nameA.match(reg) && nameB.match(reg)) {
      const indexA = nameA.match(reg)[0].split('.') // '12.1.3'
      const indexB = nameB.match(reg)[0].split('.')

      let i = 0
      let length = Math.max(indexA.length, indexB.length)
      while (i < length) {
        let A = indexA[i] || 0 // 超出的部分用 0 补充
        let B = indexB[i] || 0
        if (A === B) {
          i++
          continue
        }
        return A - B
      }
    }
  })
}

export default sidebar({
  '/YDKJS/': [
    {
      text: '你不知道的JS(上)',
      prefix: '/YDKJS/YDKJS(上卷)/',
      children: dir('YDKJS/YDKJS(上卷)'),
    },
    {
      text: '你不知道的JS(中)',
      prefix: '/YDKJS/YDKJS(中卷)/',
      children: dir('YDKJS/YDKJS(中卷)'),
    },
    {
      text: '你不知道的JS(下)',
      prefix: '/YDKJS/YDKJS(下卷)/',
      children: dir('YDKJS/YDKJS(下卷)'),
    },
  ],
  '/css': [{ text: 'css', children: sort(dir('css')) }],
  '/css世界': [{ text: 'css 世界', children: dir('css世界') }],
  '/ECMAScript/': [{ text: 'ECMAScript', children: sort(dir('ECMAScript')) }],
  '/API/': [{ text: 'API', children: dir('API') }],
  '/框架/': [{ text: '框架', children: dir('框架') }],

  '/浏览器/chrome': [{ text: 'chrome', children: sort(dir('浏览器/chrome')) }],
  '/浏览器/编写JS引擎': [
    { text: '编写JS引擎', children: sort(dir('浏览器/编写JS引擎')) },
  ],
  '/vue3': [{ text: 'vue3', children: sort(dir('vue3')) }],

  /* 工程架构 */
  '/工程架构/devops': [
    { text: 'devops', children: sort(dir('工程架构/devops')) },
  ],
  '/工程架构/node': [{ text: 'node', children: sort(dir('工程架构/node')) }],
  '/工程架构/webpack': [
    { text: 'webpack', children: sort(dir('工程架构/webpack')) },
  ],
  '/工程架构/前端监控': [
    { text: '前端监控', children: dir('工程架构/前端监控') },
  ],
  '/工程架构/图片': [{ text: '图片', children: dir('工程架构/图片') }],
  '/工程架构/微前端': [{ text: '微前端', children: dir('工程架构/微前端') }],
  '/工程架构/性能优化': [
    { text: '性能优化', children: sort(dir('工程架构/性能优化')) },
  ],
  '/工程架构/架构': [{ text: '架构', children: sort(dir('工程架构/架构')) }],

  '/解决方案/': [
    { text: '多人协作', children: dir('解决方案/多人协作') },
    { text: '自动化方案', children: dir('解决方案/自动化方案') },
  ],
  '/clutter/': [{ text: 'clutter', children: dir('clutter') }],
})
