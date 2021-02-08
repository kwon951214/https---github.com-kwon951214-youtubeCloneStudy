import Axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import SingleComment from '../Sections/SingleComment';
function Comment(props) {

    const videoId = props.postId;
    const user = useSelector(state => state.user);
    const [commentValue, setcommentValue] = useState("")
    const handleClick = (event) => {
        setcommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        console.log(1);
        event.preventDefault();

        const variables = {
            content: commentValue,
            writer: user.userData._id,
            postId: videoId
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                    console.log(response.data.result)
                    setcommentValue("")
                    props.refreshFunction(response.data.result)
                } else {
                    alert('코멘트를 저장하지 못했습니다')
                }
            })


    }
    return (
        <div>
            <br />
            <p>Replies</p>
            <hr />

            {/* comment Lists */}

            {props.commentLists && props.commentLists.map((comment, index) => (
                (!comment.responseTo &&
                    <SingleComment refreshFunction={refreshFunction} comment={comment} postId={props.postId} />
                )

            ))}

            {/* Root Comment Form */}
            <form style={{ display: 'flex' }} onSubmit={onsubmit}>
                <textarea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleClick}
                    value={commentValue}
                    placeholder="코멘트를 작성해 주세요"
                />
                <br />
                <button style={{ width: '20%', height: '52px' }} onClick={onsubmit}> Submit</button>
            </form>
        </div>
    )
}

export default Comment