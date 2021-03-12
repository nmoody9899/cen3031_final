import React from "react";
import Resizer from "react-image-file-resizer";
//for displaying in component
import { Avatar, Badge } from "antd";
//import {UserOutlined} from '@ant-design/icons';
// import axios from "axios";
//need user because protected admin route
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import axios from "axios";

//resizing
/**
     * Resizer.imageFileResizer(
    file, // Is the file of the image which will resized.
    maxWidth, // Is the maxWidth of the resized new image.
    maxHeight, // Is the maxHeight of the resized new image.
    compressFormat, // Is the compressFormat of the resized new image.
    quality, // Is the quality of the resized new image.
    rotation, // Is the degree of clockwise rotation to apply to uploaded image. 
    responseUriFunc,  // Is the callBack function of the resized new image URI.
    outputType,  // Is the output type of the resized new image.
    minWidth, // Is the minWidth of the resized new image.
    minHeight, // Is the minHeight of the resized new image.
    );
     * Option	Description	Type	Required
file	Path of image file	object	Yes
maxWidth	New image max width (ratio is preserved)	number	Yes
maxHeight	New image max height (ratio is preserved)	number	Yes
compressFormat	Can be either JPEG, PNG or WEBP.	string	Yes
quality	A number between 0 and 100. Used for the JPEG compression.(if no compress is needed, just set it to 100)	number	Yes
rotation	Degree of clockwise rotation to apply to the image. Rotation is limited to multiples of 90 degrees.(if no rotation is needed, just set it to 0) (0, 90, 180, 270, 360)	number	Yes
responseUriFunc	Callback function of URI. Returns URI of resized image's base64 format. ex: uri => {console.log(uri)});	function	Yes
outputType	Can be either base64, blob or file.(Default type is base64)	string	No
minWidth	New image min width (ratio is preserved, defaults to null)	number	No
minHeight	New image min height (ratio is preserved, defaults to null)	number	No
     */

const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  if (user) {
    console.log(user);
  }

  const fileUploadAndResize = (e) => {
    //console.log(e.target.files);
    //resize then send back to server for upload to cloudinary
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);

      //start resizing
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            //console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data); //now this contains all images including previously existing

                //now store allUploadedFiles to parent state image []
                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("CLOUDINARY UPLOAD ERROR", err);
              });
          },
          "base64"
        );
      }
      //response will have url that needs to be associated with product
      //set url to image[] in parent component - ProductCreate
    }
  };

  //to display images we'll use Avatar component from Antd

  const handleImageRemove = (public_id) => {
    setLoading(true);
    //console.log("remove image", id);
    axios
      .post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id: public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        console.log("RES IMAGE REMOVE:", res);
        setLoading(false);
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        //
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="row">
        {values.images &&
          values.images.map((image) => (
            <Badge
              count="X"
              key={image.public_id}
              onClick={() => handleImageRemove(image.public_id)}
              style={{ cursor: "pointer" }}
            >
              <Avatar
                src={image.url}
                size={128}
                shape="square"
                className="ml-3"
              />
            </Badge>
          ))}
      </div>
      <div className="row">
        <label className="btn btn-primary btn-raised mt-3">
          Choose Images
          <input
            type="file"
            multiple
            hidden
            accept="images/*"
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </>
  );
};

FileUpload.propTypes = {
  values: PropTypes.any,
  setValues: PropTypes.any,
  setLoading: PropTypes.any,
};

export default FileUpload;
