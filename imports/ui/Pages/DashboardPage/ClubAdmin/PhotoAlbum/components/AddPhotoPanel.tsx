import React, {useState} from 'react';
import {Meteor} from 'meteor/meteor';
import {Space, Input, Upload, Button, message, Flex, Image} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import type {UploadFile, RcFile} from 'antd/es/upload/interface';
import type {UploadRequestOption as RcCustomRequestOptions} from 'rc-upload/lib/interface';
import {PhotoMethods} from "/imports/api/names";
import {useParams} from "react-router-dom";
import {MethodSetPhotoByPhotoAlbumIDRequestModel} from "/imports/api/Photo/models";

interface PhotoData {
    firstname: string;
    lastname: string;
    title: string;
    photoBase64: string | null; // data URL
}

const fileToBase64 = (file: RcFile) =>
    new Promise<string>((res, rej) => {
        const r = new FileReader();
        r.readAsDataURL(file);
        r.onload = () => res(String(r.result));
        r.onerror = rej;
    });

export const AddPhotoPanel: React.FC = () => {
    const {albumId} = useParams()
    const [photoData, setPhotoData] = useState<PhotoData>({
        firstname: 'Muster', lastname: 'Mustermann', title: 'Fist photo', photoBase64: null,
    });
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [saving, setSaving] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const customRequest = async ({file, onSuccess, onError}: RcCustomRequestOptions) => {
        try {
            const base64 = await fileToBase64(file as RcFile);
            setPhotoData(prev => ({...prev, photoBase64: base64}));
            onSuccess?.({ok: true});
        } catch (e) {
            onError?.(e as any);
        }
    };

    const save = () => {
        if (!photoData.firstname) return message.warning('Invalid Name');
        if (!photoData.lastname) return message.warning('Invalid Vorname');
        if (!photoData.title) return message.warning('Invalid Title');
        if (!photoData.photoBase64) return message.warning('Invalid file');

        const data: MethodSetPhotoByPhotoAlbumIDRequestModel = {
            title: photoData.title,
            photoAlbumId: albumId,
            base64: photoData.photoBase64,
            photographer: {
                firstname: photoData.firstname,
                lastname: photoData.lastname
            }
        }

        setSaving(true);
        Meteor.call(PhotoMethods.SET_PHOTO_BY_ALBUM_ID, data, (err: Meteor.Error | undefined) => {
            setSaving(false);
            if (err) {
                if (err instanceof Meteor.Error) {
                    return message.error(err.details || err.reason || err.message || 'Saving failed');
                }
                console.log(err)
            }
            message.success('Saved successfully');
            setPhotoData({firstname: '', lastname: '', title: '', photoBase64: null});
            setFileList([]);
        });
    };

    const reset = () => {
        setPhotoData({firstname: '', lastname: '', title: '', photoBase64: null});
        setFileList([]);
    };

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await fileToBase64(file.originFileObj as RcFile);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    return (
        <Flex wrap justify="center" >
            <Space direction="vertical" size="middle" style={{width: 420, margin: "0 20px"}}>
                <Input
                    value={photoData.firstname}
                    onChange={e => setPhotoData(p => ({...p, firstname: e.target.value}))}
                    placeholder="Name"
                />
                <Input
                    value={photoData.lastname}
                    onChange={e => setPhotoData(p => ({...p, lastname: e.target.value}))}
                    placeholder="Vorname"
                />
                <Input
                    value={photoData.title}
                    onChange={e => setPhotoData(p => ({...p, title: e.target.value}))}
                    placeholder="Title"
                />

                <Space>
                    <Button type="primary" onClick={save} loading={saving}>Save</Button>
                    <Button onClick={reset}>Cancel</Button>
                </Space>
            </Space>

            <Upload
                listType="picture-circle"
                accept="image/*"
                maxCount={1}
                customRequest={customRequest}
                fileList={fileList}
                onChange={({fileList}) => setFileList(fileList.slice(-1))}
                onRemove={() => {
                    setPhotoData(p => ({...p, photoBase64: null}));
                    return true;
                }}
                onPreview={handlePreview}
            >
                {fileList.length ? null : (
                    <button type="button" style={{border: 0, background: 'none'}}>
                        <PlusOutlined/>
                        <div style={{marginTop: 8}}>Фото</div>
                    </button>
                )}
            </Upload>

            {previewImage && (
                <Image
                    wrapperStyle={{display: 'none'}}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) => !visible && setPreviewImage(''),
                    }}
                    src={previewImage}
                />
            )}
        </Flex>
    );
};