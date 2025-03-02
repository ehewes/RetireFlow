import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export class myDB {
	private dbInstance: MongoClient | null = null;

	constructor() {
		if (!process.env.DB_URI) {
			throw new Error("DB_URI is not defined in .env file");
		}
		this.dbInstance = new MongoClient(process.env.DB_URI);
	}

	async getDBInstance() {
		if (!this.dbInstance) {
			throw new Error("Database instance is not initialized");
		}
		await this.dbInstance.connect();
		console.log("Connected to database");
		return this.dbInstance.db("crimelens");
	}
}