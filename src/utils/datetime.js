export function parseDate(dateTimeStr) {
  const str = dateTimeStr.replace(" +0000 UTC", "")
  return Date.parse(str)
}

export function compareDateStrings(a, b) {
  const aDate = parseDate(a)
  const bDate = parseDate(b)
  return aDate - bDate
}

const dayFormatter = new Intl.DateTimeFormat("en", { day: "2-digit" })
const monthFormatter = new Intl.DateTimeFormat("en", { month: "long" })
const yearFormatter = new Intl.DateTimeFormat("en", { year: "numeric" })

export function fmtMonth(d) {
  return monthFormatter.format(d)
}

export function fmtDay(d) {
  return dayFormatter.format(d)
}

export function fmtYear(d) {
  return yearFormatter.format(d)
}
