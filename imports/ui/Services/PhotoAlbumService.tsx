import {create} from "zustand";
import {
    MethodDeletePhotoAlbumByIdRequestModel,
    MethodGetPhotoAlbumListResponseModel,
    MethodSetPhotoAlbumCreateRequestModel,
} from "/imports/api/PhotoAlbum/models";
import {Meteor} from "meteor/meteor";
import {PhotoAlbumMethods} from "/imports/api/names";

interface IPhotoAlbumService {
    photoAlbumsList: MethodGetPhotoAlbumListResponseModel[];
    loading: boolean;
    photoAlbumsListFetch(): Promise<void>;
    deletePhotoAlbumById(photoAlbumId: string): Promise<void>;
    createPhotoAlbum(data: MethodSetPhotoAlbumCreateRequestModel): Promise<void>;
}

export const PhotoAlbumService = create<IPhotoAlbumService>(setState => {
    return {
        photoAlbumsList: [],
        loading: false,
        photoAlbumsListFetch () {
            return new Promise((resolve, rejects) => {
                setState(state => ({...state, loading: true}))
                Meteor.call(PhotoAlbumMethods.GET_PHOTO_ALBUM_LIST, (err: any, res: MethodGetPhotoAlbumListResponseModel[]) => {
                    if (err) {
                        setState(state => ({...state, loading: false}))
                        return rejects(err)
                    }
                    setState(state => ({...state, photoAlbumsList: res, loading: false}))
                    resolve()
                })
            })
        },
        deletePhotoAlbumById(photoAlbumId: string) {
            return new Promise((resolve, rejects) => {
                const params: MethodDeletePhotoAlbumByIdRequestModel = {albumId: photoAlbumId}
                Meteor.call(PhotoAlbumMethods.DELETE_PHOTO_ALBUM_BY_ID, params, (err: any) => {
                    if (err) return rejects(err)
                    resolve()
                })
            })
        },
        createPhotoAlbum(data) {
            return new Promise((resolve, rejects) => {
                Meteor.call(PhotoAlbumMethods.SET_PHOTO_ALBUM_CREATE, data, (err: any) => {
                    if (err) return rejects(err)
                    resolve()
                })
            })
        }
    }
})