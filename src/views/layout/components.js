//自动化工程
const components = []
const files = require.context('../../views/', true, /\.js$/)  // 目录   是否读取子集目录   
files.keys().map(key => {
    if (key.includes('./layout/') || key.includes('./login/') || key.includes('./register/')) { //设置不需要的名单
        return false
    }
    const path = key.split('.')[1].toLowerCase()
    const componentObj = {}
    const fullPath = `/index${path}` //跳转路径
    const component = files(key).default
    componentObj.path = fullPath
    componentObj.component = component
    return components.push(componentObj)
})
export default components