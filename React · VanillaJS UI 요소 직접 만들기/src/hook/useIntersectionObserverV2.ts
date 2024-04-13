import { RefObject, useEffect, useRef, useState } from 'react'

type Elem = Element | null
/* 
[1, 2, 3, 4, 5, 6]
처음에는 1, 2, 3만 보임 => [1: true, 2: true, 3: true, 4: false, 5: false, 6: false ] // 1, 2, 3이 화면상에 있구나.
스크롤을 내려서 2, 3, 4만 보이게 됨 => [1: false, 4: true]                            // 2, 3, 4가 화면상에 있구나.
다시 스크롤을 내려서 3, 4, 5만 보이게 됨 => [2: false, 5: true]
스크롤을 오려서 2, 3, 4만 보이게 됨 => [2: true, 5: false]
애매하게 올려서 1, 2, 3, 4가 다 보여 => [1:true]
 */
const DefaultOption: IntersectionObserverInit = { threshold: 0 }

const useIntersectionObserver = (
  elemRef: RefObject<Elem | Elem[]>,
  options: IntersectionObserverInit = DefaultOption,
) => {
  const observerRef = useRef<IntersectionObserver>()
  const [entries, setEntries] = useState<IntersectionObserverEntry[]>([])

  useEffect(() => {
    const node = elemRef.current
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      setEntries(prev => {
        // entries: 새로 변경된 내용
        // prev: 기존 entries
        // 위 둘을 조합해서 newEntries를 만들어야 함. (isIntersecting: true인 애들로만)
        // 중복 제거 / 최신정보 업데이트 => Map을 사용해보겠다.
        return Array.from(new Map(prev.concat(entries).map(e => [e.target, e])).values()).filter(
          e => e.isIntersecting,
        )
      })
    }
    if (!node) return

    const observer = new IntersectionObserver(handleIntersect, options)
    observerRef.current = observer
    if (Array.isArray(node)) node.forEach(n => n && observer.observe(n))
    else observer.observe(node)

    return () => {
      observer?.disconnect()
    }
  }, [elemRef, options])

  return {
    entries,
    observerRef,
  }
}

export default useIntersectionObserver
