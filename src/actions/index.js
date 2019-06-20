import axios from 'axios';

export const FETCH_POSTS = 'fetch_posts';
export const FETCH_POST = 'fetch_post';
export const CREATE_POST = 'create_post';
export const DELETE_POST = 'delete_post';

const API_KEY = "safjammed";
const ROOT_URL = 'http://reduxblog.herokuapp.com/api';

export function fetchPosts() {
    const request = axios.get(`${ROOT_URL}/posts?key=${API_KEY}`);
    // console.log("actions",request);
    return {
        type: FETCH_POSTS,
        payload:request
    }
}

export function createPost(values, callback) {
    console.log("action creator", values);
    const request = axios.post(`${ROOT_URL}/posts?key=${API_KEY}`, values)
        .then(()=> callback());

    return {
        type: CREATE_POST,
        payload: request
    }
}

export function deletePost(id, callback) {

    const request = axios.delete(`${ROOT_URL}/posts/${id}?key=${API_KEY}`)
        .then(()=> callback());

    return {
        type: DELETE_POST,
        payload: id
    }
}

export function fetchPost(id) {
    console.log("getting post", id);
    const request = axios.get(`${ROOT_URL}/posts/${id}?key=${API_KEY}`);
    console.log("action promise:", request);
    return {
        type: FETCH_POST,
        payload: request
    }
}