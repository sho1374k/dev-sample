import gsap from "gsap";
import Lenis from "@studio-freight/lenis";

import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// class VerticalScroll {
//   constructor(_sectionElement, _containerElement) {
//     this.sectionElement = _sectionElement;
//     this.containerElement = _containerElement;
//     this.itemElements = [...this.containerElement.querySelectorAll(".jsVerticalScrollItem")];
//     this.timeline = null;
//   }

//   refresh() {
//     this.timeline.scrollTrigger.refresh();
//   }

//   kill() {
//     this.timeline.kill();
//   }

//   init(_debug = true) {
//     this.timeline = gsap.timeline({
//       scrollTrigger: {
//         trigger: this.sectionElement,
//         start: "top top",
//         end: `${this.containerElement.clientWidth - this.sectionElement.clientWidth}`,
//         scrub: true,
//         pin: true,
//         invalidateOnRefresh: true,
//         anticipatePin: 1,
//         markers: _debug,
//         onEnter: () => {
//           if (_debug) console.log("enter");
//         },
//         onEnterBack: () => {
//           if (_debug) console.log("enter back");
//         },
//         onLeave: () => {
//           if (_debug) console.log("leave");
//         },
//         onLeaveBack: () => {
//           if (_debug) console.log("leave back");
//         },
//         onUpdate: (self) => {
//           const progress = self.progress;
//           // // prettier-ignore
//           const x = gsap.utils.interpolate(
//             [0, (this.containerElement.clientWidth - this.sectionElement.clientWidth) * -1],
//             progress,
//           );
//           gsap.set(this.containerElement, {
//             x: x,
//           });
//         },
//       },
//     });
//   }
// }

class SvgTitleAnime {
  constructor(
    _sectionElement,
    _svgElement,
    _color = {
      r: 255,
      g: 0,
      b: 0,
    },
    // _start = "top 75%",
    // _end = "bottom 75%",
    _start = "top 95%",
    _end = "bottom 75%",
  ) {
    this.timeline = null;
    this.color = {
      r: _color.r,
      g: _color.g,
      b: _color.b,
      a: 0,
    };
    this.options = {
      start: _start,
      end: _end,
    };
    this.sectionElement = _sectionElement;
    this.svgElement = _svgElement;
    this.svgPathElements = [...this.svgElement.querySelectorAll("path")];
    for (let i = 0; i < this.svgPathElements.length; i++) {
      const path = this.svgPathElements[i];
      const pathLength = path.getTotalLength();

      gsap.set(path, {
        stroke: this.getColor(this.color.r, this.color.g, this.color.b, 1),
        strokeWidth: 1,
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        fill: this.getColor(),
      });
    }
  }

  getColor(_r = this.color.r, _g = this.color.g, _b = this.color.b, _a = this.color.a) {
    return `rgba(${_r},${_g},${_b},${_a})`;
  }

  refresh() {
    this.timeline.scrollTrigger.refresh();
  }

  kill() {
    this.timeline.kill();
    this.timeline = null;
  }

  init(_debug = true) {
    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.sectionElement,
        start: this.options.start,
        end: this.options.end,
        scrub: true,
        markers: _debug,
        onEnter: () => {
          if (_debug) console.log("enter");
        },
        onEnterBack: () => {
          if (_debug) console.log("enter back");
        },
        onLeave: () => {
          if (_debug) console.log("leave");
        },
        onLeaveBack: () => {
          if (_debug) console.log("leave back");
        },
        onUpdate: (self) => {
          const progress = self.progress;

          // prettier-ignore
          const alpha = gsap.utils.interpolate([
            0, 0,
            0, 1,
          ],progress);

          for (let i = 0; i < this.svgPathElements.length; i++) {
            const path = this.svgPathElements[i];
            const pathLength = path.getTotalLength();

            // prettier-ignore
            const strokeDashoffset = gsap.utils.interpolate([
              pathLength, 0,
            ],progress);

            gsap.set(path, {
              strokeDashoffset: strokeDashoffset,
              fill: this.getColor(this.color.r, this.color.g, this.color.b, alpha),
            });
          }
        },
      },
    });
  }
}

