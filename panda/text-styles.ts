export const textStyles = {
  hero: {
    description: 'Primary hero display copy.',
    value: {
      fontFamily: 'display',
      fontSize: { base: '4xl', md: '6xl' },
      fontWeight: 'bold',
      lineHeight: 'tight',
      letterSpacing: '-0.02em'
    }
  },
  h1: {
    value: {
      fontFamily: 'display',
      fontSize: { base: '3xl', md: '5xl' },
      fontWeight: 'bold',
      lineHeight: 'snug'
    }
  },
  h2: {
    value: {
      fontFamily: 'display',
      fontSize: { base: '2xl', md: '4xl' },
      fontWeight: 'bold',
      lineHeight: 'snug'
    }
  },
  h3: {
    value: {
      fontFamily: 'display',
      fontSize: { base: 'xl', md: '2xl' },
      fontWeight: 'semibold',
      lineHeight: 'normal'
    }
  },
  'body-lg': {
    value: {
      fontFamily: 'body',
      fontSize: 'lg',
      fontWeight: 'regular',
      lineHeight: 'relaxed'
    }
  },
  body: {
    value: {
      fontFamily: 'body',
      fontSize: 'md',
      fontWeight: 'regular',
      lineHeight: 'relaxed'
    }
  },
  caption: {
    value: {
      fontFamily: 'body',
      fontSize: 'sm',
      fontWeight: 'medium',
      lineHeight: 'normal'
    }
  },
  button: {
    value: {
      fontFamily: 'body',
      fontSize: 'md',
      fontWeight: 'semibold',
      lineHeight: 'normal'
    }
  }
} as const;
