interface Photographer {
    _id?: string;
    firstname: string;
    lastname: string;
}

export interface Photo {
    _id?: string;
    photoAlbumId: string;
    url: string;
    createdAt: Date;
    photographer: Photographer
}