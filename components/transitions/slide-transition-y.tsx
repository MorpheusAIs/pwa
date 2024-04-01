import type { HTMLMotionProps } from 'framer-motion'
import { motion } from 'framer-motion'

const transition = { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }
const pageVariants = {
  initial: { opacity: 0, y: 20, transition },
  animate: { opacity: 1, y: 0, transition },
  exit: {
    opacity: 0,
    y: -20,
    transition,
  },
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.05,
}

export const SlideTransitionY = ({
  children,
  ...rest
}: HTMLMotionProps<'div'> & { loading?: boolean }) => {
  return (
    <motion.div
      initial='initial'
      animate='animate'
      exit='exit'
      variants={pageVariants}
      transition={pageTransition}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
