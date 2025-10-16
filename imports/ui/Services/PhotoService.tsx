import {
    MethodDeletePhotoByIdRequestModel, MethodDeletePhotoByIdResponseModel,
    MethodGetPhotosListByAlbumIdRequestModel,
    MethodGetPhotosListByAlbumIdResponseModel, MethodSetPhotoByPhotoAlbumIDRequestModel,
    MethodUpdatePhotoRequestModel, Photo
} from "/imports/api/Photo/models";
import {create} from "zustand";
import {Meteor} from "meteor/meteor";
import {PhotoMethods} from "/imports/api/names";

interface IPhotoAlbumService {
    photosList: MethodGetPhotosListByAlbumIdResponseModel[];
    loading: boolean;
    photosListByAlbumIdFetch(photoAlbumId: string): Promise<void>;
    deletePhotoById(photoId: string): Promise<Photo>;
    setPhoto(photoData: MethodSetPhotoByPhotoAlbumIDRequestModel): Promise<string>;
    updatePhoto(photoData: MethodUpdatePhotoRequestModel): Promise<void>;
}

export const PhotoService = create<IPhotoAlbumService>(setState => {
    return {
        photosList: [],
        loading: false,
        photosListByAlbumIdFetch(photoAlbumId) {
            return new Promise((resolve, reject) => {
                setState(state => ({...state, loading: true}))
                const params: MethodGetPhotosListByAlbumIdRequestModel = {albumId: photoAlbumId}
                Meteor.call(PhotoMethods.GET_PHOTOS_LIST_BY_ALBUM_ID, params, (err: any, res: MethodGetPhotosListByAlbumIdResponseModel[]) => {
                    if (err) {
                        setState(state => ({...state, loading: false}))
                        return reject(err);
                    }
                    setState(state => ({...state, loading: false, photosList: res}))
                    resolve()
                });
            })
        },
        deletePhotoById(photoId) {
            return new Promise((resolve, reject) => {
                const params: MethodDeletePhotoByIdRequestModel = {photoId}
                Meteor.call(PhotoMethods.DELETE_PHOTO_BY_ID, params, (err: any, res: MethodDeletePhotoByIdResponseModel) => {
                    if(err) return reject(err);
                    resolve(res.photo);
                });
            })
        },
        setPhoto(photoData) {
            return new Promise((resolve, reject) => {
                Meteor.call(PhotoMethods.SET_PHOTO_BY_ALBUM_ID, photoData, (err: any) => {
                    if (err) return reject(err);
                    resolve(photoData.photoAlbumId as string);
                });
            })
        },
        updatePhoto(photoData: MethodUpdatePhotoRequestModel) {
            return new Promise((resolve, reject) => {
                Meteor.call(PhotoMethods.UPDATE_PHOTO_BY_ID, photoData, (err: any, _: MethodUpdatePhotoRequestModel) => {
                    if (err) return reject(err);
                    resolve();
                })
            })
        }
    }
})