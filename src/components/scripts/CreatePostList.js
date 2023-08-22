/**
 * 記事データを作成
 * @param {Array} posts // 記事情報データ
 * @param {Number} pageId // 現在のページID
 * @param {String} order // asc or desc
 * @returns {Object} 合計ページ数、最適化した投稿一覧
 */
export function CreatePostList(posts, pageId = 1, perPage = 1, order = "desc") {
  // 公開記事のみの記事一覧
  const nonDraftPosts = posts.filter((post) => !post.draft);

  // ▼ `await Astro.glob("./*.md");`で取得した記事データの際に使用する ▼
  // urlからindex番号を取得し整列
  // nonDraftPosts.sort(function (first, second) {
  //   const firstArray = first.url.split("/"),
  //     firstId = Number(firstArray[firstArray.length - 1]);

  //   const secondArray = second.url.split("/"),
  //     secondId = Number(secondArray[secondArray.length - 1]);

  //   if (firstId > secondId) {
  //     return -1;
  //   } else if (firstId < secondId) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // });

  // 「asc」or「desc」
  const postList = order === "asc" ? nonDraftPosts.reverse() : nonDraftPosts;

  // ページ数関連の情報
  const PAGE_ID = Number(pageId);
  const PER_POST = perPage;
  const MAX_POST = postList.length;
  const TOTAL_PAGES = Math.round(MAX_POST / PER_POST);

  // 表示する範囲を切り取る
  const OFFSET_POST = PER_POST * PAGE_ID - PER_POST;
  const GET_POST = PER_POST;
  const resultPostList = postList.slice(OFFSET_POST, OFFSET_POST + GET_POST);

  return {
    postList: resultPostList,
    totalPages: TOTAL_PAGES,
  };
}
