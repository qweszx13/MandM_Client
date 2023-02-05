import { useEffect } from "react";
import http from "./instance";
import testHttp from "./instanceTest"

/**
 * 유저 정보
 * @typedef {Object} AccountInfo
 * @property {string} account_id
 * @property {string} account_pw
 * @property {string} account_mbti
 */

/**
 * 회원가입
 * @param {AccountInfo} AccountInfo 유저 정보
 * @returns {Promise}
 */


export const test = fetch('http://192.168.0.6:3000/api/kanji')
.then(res => console.log(res))




export const accountCreate = (AccountInfo)=> http.post("/account",AccountInfo);

/**
 * 로그인
 * @property {string} account_id
 * @property {string} account_pw
 * @returns {Promise}
 */

export const accountLogin = (account_id,account_pw)=> http.post("/login",{account_id,account_pw});

/**
 * 계정 삭제
 * @property {string} account_id
 * @property {string} account_pw
 * @returns {Promise}
 */

 export const accountDelete = (account_id,account_pw)=> http.delete("/account",{account_id,account_pw});


