import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone-uploader';
import 'react-dropzone-uploader/dist/styles.css';

const servicePhotoPath = '/service-service-photos';
const foodPhotoPath = '/service-food-photos';

const photoPath = foodPhotoPath;

const PhotoUploader = ({ addPhoto, removePhoto, setMain, mainPhotoId, photoIds, lastPhotoId }) => {
    const dropzone = useRef(null);

    const onChangeStatus = useCallback(({ meta, file, xhr }, status) => {
        if (status === 'done') {
            const id = lastPhotoId + 1;
            addPhoto(id);
            dropzone.current.files.forEach(f => f.remove());
        }
    }, [dropzone.current, addPhoto, lastPhotoId]);

    return <>
        <div uk-grid className="uk-grid uk-grid-small uk-child-width-1-2 uk-child-width-1-4@s uk-text-center">
            {photoIds.map(id => <div key={id}>
                <div className="uk-card uk-card-default">
                    <div className="uk-card-media-top uk-inline">
                        <img src={`${photoPath}/${id}.jpg`} alt={id}/>

                        {mainPhotoId !== id
                            ? <div className="uk-position-bottom-left uk-overlay" style={{ padding: '5px' }}>
                                <a uk-icon="image"
                                   className="uk-icon-button uk-button-primary"
                                   title="Сделать главной"
                                   onClick={() => setMain(id)}/>
                            </div>
                            : ''}

                        <div className="uk-position-bottom-right uk-overlay" style={{ padding: '5px' }}>
                            <a uk-icon="trash"
                               className="uk-icon-button uk-button-danger"
                               title="Удалить"
                               onClick={() => removePhoto(id)}/>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
        <Dropzone
            ref={dropzone}
            getUploadParams={() => ({ url: 'https://httpbin.org/post' })}
            onChangeStatus={onChangeStatus}
            accept="image/*"
            inputContent="Кликните для загрузки фотографий"
            inputWithFilesContent="Загрузить ещё"
            submitButtonContent={null}
        />
    </>;
};

PhotoUploader.propTypes = {
    setMain: PropTypes.func.isRequired,
    addPhoto: PropTypes.func.isRequired,
    removePhoto: PropTypes.func.isRequired,
    photoIds: PropTypes.array,
    mainPhotoId: PropTypes.number,
    lastPhotoId: PropTypes.number,
};

export default PhotoUploader;
