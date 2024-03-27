import { Text, type TextProps } from '@chakra-ui/react'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { useMemo } from 'react'

dayjs.extend(relativeTime)

type RelativeDateProps = {
  date: Date
  prefix?: string
  postfix?: string
} & TextProps

export const RelativeDate: React.FC<RelativeDateProps> = ({ date, prefix, postfix, ...rest }) => {
  const renderFormattedDate = useMemo(() => {
    const formattedDate = dayjs().to(dayjs(date))
    if (prefix) {
      return `${prefix} ${formattedDate}`
    }
    if (postfix) {
      return `${formattedDate} ${postfix}`
    }
    if (postfix && prefix) {
      return `${prefix} ${formattedDate} ${postfix}`
    }
    return formattedDate
  }, [date, postfix, prefix])
  return <Text {...rest}>{renderFormattedDate}</Text>
}
