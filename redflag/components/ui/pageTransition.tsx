import { AnimatePresence, motion } from "framer-motion";

import type { TargetAndTransition, VariantLabels, Transition } from "framer-motion";

interface AnimationWrapperProps {
    keyValue?: string,
    initial?: boolean | TargetAndTransition | VariantLabels,
    animate?: TargetAndTransition | VariantLabels,
    transition?: Transition,
    className?: string,
    children: React.ReactNode; // Ensure children prop is included
}

const AnimationWrapper = ({children, keyValue, initial, animate, transition, className} : AnimationWrapperProps) => {
    return (
        <AnimatePresence>
            <motion.div
                key={keyValue}
                initial={initial || {opacity:0, y:50}}
                animate={animate || {opacity:1, y:0}}
                transition={transition || {duration:0.5, ease:"easeInOut"}}
                className={className || ""}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default AnimationWrapper;

// Example usage of AnimationWrapper
/*
<AnimationWrapper>
  <YourComponent />
</AnimationWrapper>
*/

// Note: The above is a placeholder for the actual animation wrapper component.
// You can customize the animation properties as per your requirements.