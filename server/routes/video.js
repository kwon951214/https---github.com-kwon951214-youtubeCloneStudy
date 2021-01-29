const express = require('express');
const router = express.Router();

const { Video } = require("../models/Video"); //모델 만들고 가져오는거

const { auth } = require("../middleware/auth");
const multer = require("multer");

var ffmpeg = require("fluent-ffmpeg");

let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.mp4') {
            return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
        }
        cb(null, true)
    }
});

const upload = multer({ storage: storage }).single("file");
//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    //req를 통해서 파일을 받음
    console.log(2)
    //비디오를 서버에 저장한다
    upload(req, res, err => {
        if (err) {
            return res.json({ success: false, err });
        }
        return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
    })

})

router.post('/uploadVideo', (req, res) => {
    //비디오 정보들을 저장한다.
    const video = new Video(req.body) //client에서 보낸 value가 req.body안에 담겨있음
    //console찍기
    video.save((err, doc) => { //video.save() ->저장하는 거 *몽고디비 메소드:
        if (err) return res.json({ success: false, err })
        res.status(200).json({ success: true })
    })
})

router.post('/getVideos', (req, res) => {
    //비디오를 DB에서 가져와 클라이언트에 보낸다

    Video.find() //find() :비디오 콜렉션 안에 있는 모든걸 가져옴
    .populate('writer') //populate 안하면 id밖에 못가져옴
    .exec((err, videos)=> {
        if(err) return res.status(400).send(err)
        res.status(200).json({ success: true, videos})
    })
})


router.post("/thumbnail", (req, res) => {

    let filePath = "";
    let fileDuration = "";
    //썸네일 생성하고 비디오 러닝타임도 가져오기

    //비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function (err, metadata) {
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })

    //썸네일 생성
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            console.log(filenames)

            filePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, url: filePath, fileDuration: fileDuration })
        })
        .on('error', function (err) {
            console.log(err);
            return res.json({ success: false, err });
        })
        .screenshots({

            count: 3, //썸네일 세개
            folder: 'uploads/thumbnails',
            size: '320x240',

            filename: 'thumbnail-%b.png'
        });

});


module.exports = router;
