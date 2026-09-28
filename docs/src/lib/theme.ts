import { useCallback, useEffect, useState } from 'react'

export type Theme = 'light' | 'dark'
const KEY = 'grep-docs-theme'

function read(): Theme {
  const current = document.documentElement.dataset.theme
  return current === 'dark' ? 'dark' : 'light'
}

export function useTheme(): [Theme, (t: Theme) => void, () => void] {
  const [theme, setThemeState] = useState<Theme>(() => read())

  const setTheme = useCallback((t: Theme) => {
    document.documentElement.dataset.theme = t
    try {
      localStorage.setItem(KEY, t)
    } catch {
      /* storage unavailable */
    }
    setThemeState(t)
  }, [])

  const toggle = useCallback(() => setTheme(read() === 'dark' ? 'light' : 'dark'), [setTheme])

  // follow OS changes while the user hasn't picked explicitly
  useEffect(() => {
    const mq = matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => {
      try {
        if (localStorage.getItem(KEY)) return
      } catch {
        /* ignore */
      }
      const t: Theme = mq.matches ? 'dark' : 'light'
      document.documentElement.dataset.theme = t
      setThemeState(t)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return [theme, setTheme, toggle]
}
