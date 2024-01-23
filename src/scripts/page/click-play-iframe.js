/*
【リファレンス: Yotube > IFrame Player API】
- https://developers.google.com/youtube/player_parameters?hl=ja
*/

// const SITE_URL = import.meta.env.SITE;
const SITE_URL = "https://sho1374k.github.io/dev-sample/";
const JSON_URL = SITE_URL + "assets/json/youtube.json";

class Youtube {
  constructor() {
    this.data = null;
    this.player = null;

    this.isOnced = false;
    this.createScript();
  }

  load() {
    return new Promise((resolve) => {
      fetch(JSON_URL)
        .then((_data) => {
          return _data.json();
        })
        .then(async (_data) => {
          this.data = _data;
          await this.readyYoutube();
          resolve();
        })
        .catch((error) => {
          resolve();
          throw new Error(error);
        });
    });
  }

  readyYoutube() {
    return new Promise((resolve) => {
      window.onYouTubeIframeAPIReady = () => {
        this.player = new YT.Player("youtube", {
          videoId: this.data[0].videoId,
          playerVars: {
            fs: 0, // 0: 全画面表示ボタンはプレーヤーに表示されなくなります
            mute: 0,
            iv_load_policy: 3, // 3: 動画アノテーションを非表示
            loop: 0,
            rel: 0,
            showinfo: 0, // 2018年にサポート対象外に
            controls: 0,
            modestbranding: 1, // 1: YouTube プレーヤーに YouTube ロゴが表示されないようにすることができます
            playsinline: 1,
          },
        });
        resolve();
      };
    });
  }

  createScript() {
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/player_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  play(_videoId, _seekTime) {
    if (this.player != null) this.player.loadVideoById(_videoId, _seekTime);
  }

  init() {
    this.targetElementList = [...document.querySelectorAll(".jsTarget")];
    for (let i = 0; i < this.targetElementList.length; i++) {
      const target = this.targetElementList[i];
      target.addEventListener("click", (e) => {
        this.play(this.data[i].videoId, 0);
      });
    }
  }
}

window.addEventListener("DOMContentLoaded", async (e) => {
  const app = new Youtube();
  await app.load();
  app.init();
});
