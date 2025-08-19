export interface PhotoAlbum {
    _id?: string;
    userId: string;
    title: string;
    createdAt: Date;
}


// Set methods
export interface MethodSetPhotoAlbumCreateModel {
    title: string;
}

