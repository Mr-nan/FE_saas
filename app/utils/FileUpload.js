/**
 *文件上传工具：
 *  imageUploadUtil ： 图片上传
 */

const imageUploadUtil = (imgAry) => {
    let formData = new FormData();      //因为需要上传多张图片,所以需要遍历数组,把图片的路径数组放入formData中
    for (var i = 0; i < imgAry.length; i++) {
        let file = {
            //这里的key(uri和type和name)不能改变,
            uri: imgAry[i],
            type: 'multipart/form-data',
            name: 'image.png'
        };
        formData.append("files", file);   //这里的files就是后台需要的key
    }

    fetch('http://dms.dycd.com/qkcApi/QkcApi/File/upload', {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        body: formData,
    }).then((response) => {
        response.text()
    }).then((responseData) => {
        console.log('responseData', responseData);
    }).catch((error) => {
        console.error('error', error);
    });
}

export {imageUploadUtil};
