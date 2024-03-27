import { Text, type TextProps } from '@chakra-ui/react'
import { useMemo } from 'react'

type AmountProps = {
  value: number
  prefix?: string
  postfix?: string
} & TextProps

export const Amount: React.FC<AmountProps> = ({ value, prefix, postfix, ...rest }) => {
  const formattedValue = useMemo(() => {
    const formattedNumber = value.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 1,
      compactDisplay: 'short',
      notation: 'compact',
    })
    if (postfix) {
      return `${formattedNumber} ${postfix}`
    }
    if (prefix) {
      return `${prefix} ${formattedNumber}`
    }
    if (prefix && postfix) {
      return `${prefix} ${formattedNumber} ${postfix}`
    }
    return formattedNumber
  }, [postfix, prefix, value])
  return <Text {...rest}>{formattedValue}</Text>
}
