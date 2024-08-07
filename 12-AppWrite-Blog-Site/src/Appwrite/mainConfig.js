import config from '../config/config'
import {Client, ID, Databases, Storage, Query} from 'appwrite'

export class Service{
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(config.appWriteUrl)
            .setProject(config.appWriteProjectID)
        this.databases = new Databases(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userID}) {
        try {
            this.databases.createDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userID
                }
            )
        } catch (error) {
            console.log("AppWrite mainConfig :: createPost :: Error", error);
        }
    }

    async updatePost(slug,{title, content, featuredImage, status}) {
        try {
            this.databases.updateDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("AppWrite mianConfig :: updatePost :: Error", error);
        }
    }

    async deletePost(slug,{title, content, featuredImage, status}) {
        try {
            this.databases.deleteDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("AppWrite mianConfig :: deletePost :: Error", error);
        }
    }
}

const service = new Service

export default service