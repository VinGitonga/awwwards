import gsap from "gsap";
import { useEffect, useRef } from "react";

interface IProps {
  title: string;
  containerClass?: string;
  sectionId?: string
}

const AnimatedTitle = ({ title, containerClass, sectionId }: IProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const titleAnimation = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "100 bottom",
          end: "center bottom",
          toggleActions: "play none none reverse",
        },
      });

      titleAnimation.to(".animated-word", {
        opacity: 1,
        transform: "translate3d(0,0,0) rotateY(0deg) rotateX(0deg)",
        ease: "power2.inOut",
        stagger: 0.02,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);
  return (
    <div id={sectionId} className={`animated-title ${containerClass}`} ref={containerRef}>
      {title.split("<br />").map((line, idx) => (
        <div
          key={idx}
          className="flex-center max-w-full flex-wrap gap-2 px-10 md:gap-2"
        >
          {line.split(" ").map((word, i) => (
            <span
              className="animated-word"
              dangerouslySetInnerHTML={{ __html: word }}
              key={i}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default AnimatedTitle;
