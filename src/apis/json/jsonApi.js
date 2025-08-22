import { jsonInstance } from "../utils/instance"

export const getPostRequest = async (postId) => {
    try {
        const response = await jsonInstance.get(`posts/${postId}`)
        return response //함수를 사용하는 쪽에서 처리하기 위함 - components
    } catch (error) {
        return error.response;
    }
}