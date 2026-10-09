import { useSyncExternalStore } from 'react'

/**
 * Mode Tenang: animasi & 3D dimatikan.
 * Status awal ditentukan oleh skrip kecil di <head> (lihat index.html):
 * pilihan tersimpan, atau pengaturan "kurangi gerakan" di HP pengunjung.
 */
const KEY = 'hnc-calm'
const listeners = new Set<() => void>()

const read = () => typeof document !== 'undefined' && document.documentElement.classList.contains('calm')

export function setCalm(on: boolean) {
  document.documentElement.classList.toggle('calm', on)
  try {
    localStorage.setItem(KEY, on ? '1' : '0')
  } catch {
    /* abaikan */
  }
  listeners.forEach((l) => l())
}

export function useCalm() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb)
      return () => listeners.delete(cb)
    },
    read,
    () => false,
  )
}
