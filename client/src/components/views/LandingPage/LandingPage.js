import React, { useEffect, useState } from 'react'
import { Card, Avatar, Col, Typography, Row } from 'antd';
import Axios from 'axios';
import moment from 'moment';

const { Title } = Typography
const { Meta } = Card;

function LandingPage() {

    const [Video, setVideo] = useState([]);
    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data)
                    setVideo(response.data.videos)
                } else {
                    alert('비디오 가져오기 실패')
                }
            })
    }, [])

    // useEffect 돔이 로드 될 떄 무엇을 한 번 할 것인지  
    //[] 이게 비어있으면 한 번만 dom 업데이트 ([] 자체가 아예 없으면 계속 실행)

    //map() -  파라미터로 전달된 함수를 사용해서 배열 내 각 요소를 원하는 규칙에 따라 변환한 후 결과로 새로운 배열을 생성
    //         즉, 위에서 Video 로 전달받은 배열을 map 메소드를 이용하여 video라는 값에 넣어 새로운 배열로 만든 후, 렌더링
    //        (반복되는 컴포넌트를 랜더링 할 수 있다)
    const renderCards = Video.map((video, index) => {
        
        var minutes = Math.floor(video.duration / 60);
        var seconds = Math.floor((video.duration - minutes * 60));

        return <Col lg={6} md={8} xs={24} key={video._id}>

            
                <a href={`/video/post/${video._id}`}>
                <div style={{ position: 'relative' }}>
                    <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="">

                    </img>
                    <div className="duration">
                        <span>{minutes}:{seconds}</span>
                    </div>
                    </div>
                </a>
            <br />
            <Meta avatar={
                <Avatar src={video.writer.image} />
            }
                title={video.title}
                description=""
            />
            <span>{video.writer.name} </span><br />
            <span style={{ marginLeft: '3rem' }}> {video.views} views</span>
            - <span> {moment(video.createdAt).format("MMM Do YY")} </span>
        </Col>
    })
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2}>Recommended</Title>
            <hr/>
            <Row gutter={[32, 16]}>
                {renderCards}
            </Row>
        </div>
    )
}

export default LandingPage
