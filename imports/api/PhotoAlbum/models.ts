export interface PhotoAlbum {
    _id?: string;
    title: string;
    createdAt: Date;
    owner: {
        userId: string;
    };
    contest: {
        contestId: string | undefined;
    }
}

export type StatusType = "Active" | "Inactive" | "Pending"

// SET methods
export interface MethodSetPhotoAlbumCreateRequestModel {
    title: string;
}

// UPDATE methods
export interface MethodUpdatePhotoAlbumRequestModel {
    title: string;
    albumId: string;
}


// GET methods
export interface MethodGetPhotoAlbumListResponseModel {
    albumId: string;
    ownerId: string;
    title: string;
    createdAt: Date;
    numberOfPhotos: number;
    rating: number | undefined;
    contest: {
        contestId: string | undefined;
        status: StatusType;
    }
}

export interface MethodGetPhotoAlbumByIDRequestModel {
    albumId: string;
}
export interface MethodGetPhotoAlbumByIDResponseModel {
    photoAlbum: PhotoAlbum | undefined;
}


// DELETE methods
export interface MethodDeletePhotoAlbumByIdRequestModel {
    albumId: string
}