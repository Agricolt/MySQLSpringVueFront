import axios from 'axios';
import Comment from '../dto/Comment'

const COMMENT_API_BASE_URL = 'http://localhost:8080/api/comments';

class CommentService{

    getComments(){
        let comments = axios.get(COMMENT_API_BASE_URL);
        return comments;
    }

    getComment(id){
        let comment = axios.get(COMMENT_API_BASE_URL + '/' + id );
        return comment;
    }

    saveEditedComment(comment, selectedEmployee) {
        let commentDto = new Comment(comment.commentName, comment.commentText, selectedEmployee.id)
        return axios.put(COMMENT_API_BASE_URL + '/' + comment.id, commentDto);
    }

    deleteComment(id) {
        return axios.delete(COMMENT_API_BASE_URL + '/' + id);
    }

    createComment(comment, selectedEmployee) {
        let commentDto = new Comment(comment.commentName, comment.commentText, selectedEmployee.id)
        return axios.post(COMMENT_API_BASE_URL, commentDto);
    }
}

export default new CommentService();