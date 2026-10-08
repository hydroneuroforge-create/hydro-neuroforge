import { Composition } from 'remotion'
import { FPS, VARIANTS } from './timeline.js'
import { Main, type MainProps, type VariantId } from './Main'

const ids = Object.keys(VARIANTS) as VariantId[]

export const Root = () => (
  <>
    {ids.map((id) => {
      const v = VARIANTS[id]
      return (
        <Composition
          key={id}
          id={id}
          component={Main}
          durationInFrames={v.duration}
          fps={FPS}
          width={v.width}
          height={v.height}
          defaultProps={{ variant: id, audio: 'mix' } satisfies MainProps}
        />
      )
    })}
  </>
)
