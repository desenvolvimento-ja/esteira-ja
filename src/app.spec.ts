import { describe, it, expect } from 'vitest';
import { hhmmToMin, percentFromTime, applyRecurrence, dateFromYMD, getRefNow } from './App'

describe('utils', () => {
  it('hhmmToMin works', () => {
    expect(hhmmToMin('00:00')).toBe(0)
    expect(hhmmToMin('08:30')).toBe(510)
  })
  it('percentFromTime is monotonic', () => {
    const tl = { startMin: 480, endMin: 600, totalMin: 120 }
    expect(percentFromTime('08:30', tl)).toBeLessThan(percentFromTime('09:00', tl))
  })
  it('applyRecurrence daily/weekly/once', () => {
    const ymd = '2030-01-06'
    const weekday = dateFromYMD(ymd).getDay()
    const all = [
      { id:'a', titulo:'A', inicio:'08:00', fim:'09:00', concluida:false, rec:{ kind:'daily' as const } },
      { id:'b', titulo:'B', inicio:'10:00', fim:'11:00', concluida:false, rec:{ kind:'weekly' as const, weekday } },
      { id:'c', titulo:'C', inicio:'12:00', fim:'13:00', concluida:false, rec:{ kind:'once' as const, date: ymd } },
    ]
    expect(applyRecurrence(all, ymd).length).toBe(3)
    expect(applyRecurrence(all, '2030-01-07').length).toBe(2)
  })
  it('getRefNow future is start of day', () => {
    const future = new Date(Date.now() + 5*24*3600*1000).toISOString().slice(0,10)
    const d = getRefNow(future, new Date())
    expect(d.getHours()).toBe(0)
  })
})
