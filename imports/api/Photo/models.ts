interface Photographer {
    // _id?: string;
    firstname: string;
    lastname: string;
}

export interface Photo {
    _id?: string;
    title: string;
    photoAlbumId: string;
    base64: string;
    createdAt: Date;
    photographer: Photographer
}

// SET
export interface MethodSetPhotoByPhotoAlbumIDRequestModel {
    photographer: Photographer;
    title: string;
    photoAlbumId: string | undefined;
    base64: string;
}

//GET
// export interface MethodGetPhotoByTitleRequestModel {
//     albumId: string;
// }

export interface MethodGetPhotosListByAlbumIdResponseModel {
    photoId: string | undefined;
    title: string;
    photoAlbumId: string | undefined;
    base64: string;
    createdAt: Date;
    photographer: Photographer
}

export interface MethodGetPhotosListByAlbumIdRequestModel {
    albumId: string;
}

export interface MethodDeletePhotoByIdRequestModel {
    photoId: string | undefined;
}

export interface MethodDeletePhotoByIdResponseModel {
    photo: Photo
}