import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hook: fade-up reveal on scroll using GSAP ScrollTrigger.
 * Attach the returned ref to any container element.
 */
export function useScrollReveal(stagger = 0.05) {
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll('[data-reveal]')
    if (!targets.length) return

    gsap.fromTo(
      targets,
      { opacity: 0, y: 32 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [stagger])

  return ref
}

/**
 * Hook: count-up animation for KPI stat numbers.
 * Uses GSAP to animate a counter element from 0 to a target value.
 */
export function useCountUp(target: number, prefix = '', suffix = '') {
  const ref = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const obj = { value: 0 }

    const tween = gsap.to(obj, {
      value: target,
      duration: 1.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
      onUpdate() {
        el.textContent = `${prefix}${Math.round(obj.value).toLocaleString()}${suffix}`
      },
    })

    return () => {
      tween.kill()
    }
  }, [target, prefix, suffix])

  return ref
}
