import React, { useEffect, useState } from 'react'
import { Row, Avatar, Col, List } from 'antd'
import Axios from 'axios'

function VideoDetailPage(props) {

    const videoId = props.match.params.videoId
    const variable = { videoId: videoId }
    const [VideoDetail, setVideoDetail] = useState([])
    useEffect(() => {
        Axios.post('/api/video/getVideoDetail', variable)
            .then(response => {
                if (response.data.success) {
                    setVideoDetail(response.data.VideoDetail)
                } else {
                    alert('비디오 정보를 가져오길 실패했습니다.')
                }

            })

    })

    if (VideoDetail.writer) {
        return (
            <Row gutter={[16, 16]}>
                <Col lg={18} xs={24}>
                    <div className="postPage" style={{ width: '100%', padding: '3rem 4em' }}>

                        <video>
                            {/* <video type="video/mp4" style={{ width: '100%' }} src={`http://localhost:5000/${Video.filePath}`} controls></video> */}
                            <source src={`http://localhost:5000/${VideoDetail.filePath}`} type="video/mp4" style={{ width: '100%' }} controls /></video>


                        <List.Item
                            actions
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={VideoDetail.writer.image} />}
                                title={VideoDetail.writer.name}
                                description={VideoDetail}
                            />
                            <div></div>
                        </List.Item>
                    </div>
                </Col>
                <Col lg={6} xs={24}>
                </Col>
            </Row>
        )
    } else {
        return (
            <div></div>
        )
    }
}

export default VideoDetailPage