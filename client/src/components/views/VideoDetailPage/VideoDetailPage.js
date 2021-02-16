import React, { useEffect, useState } from 'react'
import { Row, Avatar, Col, List } from 'antd';
import Axios from 'axios';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';
import Comment from './Sections/Comment';
function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const variable = { videoId: videoId }
    const [VideoDetail, setVideoDetail] = useState([])
    const [Comments, setComments] = useState([])
    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {

                    setVideoDetail(response.data.videoDetail)

                } else {
                    alert('비디오 정보를 가져오길 실패했습니다.')
                }

            })
            
        Axios.post('/api/comment/getComments', variable)
            .then(response => {
                if (response.data.success) {
                    setComments(response.data.comments)
                    console.log(response.data)
                } else {
                    alert('코멘트 정보를 가져오는 것을 실패 하였습니다.')
                }
            })

    }, [])

    const refreshFunction = (newComment) => {
        setComments(Comments.concat(newComment))
    }
    if (VideoDetail.writer) {

        const subscribeButton = VideoDetail.writer._id !== localStorage.getItem('userId') && <Subscribe userTo={VideoDetail.writer._id} userFrom={localStorage.getItem('userId')} />
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>

                        <video>
                            {/* <video type="video/mp4" style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video> */}
                            <source src={`http://localhost:5000/${VideoDetail.filePath}`} type="video/mp4" style={{ width: '100%' }} controls /></video>


                        <List.Item
                            actions={[subscribeButton]}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail.description}
                            />
                            <div></div>
                        </List.Item>

                        {/* conntents */}
                        <Comment refreshFunction={refreshFunction} commentLists={Comments} postId={videoId} />
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                    <SideVideo />
                </Col>
            </Row>
        )
    } else {
        return (
            <div>Loading...</div>
        )
    }
}

export default VideoDetailPage