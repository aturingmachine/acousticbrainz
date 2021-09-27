export function toQueryString(values: string[], key?: string): string {
  const v = values.reduce(
    (prev, curr, index, arr) => {
      const next = prev.concat(`${curr}`)

      if (index === arr.length - 1) {
        return next
      } else {
        return next.concat(';')
      }
    },
    key ? `${key}=` : ''
  )

  console.log(v)

  return v
}
