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
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userID}) {
        try {
            await this.databases.createDocument(
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
            await this.databases.updateDocument(
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
            console.log("AppWrite mainConfig :: updatePost :: Error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug
            )
            return true
        } catch (error) {
            console.log("AppWrite mainConfig :: deletePost :: Error", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                slug
            )
        } catch (error) {
            console.log("AppWrite mainConfig :: getPost :: Error", error);
            return false
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseID,
                config.appWriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("AppWrite mainConfig :: getPosts :: Error", error);
            return false
        }
    }

    //service for bucket upload
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                config.appWriteBucketID,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("AppWrite mainConfig :: uploadFile :: Error", error);
            return false
        }
    }

    async deleteFile(fileID) {
        try {
            return await this.bucket.deleteFile(
                config.appWriteBucketID,
                fileID
            )
        } catch (error) {
            console.log("AppWrite mainConfig :: deleteFile :: Error", error);
            return false
        }
    }

    getFilePreview(fileID) {
        this.bucket.getFilePreview(
            config.appWriteBucketID,
            fileID
        )
    }
}

const service = new Service

export default service