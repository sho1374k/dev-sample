import Swiper from "swiper/bundle";

window.addEventListener("DOMContentLoaded", (e) => {
  class SwiperSingle {
    constructor() {}

    reset() {
      if (this.swiperList.length) {
        this.classList.forEach((data, i) => {
          data.destroy();
          if (i === this.swiperList.length - 1) {
            this.swiperList = [];
          }
        });
      }
    }

    init() {
      this.classList = [];
      this.swiperList = [...document.querySelectorAll(".js-swiperSingle")];

      if (this.swiperList.length > 0) {
        this.swiperList.forEach((ele) => {
          const config = {
            loop: ele.getAttribute("data-loop") === "true",
            speed: 400,
            autoplay: ele.getAttribute("data-autoplay") === "true",
            slidesPerView: "auto",
            loopAdditionalSlides: 1,
            spaceBetween: 0,
            paginationClickable: true,
          };

          const nextBtn = ele.querySelector(".swiper-button-next"),
            prevBtn = ele.querySelector(".swiper-button-prev");
          if (nextBtn && prevBtn) {
            config.navigation = {
              nextEl: nextBtn,
              prevEl: prevBtn,
            };
          }

          const pg = ele.querySelector(".swiper-pagination");
          if (pg) {
            // type: bullets, fraction
            config.pagination = {
              el: pg,
              type: ele.getAttribute("data-pagination-type"),
            };
          }

          const scrollbar = ele.querySelector(".swiper-scrollbar");
          if (scrollbar) {
            config.scrollbar = {
              el: scrollbar,
              hide: false, // ユーザー操作後にスクロールバーを非表示にしない
              draggable: true, // ドラッグ操作を可能にする
              dragClass: "drag",
              snapOnRelease: true, // スクロールバーを離したときにスライダーの位置を固定しないようにする
            };
          }

          const obj = new Swiper(ele, config);
          obj.on("slideChange", (e) => {
            setTimeout(() => {
              const index = obj.activeIndex; // 複製したスライドを含むindex番号
              const realIndex = obj.realIndex; // 複製前のスライドのindex番号
            }, 100);
          });
          this.classList.push(obj);

          const drag = ele.querySelector(".drag");
          drag.classList.add("js-drag");
        });
      }
    }
  }

  const single = new SwiperSingle();
  single.init();
});
