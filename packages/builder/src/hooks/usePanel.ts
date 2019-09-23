import { useState } from 'react'

type PANEL_VISIBLE_MAP = {
  [k in string]: boolean
}

// 所有面板的初始状态
const INITIAL_PANEL_VISIBLE_MAP: PANEL_VISIBLE_MAP = {
  fieldPanel: false,
  codePanel: false
}

const usePanel = () => {
  const [panelVisibleMap, setPanelVisibleMap] = useState(
    INITIAL_PANEL_VISIBLE_MAP
  )
  const setPanelVisible = (type: string): void => {
    // 将当前操作的面板状态置反，其他面板状态设置为false
    setPanelVisibleMap(visibleMap =>
      Object.entries(visibleMap).reduce((prev, [key, value]) => {
        prev[key] = key === type ? !value : false
        return prev
      }, {})
    )
  }

  return [panelVisibleMap, setPanelVisible]
}

export default usePanel