class SvgLineAnime {
  constructor(
    _sectionElement,
    _svgElement,
    _color = {
      r: 255,
      g: 0,
      b: 0,
    },
    _start = "top 75%",
    _end = "bottom 75%",
  ) {
    this.timeline = null;
    this.color = {
      r: _color.r,
      g: _color.g,
      b: _color.b,
      a: 0,
    };
    this.options = {
      start: _start,
      end: _end,
    };
    this.sectionElement = _sectionElement;
    this.svgElement = _svgElement;
    this.svgPathElement = this.svgElement.querySelector("path");

    const pathLength = this.svgPathElement.getTotalLength();
    gsap.set(this.svgPathElement, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });
  }

  refresh() {
    this.timeline.scrollTrigger.refresh();
  }

  kill() {
    this.timeline.kill();
    this.timeline = null;
  }

  init(_debug = true) {
    this.timeline = gsap.timeline({
      scrollTrigger: {
        trigger: this.sectionElement,
        start: this.options.start,
        end: this.options.end,
        scrub: true,
        markers: _debug,
        onEnter: () => {
          if (_debug) console.log("enter");
        },
        onEnterBack: () => {
          if (_debug) console.log("enter back");
        },
        onLeave: () => {
          if (_debug) console.log("leave");
        },
        onLeaveBack: () => {
          if (_debug) console.log("leave back");
        },
        onUpdate: (self) => {
          const progress = self.progress;
          // prettier-ignore
          const strokeDashoffset = gsap.utils.interpolate([
            this.svgPathElement.getTotalLength(), 0
          ],progress);

          gsap.set(this.svgPathElement, {
            strokeDashoffset: strokeDashoffset,
          });
        },
      },
    });
  }
}

class MeritTitleAnime extends SvgTitleAnime {
  constructor() {
    super(document.getElementById("jsMeritHeadSection"), document.getElementById("jsMeritTitleSvg"));
  }
}

class MeritLineAnime extends SvgLineAnime {
  constructor() {
    super(document.getElementById("jsMeritContentSection"), document.getElementById("jsMeritLineSvg"));
  }
}

class EmbroideryTitleAnime extends SvgTitleAnime {
  constructor() {
    super(document.getElementById("jsEmbroideryHeadSection"), document.getElementById("jsEmbroideryTitleSvg"));
  }
}

class EmbroideryLineAnime extends SvgLineAnime {
  constructor() {
    super(document.getElementById("jsEmbroideryContentSection"), document.getElementById("jsEmbroideryLineSvg"));
  }
}

class QaTitleAnime extends SvgTitleAnime {
  constructor() {
    super(document.getElementById("jsQaHeadSection"), document.getElementById("jsQaTitleSvg"));
  }
}

class ConnectinToVoiceLineAnime extends SvgLineAnime {
  constructor() {
    super(document.getElementById("jsConnectionToVoiceSection"), document.getElementById("jsConnectionToVoiceLineSvg"));
  }
}

