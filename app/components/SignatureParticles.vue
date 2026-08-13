<script setup lang="ts">
// Distances and forces are expressed in grid cells so the mark behaves the
// same at every canvas size.
const REPEL_CELLS = 14
const GLOW_CELLS = 20
const PUSH_CELLS = 0.4
const SPRING = 0.007
const DAMPING = 0.94
const REST = 0.05

const canvas = ref<HTMLCanvasElement | null>(null)
const colorMode = useColorMode()

const pointer = { x: -1e5, y: -1e5 }

let frame = 0
let draw: (() => void) | null = null

function wake() {
  if (!frame && draw) {
    frame = requestAnimationFrame(draw)
  }
}

function onPointerMove(event: PointerEvent) {
  // Mouse only: on touch the pointer travels with the scroll, which would
  // drag the mark around while the visitor is just scrolling past it.
  if (event.pointerType !== 'mouse') {
    return
  }

  const rect = canvas.value?.getBoundingClientRect()

  if (!rect) {
    return
  }

  pointer.x = event.clientX - rect.left
  pointer.y = event.clientY - rect.top
  wake()
}

function onPointerLeave() {
  pointer.x = -1e5
  pointer.y = -1e5
  wake()
}

onMounted(() => {
  const element = canvas.value

  if (!element) {
    return
  }

  const context = element.getContext('2d')

  if (!context) {
    return
  }

  const { points, span } = signatureMark()
  const count = points.length

  const home = new Float32Array(count * 2)
  const position = new Float32Array(count * 2)
  const velocity = new Float32Array(count * 2)
  const seed = new Float32Array(count * 2)

  for (let i = 0; i < count; i++) {
    seed[i * 2] = 0.18 + Math.random() * 0.34
    seed[i * 2 + 1] = 0.5 + Math.random() * 0.35
  }

  let width = 0
  let height = 0
  let cell = 1

  const still = matchMedia('(prefers-reduced-motion: reduce)')

  function layout() {
    const rect = element!.getBoundingClientRect()

    if (!rect.width || !rect.height) {
      return
    }

    const ratio = Math.min(window.devicePixelRatio || 1, 2)

    width = rect.width
    height = rect.height
    element!.width = Math.round(width * ratio)
    element!.height = Math.round(height * ratio)
    context!.setTransform(ratio, 0, 0, ratio, 0, 0)

    // Leave room around the mark so dots pushed out by the cursor are not
    // clipped by the canvas edge.
    const size = Math.min(width, height) * 0.82
    const offsetX = (width - size) / 2
    const offsetY = (height - size) / 2

    cell = size / span

    for (let i = 0; i < count; i++) {
      const point = points[i]!
      const x = offsetX + point[0] * size
      const y = offsetY + point[1] * size

      home[i * 2] = x
      home[i * 2 + 1] = y
      position[i * 2] = x
      position[i * 2 + 1] = y
      velocity[i * 2] = 0
      velocity[i * 2 + 1] = 0
    }
  }

  draw = () => {
    const dark = colorMode.value === 'dark'
    const repel = cell * REPEL_CELLS
    const glow = cell * GLOW_CELLS
    const push = cell * PUSH_CELLS
    const lively = !still.matches

    context!.clearRect(0, 0, width, height)

    let settled = true

    for (let i = 0; i < count; i++) {
      const ix = i * 2
      const iy = ix + 1

      const homeX = home[ix]!
      const homeY = home[iy]!

      let x = position[ix]!
      let y = position[iy]!
      let vx = velocity[ix]!
      let vy = velocity[iy]!

      if (lively) {
        const toPointerX = pointer.x - x
        const toPointerY = pointer.y - y
        const distance = Math.hypot(toPointerX, toPointerY)

        if (distance > 0 && distance < repel) {
          const strength = ((repel - distance) / repel) * push

          vx -= (toPointerX / distance) * strength
          vy -= (toPointerY / distance) * strength
        }

        vx = (vx + (homeX - x) * SPRING) * DAMPING
        vy = (vy + (homeY - y) * SPRING) * DAMPING
        x += vx
        y += vy

        position[ix] = x
        position[iy] = y
        velocity[ix] = vx
        velocity[iy] = vy
      }

      const drift = Math.hypot(x - homeX, y - homeY)

      if (drift > REST || Math.abs(vx) > REST || Math.abs(vy) > REST) {
        settled = false
      }

      // Displaced dots brighten and grow slightly, which is what reads as the
      // hole opening up under the cursor.
      const lift = Math.min(drift / (cell * 4), 1)
      const near = Math.max(0, 1 - Math.hypot(x - pointer.x, y - pointer.y) / glow)
      const alpha = Math.min(seed[iy]! + lift * 0.3, 1) * (0.55 + 0.45 * near)

      if (alpha < 0.02) {
        continue
      }

      const tone = dark
        ? 168 + Math.round(87 * lift)
        : 82 - Math.round(72 * lift)

      const dot = seed[ix]! * cell * (1 + lift * 0.4)

      context!.fillStyle = `rgba(${tone},${tone},${tone},${alpha})`
      context!.fillRect(x - dot, y - dot, dot * 2, dot * 2)
    }

    // Idle canvases cost nothing: the loop stops once every dot is home and
    // restarts on pointer, resize or theme changes.
    frame = settled ? 0 : requestAnimationFrame(draw!)
  }

  const observer = new ResizeObserver(() => {
    layout()
    wake()
  })

  observer.observe(element)
  layout()
  wake()

  watch(() => colorMode.value, wake)

  onBeforeUnmount(() => {
    observer.disconnect()
    cancelAnimationFrame(frame)
    frame = 0
    draw = null
  })
})
</script>

<template>
  <canvas
    ref="canvas"
    aria-hidden="true"
    class="block"
    @pointermove="onPointerMove"
    @pointerleave="onPointerLeave"
  />
</template>
