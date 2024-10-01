import { Field as ChakraField } from '@chakra-ui/react'
import { forwardRef } from 'react'

export const Field = forwardRef(function Field(props, ref) {
  const { label, children, helperText, errorText, asterisk, ...rest } = props
  return (
    <ChakraField.Root ref={ref} {...rest}>
      {label && (
        <ChakraField.Label>
          {label} {asterisk && <ChakraField.RequiredIndicator />}
        </ChakraField.Label>
      )}
      {children}
      {helperText && (
        <ChakraField.HelperText>{helperText}</ChakraField.HelperText>
      )}
      {errorText && <ChakraField.ErrorText>{errorText}</ChakraField.ErrorText>}
    </ChakraField.Root>
  )
})