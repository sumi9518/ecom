import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import { useSelector } from 'react-redux';
import {Avatar, Badge} from 'antd';


const FileUpload = ({ values, setValues, setLoading }) => {
    const { user } = useSelector((state) => ({ ...state }));

    const fileUploadAndResize = (e) => {
        console.log(e.target.files);

        //resize

        let files = e.target.files; //[0] for single file
        let allUploadedFiles = values.images;



        if (files) {
            setLoading(true);
            for (let i = 0; i < files.length; i++) {
                Resizer.imageFileResizer(
                    files[i],
                    720,
                    720,
                    'JPEG',
                    100,
                    0,
                    (uri) => {
                        //console.log(uri);
                        axios.post(`${process.env.REACT_APP_API}/uploadimages`, { image: uri }, {
                            headers: {
                                authtoken: user ? user.token : "",
                            },
                        })

                            .then(res => {
                                console.log("Image uploaded Res Data", res);
                                setLoading(false);
                                allUploadedFiles.push(res.data);
                                setValues({ ...values, images: allUploadedFiles });
                            })
                            .catch(err => {
                                setLoading(false);
                                console.log("Cloudinary Upload err", err)
                            })
                    }, "base64");

            }

        }

        //Send back to server to upload to cloudinary
        //res is img url then set url to images[] in parent component (productCreate)

    }
    const handleImageRemove = (public_id) => {
        setLoading(true);
       // console.log('remove image',id);

       axios.post(`${process.env.REACT_APP_API}//removeimage`, {public_id},
       {
           headers: {
               authtoken: user ? user.token : "",
           },
       }
       )
       .then((res)=>{
           setLoading(false);
           const {images} = values;

           //below func sort out images after removal, filteredImages contains images expect deleted one
           let filteredImages = images.filter((eachimg) => {
               return eachimg.public_id !== public_id;
           });
           setValues({...values,images:filteredImages}); //updating state, remaining images to state after deleting
       })
    .catch((err)=>{
        console.log(err);
        setLoading(false);
    });
    }
    return (

        <div>
        <div>
            {values.images && values.images.map((image)=>(
                <Badge 
                count="X" 
                key={image.public_id}  
                onClick={() => handleImageRemove(image.public_id)}   
                style={{cursor:"pointer"}}
                > 
                <Avatar 
                src={image.url}
                size={100}
                shape="square"
                className="ml-3 mb-3"
                />
                </Badge>
            ))}
        </div>
        <div className="row">
            <label className="btn btn-primary">
                Choose files
                <input
                    type="file"
                    multiple
                    hidden
                    accept="images/*"
                    onChange={fileUploadAndResize}
                />
            </label>
        </div>
        </div>
    );
};

export default FileUpload;