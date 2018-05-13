import React from 'react'
import FineUploaderTraditional from 'fine-uploader-wrappers'
import Gallery from 'react-fine-uploader'
import 'react-fine-uploader/gallery/gallery.css'

const uploader = new FineUploaderTraditional({
    options: {
        chunking: {
            enabled: true
        },
        deleteFile: {
            enabled: true,
            endpoint: '/uploads'
        },
        request: {
            endpoint: '/uploads',
            params:{
                Policy:"fafasfasfsafg11421542155egwegyewtgewt"
            }
        },
        retry: {
            enableAuto: false
        }
    }
});

class Uploader extends React.Component{

    render(){
        return(
            <div>
                <Gallery uploader={ uploader } />
            </div>
        );
    }
}

export default Uploader;