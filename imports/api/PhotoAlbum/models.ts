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
export interface MethodSetPhotoAlbumCreateModel {
    title: string;
}


// GET methods
export interface MethodGetPhotoAlbumListModel {
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

// DELETE methods
export interface MethodDeletePhotoAlbumByIdModel {
    albumId: string
}