import {PhotoAlbum} from "/imports/api/PhotoAlbum/models";

export type StatusType = "Active" | "Inactive" | "Pending"

export interface TableDataType extends PhotoAlbum {
    key: string
    umberOfPhotos: number
    rating: number | null
    status: StatusType
}

