import React, { useState } from 'react'
import Axios from 'axios'
import { Comment, Avatar, Button, Input } from 'antd';
import { useSelector } from 'react-redux';

function SingleComment(props) {
    const user = useSelector(state => state.user);
    const [OpenReply, setOpenReply] = useState(false)
    const [CommentValue, setCommentValue] = useState("")
    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }
    const onHandleChanege = (event) => {
        setCommentValue(event.currentTarget.value)
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log(props)
        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        }

        Axios.post('/api/comment/saveComment', variables)
            .then(response => {
                if (response.data.success) {
                
                   setCommentValue("")
                   setOpenReply(!OpenReply)
                   props.refreshFunction(response.data.result)
                } else {
                    alert('코멘트를 저장하지 못했습니다')
                }
            })
    }
    const actions = [
        <span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]
    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment && props.comment.writer ? props.comment.writer.name : ''}
                avatar={<Avatar arc={props.comment && props.comment.image ? props.comment.writer.image : ''} alt />}
                content={<p>{props.comment ? props.comment.content : ''}</p>}
            />
            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <textarea
                        style={{ width: '100%', borderRadius: '5px' }}
                        onChange={onHandleChanege}
                        value={CommentValue}
                        placeholder="코멘트를 작성해 주세요"
                    />
                    <br />
                    <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}> Submit</button>
                </form>
            }
        </div>

    )
}

export default SingleComment