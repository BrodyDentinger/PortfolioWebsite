import {
  CheckboxCard as ChakraCheckboxCard,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react'
import { forwardRef } from 'react'

export const CheckboxCard = forwardRef(function CheckboxCard(props, ref) {
  const {
    inputProps,
    label,
    description,
    icon,
    iconColor = 'fg.subtle',
    addon,
    indicator = <ChakraCheckboxCard.Indicator />,
    indicatorPlacement = 'end',
    align = 'start',
    justify,
    vertical,
    ...rest
  } = props

  const hasContent = label || description || icon

  return (
    <ChakraCheckboxCard.Root {...rest}>
      <ChakraCheckboxCard.HiddenInput ref={ref} {...inputProps} />
      <ChakraCheckboxCard.Control
        alignItems={align}
        justifyContent={justify}
        flexDirection={vertical ? 'column' : 'row'}
      >
        {indicatorPlacement === 'start' && indicator}
        <Stack
          hidden={!hasContent}
          gap='1'
          flex='1'
          alignItems={align}
          justifyContent={justify}
        >
          {icon && (
            <Icon asChild fontSize='2xl' color={iconColor} mb='2'>
              {icon}
            </Icon>
          )}
          {label && (
            <ChakraCheckboxCard.Label>{label}</ChakraCheckboxCard.Label>
          )}
          {description && (
            <Text opacity='0.72' textStyle='sm'>
              {description}
            </Text>
          )}
          {indicatorPlacement === 'inside' && indicator}
        </Stack>
        {indicatorPlacement === 'end' && indicator}
      </ChakraCheckboxCard.Control>
      {addon && <ChakraCheckboxCard.Addon>{addon}</ChakraCheckboxCard.Addon>}
    </ChakraCheckboxCard.Root>
  )
})

export const CheckboxCardIndicator = ChakraCheckboxCard.Indicator