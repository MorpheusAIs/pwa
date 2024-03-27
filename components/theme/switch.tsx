export const SwitchStyle = {
  parts: ['container', 'track'],
  // Styles for the base style
  baseStyle: () => ({
    track: {
      background: 'transparent',
      borderWidth: 2,
      borderColor: 'border.base',
      _checked: {
        background: 'background.surface.raised.base',
      },
    },
  }),
  // Styles for the size variations
  sizes: {},
  // Styles for the visual style variations
  variants: {},
  // The default `size` or `variant` values
  defaultProps: {},
}