class VoiceAnime {
  constructor() {
    this.timelineHorizontalScroll = null;
    this.sectionElement = document.getElementById("jsVoiceSection");
    this.containerElement = document.getElementById("jsVoiceContainer");
    this.itemElements = [...this.containerElement.querySelectorAll(".jsVerticalScrollItem")];
    this.svgElement = document.getElementById("jsVoiceLineSvg");
    this.svgPathElement = this.svgElement.querySelector("path");
    const pathLength = this.svgPathElement.getTotalLength();
    gsap.set(this.svgPathElement, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    this.headSection = document.getElementById("jsVoiceHeadSection");
    this.svgTitleElement = document.getElementById("jsVoiceTitleSvg");
    this.titleSvgAnime = new SvgTitleAnime(this.headSection, this.svgTitleElement);
  }

  refresh() {
    this.timelineHorizontalScroll.scrollTrigger.refresh();
    this.titleSvgAnime.refresh();
  }

  kill() {
    this.timelineHorizontalScroll.kill();
    this.titleSvgAnime.kill();
  }

  init(_debug = true) {
    this.timelineHorizontalScroll = gsap.timeline({
      scrollTrigger: {
        trigger: this.sectionElement,
        start: "top top",
        end: `${this.containerElement.clientWidth - this.sectionElement.clientWidth}`,
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
        anticipatePin: 1,
        markers: _debug,
        onEnter: () => {
          if (_debug) console.log("enter");
        },
        onEnterBack: () => {
          if (_debug) console.log("enter back");
        },
        onLeave: () => {
          if (_debug) console.log("leave");
        },
        onLeaveBack: () => {
          if (_debug) console.log("leave back");
        },
        onUpdate: (self) => {
          const progress = self.progress;
          // // prettier-ignore
          const x = gsap.utils.interpolate(
            [0, (this.containerElement.clientWidth - this.sectionElement.clientWidth) * -1],
            progress,
          );
          gsap.set(this.containerElement, {
            x: x,
          });

          // prettier-ignore
          const strokeDashoffset = gsap.utils.interpolate([
            this.svgPathElement.getTotalLength(), 0
          ],progress);

          gsap.set(this.svgPathElement, {
            strokeDashoffset: strokeDashoffset,
          });
        },
      },
    });
    this.titleSvgAnime.init();
  }
}

class App {
  constructor() {
    this.body = document.body;
    this.params = {
      w: window.innerWidth,
      h: window.innerHeight,
      isMatchMediaWidth: window.matchMedia("(max-width: 768px)").matches,
      isMatchMediaHover: window.matchMedia("(hover: hover)").matches,
    };

    this.timer = {
      resize: null,
    };

    this.lenis = new Lenis({
      wrapper: window,
      content: document.body,
      smooth: this.params.isMatchMediaWidth ? false : true,
      smoothWheel: this.params.isMatchMediaWidth ? false : true,
      normalizeWheel: this.params.isMatchMediaWidth ? false : true,
      smoothTouch: this.params.isMatchMediaWidth ? false : true,
      touchMultiplier: this.params.isMatchMediaWidth ? 1 : 2,
      lerp: 0.1,
    });
    this.lenis.on("scroll", (e) => {
      // console.log(e);
      ScrollTrigger.update();
    });

    this.voiceAnime = new VoiceAnime();
    this.meritTitleAnime = new MeritTitleAnime();
    this.meritLineAnime = new MeritLineAnime();
    this.embroideryTitleAnime = new EmbroideryTitleAnime();
    this.embroideryLineAnime = new EmbroideryLineAnime();
    this.qaTitleAnime = new QaTitleAnime();
    this.connectinToVoiceLineAnime = new ConnectinToVoiceLineAnime();

    window.addEventListener("resize", this.resize.bind(this), { passive: true });

    gsap.ticker.add(this.update.bind(this));
    gsap.ticker.fps(30);
  }

  update() {
    this.lenis.raf(performance.now());
  }

  resize() {
    clearTimeout(this.timer.resize);
    this.timer.resize = setTimeout(() => {
      this.refresh();
    }, 300);
  }

  refresh() {
    ScrollTrigger.refresh();

    // voice
    this.voiceAnime.refresh();

    // merit
    if (this.meritTitleAnime) this.meritTitleAnime.refresh();
    if (this.meritLineAnime) this.meritLineAnime.refresh();

    // embroidery
    if (this.embroideryTitleAnime) this.embroideryTitleAnime.refresh();
    if (this.embroideryLineAnime) this.embroideryLineAnime.refresh();

    // qa
    if (this.qaTitleAnime) this.qaTitleAnime.refresh();

    // connection
    if (this.connectinToVoiceLineAnime) this.connectinToVoiceLineAnime.refresh();
  }

  init() {
    // voice
    this.voiceAnime.init();

    // merit
    this.meritTitleAnime.init(false);
    this.meritLineAnime.init(false);

    // embroidery
    this.embroideryTitleAnime.init(false);
    this.embroideryLineAnime.init(false);

    // qa
    this.qaTitleAnime.init(false);

    // connection
    this.connectinToVoiceLineAnime.init(false);

    setTimeout(() => {
      this.refresh();
    }, 300);
  }
}

window.addEventListener("DOMContentLoaded", (e) => {
  const app = new App();
  app.init();
});
