const multer = require('multer');
const multerS3 = require('multer-s3');
const aws = require('aws-sdk');
// @ts-ignore
import {v1} from 'uuid';

aws.config.loadFromPath(__dirname + '/../config/s3.json');


function getNewFileName() {
    console.log(v1());
    const date2 = new Date('1995-12-17T03:24:00');
    let newFileName = date2.toISOString() + "_" + v1();

    return newFileName
}


const s3 = new aws.S3();
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'kyungjoon001',
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req: any, file: any, cb: any) {
            const [extension, ...nameParts] = file.originalname.split('.').reverse();
            console.log('extension:', extension);
            let _newFileName = getNewFileName() + "." + extension;
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
});
export default upload
