// 页面统计工具

// 页面进入时间
let pageEnterTime = null
// 页面名称
let currentPage = ''

// 百度统计 - 页面浏览
export const trackPageView = (pageName) => {
  try {
    if (window._hmt) {
      window._hmt.push(['_trackPageview', `/${pageName}`])
    }
  } catch (e) {
    console.error('统计错误:', e)
  }
}

// 百度统计 - 事件追踪
export const trackEvent = (category, action, label) => {
  try {
    if (window._hmt) {
      window._hmt.push(['_trackEvent', category, action, label])
    }
  } catch (e) {
    console.error('统计错误:', e)
  }
}

// 记录页面进入
export const onPageEnter = (pageName) => {
  currentPage = pageName
  pageEnterTime = Date.now()

  // 统计页面浏览
  trackPageView(pageName)

  // 自定义事件 - 页面进入
  trackEvent('页面', '进入', pageName)

  console.log(`[统计] 进入页面: ${pageName}`)
}

// 记录页面离开（计算停留时长）
export const onPageLeave = () => {
  if (!pageEnterTime || !currentPage) return

  const duration = Date.now() - pageEnterTime
  const durationSeconds = Math.floor(duration / 1000)

  // 自定义事件 - 页面停留时长
  trackEvent('页面停留', currentPage, durationSeconds.toString())

  console.log(`[统计] 离开页面: ${currentPage}, 停留: ${durationSeconds}秒`)

  // 重置
  pageEnterTime = null
  currentPage = ''
}

// 追踪关键事件
export const trackQuizStart = () => {
  trackEvent('测评', '开始', '点击开始测评')
  console.log('[统计] 测评开始')
}

export const trackQuizComplete = (talentType) => {
  trackEvent('测评', '完成', talentType)
  console.log('[统计] 测评完成:', talentType)
}

export const trackCourseSubmit = (formData) => {
  trackEvent('转化', '提交表单', '体验课报名')
  console.log('[统计] 表单提交:', formData)
}

export const trackCourseClick = () => {
  trackEvent('转化', '点击领课', '查看体验课')
  console.log('[统计] 点击领课')
}
