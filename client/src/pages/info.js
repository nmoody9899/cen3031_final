
import React from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import './information/info.css';
import ReactPlayer from "react-player"

class DeleteHTTP {

    // Make an HTTP PUT Request
    async delete(url) {

        // Awaiting fetch which contains 
        // method, headers and content-type
        const response = await fetch(url, {
            method: 'DELETE',
            mode: 'cors'
        });
        console.log('Response: ', response);

        // Awaiting for the resource to be deleted
        const resData = 'resource deleted...';

        // Return response data 
        return resData;
    }
}


class Info extends React.Component {

    state = {
        title: '',
        body: '',
        posts: [],
        id: ''
    };


    componentDidMount = () => {
        this.getBlogPost();
    };



    getBlogPost = () => {
        axios.get('http://localhost:8000/infoapi')
            .then((response) => {
                const data = response.data;
                this.setState({ posts: data });
                console.log('Data has been received!!');
            })
            .catch(() => {
                alert('Error retrieving data!!!');
            });
    }

    handleChange = ({ target }) => {
        const { name, value } = target;
        this.setState({ [name]: value });
    };


    delete = (data) => {

        // Instantiating new EasyHTTP class
        const http = new DeleteHTTP;
        const ID = data;
        console.log('ID: ', data);
        console.log('type: ', data.type);

        // Update Post
        http.delete('http://localhost:8000/infoapi/' + ID)

            // Resolving promise for response data
            .then(() => {
                data => console.log('Deleted: ', data);
                this.resetUserInputs();
                this.getBlogPost();
            })

            // Resolving promise for error
            .catch(err => console.log('Deletion error: ', err));
    };



    submit = (event) => {
        event.preventDefault();

        const payload = {
            title: this.state.title,
            body: this.state.body
        };


        axios({
            url: 'http://localhost:8000/infoapi/save',
            method: 'POST',
            data: payload
        })
            .then(() => {
                console.log('Data has been sent to the server');
                this.resetUserInputs();
                this.getBlogPost();
            })
            .catch(() => {
                console.log('Internal server error');
            });
    };;


    resetUserInputs = () => {
        this.setState({
            title: '',
            body: '',
            id: ''
        });
    };


    displayBlogPost = (posts) => {

        if (!posts.length) {
            return null;
        }


        return posts.map((post, index) => (
            <div key={index} className="blog-post__display">


                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div>
                    <ReactPlayer
                        url={post.body}
                        controls={true}
                    />
                </div>
                <p>Post ID Number: {post._id}</p>


            </div>
        ));
    };

    render() {

        console.log('State: ', this.state);

        //JSX
        return (

            <div className="infoapp">
                <h2>Information Page</h2>
                <h2>Administrator Blog Creation:</h2>
                <form onSubmit={this.submit}>
                    <Link to={`/information`}>
                        <div className="form-input">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                value={this.state.title}
                                onChange={this.handleChange}
                            />
                        </div>
                        <div className="form-input">
                            <textarea
                                placeholder="Body"
                                name="body"
                                cols="30"
                                rows="10"
                                value={this.state.body}
                                onChange={this.handleChange}
                            >

                            </textarea>
                        </div>
                    </Link>
                    <button>Submit New Post</button>
                </form>

                <br>
                </br>
                <h2>Posts:</h2>
                <div className="blog-">
                    {this.displayBlogPost(this.state.posts)}
                </div>

                <div>
                    <br>
                    </br>
                    <h2>Delete A Post</h2>
                    <textarea
                        placeholder="Post ID Number"
                        name="id"
                        cols="30"
                        rows="1"
                        value={this.state.id}
                        onChange={this.handleChange}
                    >

                    </textarea>
                    <div>
                        <button className="mr-2"
                            onClick={() => this.delete(this.state.id)}
                        >Delete Posts</button>
                    </div>

                </div>


            </div>


        );
    }
}


export default Info;