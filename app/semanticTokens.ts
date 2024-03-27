export const semanticTokens = {
  colors: {
    background: {
      surface: {
        base: {
          default: 'white',
          _dark: 'var(--primary-bg)',
        },
        hover: {
          default: 'gray.100',
          _dark: 'whiteAlpha.200',
        },
        pressed: {
          default: 'gray.200',
          _dark: 'whiteAlpha.100',
        },
        raised: {
          base: {
            default: 'white',
            _dark: 'var(--primary-accent)',
          },
          hover: {
            default: 'gray.200',
            _dark: 'darkNeutral.800',
          },
          pressed: {
            default: 'gray.300',
            _dark: 'darkNeutral.700',
          },
          accent: {
            default: 'white',
            _dark: 'darkNeutralAlpha.800',
          },
        },
        overlay: {
          base: {
            default: 'white',
            _dark: 'darkNeutral.750',
          },
        },
      },
      button: {
        brand: {
          base: {
            default: '#012C33',
            _dark: 'var(--primary-accent)',
          },
          hover: {
            default: '#011E23',
            _dark: 'var(--primary-accent-hover)',
          },
          pressed: {
            default: '#001114',
            _dark: 'var(--primary-accent-pressed)',
          },
        },
        secondary: {
          base: {
            default: 'gray.100',
            _dark: 'whiteAlpha.100',
          },
          hover: {
            default: 'gray.200',
            _dark: 'whiteAlpha.200',
          },
          pressed: {
            default: 'gray.300',
            _dark: 'darkNeutralAlpha.500',
          },
        },
      },
      input: {
        base: {
          default: 'gray.50',
          _dark: 'darkNeutral.900',
        },
        hover: {
          default: 'gray.100',
          _dark: 'darkNeutral.800',
        },
        pressed: {
          default: 'gray.200',
          _dark: 'darkNeutral.900',
        },
      },
      success: {
        default: 'green.50',
        _dark: 'rgba(92, 223, 189, 0.20)',
      },
      error: {
        default: 'red.50',
        _dark: 'rgba(254, 178, 178, 0.2)',
      },
    },

    border: {
      base: {
        default: 'gray.100',
        _dark: 'var(--primary-accent)',
      },
      subtle: {
        default: 'gray.100',
        _dark: 'whiteAlpha.100',
      },
      bold: {
        default: 'gray.300',
        _dark: 'darkNeutralAlpha.600',
      },
      hover: {
        default: 'gray.200',
        _dark: 'var(--primary-accent-hover)',
      },
      pressed: {
        default: 'gray.300',
        _dark: 'var(--primary-accent-pressed)',
      },
      focused: {
        default: 'blue.500',
        _dark: 'blue.200',
      },
      error: {
        default: 'red.500',
        _dark: 'red.300',
      },
      info: {
        default: 'blue.500',
        _dark: 'blue.200',
      },
      warning: {
        default: 'orange.500',
        _dark: 'orange.200',
      },
      success: {
        default: 'green.500',
        _dark: 'green.200',
      },
      input: {
        default: 'gray.100',
        _dark: 'darkNeutralAlpha.500',
      },
    },
    text: {
      base: {
        default: 'black',
        _dark: 'white',
      },
      link: {
        default: 'var(--primary-accent)',
        _dark: 'var(--primary-accent)',
      },
      subtle: {
        default: 'gray.500',
        _dark: 'whiteAlpha.700',
      },
      subtlest: {
        default: 'gray.400',
        _dark: 'whiteAlpha.300',
      },
      info: {
        default: 'blue.500',
        _dark: 'blue.200',
      },
      success: {
        default: 'green.500',
        _dark: 'green.200',
      },
      error: {
        default: 'red.500',
        _dark: 'red.300',
      },
      warning: {
        default: 'orange.500',
        _dark: 'orange.200',
      },
      inverse: {
        default: '#012C33',
        _dark: '#012C33',
      },
    },
    blanket: {
      default: '#10121499',
      _dark: 'darkNeutralAlpha.950',
    },
  },
}
