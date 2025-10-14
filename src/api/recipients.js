// src/api/recipients.js
import axios from "axios";

const BASE_URL = "https://rolling-api.vercel.app/19-3"; // ✅ 실제 API 주소

// 카드 목록 불러오기
export async function getRecipients() {
  const res = await axios.get(`${BASE_URL}/recipients/`);
  return res.data;
}

// 새로운 카드 추가 (POST)
export async function createRecipient(newData) {
  const res = await axios.post(`${BASE_URL}/recipients/`, newData);
  return res.data;
}