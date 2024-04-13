import { useEffect, useRef } from 'react'

const VanillaWrapper = ({
  title = '',
  subTitle = '',
  initiator,
}: {
  title?: string
  subTitle?: string
  initiator: (wrapper: HTMLDivElement) => void
}) => {
  const wrapper = useRef<HTMLDivElement>(null)
  const isInit = useRef(false)

  useEffect(() => {
    if (!isInit.current && !!wrapper.current) {
      initiator(wrapper.current)
      isInit.current = true
    }
  }, [initiator])

  return (
    <>
      {title && (
        <h3>
          {title}. Vanilla {subTitle && <sub>{subTitle}</sub>}
        </h3>
      )}
      <div ref={wrapper} />
    </>
  )
}

export default VanillaWrapper
