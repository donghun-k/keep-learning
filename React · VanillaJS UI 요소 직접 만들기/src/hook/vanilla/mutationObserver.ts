import { RefObject } from 'react'
const defaultOption: MutationObserverInit = {
  attributes: false,
  childList: true,
  characterData: false,
  subtree: true,
}

const mutationObserver = ({
  rootElem = document,
  selector = '',
  callback = () => {},
  observerOption = {},
  disconnectOnObserved = false,
}: {
  rootElem?: HTMLElement | Document
  selector: string | RefObject<HTMLElement>
  callback: (elem: Element | null) => any
  observerOption?: MutationObserverInit
  disconnectOnObserved?: boolean
}) => {
  const observer = new MutationObserver(() => {
    const target =
      typeof selector === 'string' ? document.querySelector(selector) : selector.current

    if (target && document.contains(target)) {
      callback(target)
      if (disconnectOnObserved) observer.disconnect()
    }
  })
  observer.observe(rootElem, { ...defaultOption, ...observerOption })
  return observer
}

export default mutationObserver
