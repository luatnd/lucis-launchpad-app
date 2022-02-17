import { useState } from "react";
import { motion, MotionConfig, useMotionValue } from "framer-motion";
import { Shapes } from "./Shapes";
import { transition } from "./settings";
import useMeasure from "react-use-measure";
import styles from "./button.module.css";

export default function Button3D({
  title,
  normal = false,
}: {
  title: string;
  normal?: boolean;
}) {
  const [ref, bounds] = useMeasure({ scroll: false });
  const [isHover, setIsHover] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const resetMousePosition = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <MotionConfig transition={transition}>
      <motion.button
        className={!!normal ? styles.button_3d_normal : styles.button_3d}
        // className="button_3d"
        ref={ref}
        initial={false}
        animate={isHover ? "hover" : "rest"}
        whileTap="press"
        variants={{
          rest: { scale: 1 },
          hover: { scale: 1.1 },
          press: { scale: 1.1 },
        }}
        onHoverStart={() => {
          resetMousePosition();
          setIsHover(true);
        }}
        onHoverEnd={() => {
          resetMousePosition();
          setIsHover(false);
        }}
        onTapStart={() => setIsPress(true)}
        onTap={() => setIsPress(false)}
        onTapCancel={() => setIsPress(false)}
        onPointerMove={(e) => {
          mouseX.set(e.clientX - bounds.x - bounds.width / 2);
          mouseY.set(e.clientY - bounds.y - bounds.height / 2);
        }}
      >
        <motion.div
          // className="shapes"
          className={styles.shapes}
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
        >
          
          <div
            // className="lucis-container"
            className={styles.container}
          >
            <Shapes
              isHover={isHover}
              isPress={isPress}
              mouseX={mouseX}
              mouseY={mouseY}
            />
          </div>
        </motion.div>
        <motion.div
          variants={{ hover: { scale: 1 }, press: { scale: 1.1 } }}
          // className="label"
          className={styles.label}
        >
          {title}
        </motion.div>
      </motion.button>
    </MotionConfig>
  );
}
