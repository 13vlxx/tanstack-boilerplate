const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" })

export const formatDate = (isoDate: string): string =>
  dateFormatter.format(new Date(isoDate))
