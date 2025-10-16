import {create} from "zustand";
import {
    MethodDeletePhotoAlbumByIdRequestModel,
    MethodGetPhotoAlbumListResponseModel
} from "/imports/api/PhotoAlbum/models";
import {Meteor} from "meteor/meteor";
import {PhotoAlbumMethods} from "/imports/api/names";


interface IPhotoAlbumService {
    photoAlbumsList: MethodGetPhotoAlbumListResponseModel[];
    loading: boolean;
    photoAlbumsListFetch(): Promise<void | Error>;
    photoAlbumDeleteById(photoAlbumId: string): Promise<void | Error>;
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
        photoAlbumDeleteById(photoAlbumId: string) {
            return new Promise((resolve, rejects) => {
                const params: MethodDeletePhotoAlbumByIdRequestModel = {albumId: photoAlbumId}
                Meteor.call(PhotoAlbumMethods.DELETE_PHOTO_ALBUM_BY_ID, params, (err: any) => {
                    if (err) return rejects(err)
                    resolve()
                })
            })
        }
    }
})