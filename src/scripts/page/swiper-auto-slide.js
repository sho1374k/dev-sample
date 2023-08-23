import Swiper from "swiper/bundle";

window.addEventListener("DOMContentLoaded", (e) => {
  class SwiperAuto {
    constructor(duration = 30000) {
      this.config = {
        speed: duration,
        loop: true,
        slidesPerView: "auto",
        spaceBetween: 0,
        loopAdditionalSlides: 1,
        allowTouchMove: false, // スワイプ操作をできないようにする
        autoplay: {
          delay: 0, // 0にすることで流れ続けるようになる
          disableOnInteraction: false,
        },
      };
    }

    reset() {
      if (this.swiperList.length) {
        this.classList.forEach((data, i) => {
          data.destroy();
          if (i === this.swiperList.length - 1) this.swiperList = [];
        });
      }
    }

    init() {
      this.classList = [];
      this.swiperList = [...document.querySelectorAll(".js-swiperAuto")];
      if (this.swiperList.length > 0) {
        this.swiperList.forEach((ele) => {
          const wrap = ele.querySelector(".swiper-wrapper");
          wrap.setAttribute("style", "transition-timing-function: linear !important;");
          const data = new Swiper(ele, this.config);
          this.classList.push(data);
        });
      }
    }
  }
  const auto = new SwiperAuto();
  auto.init();
});
