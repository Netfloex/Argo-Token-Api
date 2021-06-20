import { promises as fsp } from "fs";
import { join, dirname } from "path";

export default class Store {
	path: string;

	constructor(name: string) {
		this.path = join(process.cwd(), "data", name);
		fsp.mkdir(dirname(this.path), { recursive: true });
	}

	public async write(data: string): Promise<void> {
		await fsp.writeFile(this.path, data);
	}

	public async get(): Promise<string> {
		return (await fsp.readFile(this.path)).toString();
	}
}
