import httpT from "./tokenInstance";

/**
 * 유저 정보
 * @typedef {Object} PostInfo
 * @property {string} board_name
 * @property {string} account_id
 * @property {string} description
 */

/**
 * 댓글 정보
 * @typedef {Object} PostInfo
 * @property {string} post_id
 * @property {string} account_id
 * @property {string} description
 */

/**
 * 포스트 
 * @param {PostInfo} postInfo 글 작성
 * @returns {Promise}
 */

 export const post = (postInfo)=> httpT.post("/post",postInfo);

/**
 * 포스트 조회 
 */

 export const postList = (page,mbti)=> httpT.get("post?search=&per_page=10&page="+page+"&search_type=&mbti="+mbti);

/**
 * 포스트 뷰 증가 
 */

  export const postView = (postId)=> httpT.get("post/"+postId);

 /**
 * 포스트 좋아요 
 */
 export const postLike = (account_id,postId)=> httpT.patch("post/like/"+postId,{account_id:account_id});

/**
 * 댓글 작성 
 */

 export const commentPost = (commentInfo)=> httpT.post('comment',commentInfo);

 /**
 * 댓글 조회 
 */
  export const commentList = (page,postId)=> httpT.get('comment?page='+page+'&per_page=10&post_id='+postId);

/**
 *  대댓글 작성
 */

 export const bigCommentPost = (commentInfo)=> httpT.post('comment',commentInfo);




