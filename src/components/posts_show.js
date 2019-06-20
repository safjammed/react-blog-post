import React, {Component} from 'react';
import {fetchPost, deletePost} from '../actions';
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Swal from 'sweetalert2';

class PostsShow extends Component {
    componentDidMount(){
        if (!this.props.post){
            const {id} =this.props.match.params;
            this.props.fetchPost(id);
        }

    }
    onDeleteClick(){
        const {id} = this.props.match.params;
        this.props.deletePost(id,() => {
            this.props.history.push("/");
            Swal.fire('success', "The post has been deleted", 'success' );
        });
    }
    render() {
        const {post} = this.props;
        console.log("post data", post);

        if (!post){
            return (
                <div>Loading...</div>
            );
        }
        return (

            <div>
                <Link to={"/"}> {'<<'} Back to index</Link>
                <button
                    className="btn btn-danger pull-xs-right"
                    onClick={this.onDeleteClick.bind(this)}
                >
                    Delete Post
                </button>
                <h3>{post.title}</h3>
                <h6>Categories: {post.categories}</h6>
                <p>{post.content}</p>
            </div>
        );
    }
}

const mapStateToProps = ({ posts }, ownProps) =>{
    // ownProps === this.props
    return {post : posts[ownProps.match.params.id]}
};

export default connect(mapStateToProps,{fetchPost, deletePost})( PostsShow );