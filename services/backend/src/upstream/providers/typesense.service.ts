import { ConfigService } from "src/common/providers/config.service";
import { Client } from "typesense";

export class TypesenseService extends Client {
	constructor(config: ConfigService) {
		super({
			nodes: [
				{
					host: config.get("upstream.typesense.host"),
					port: config.get("upstream.typesense.port"),
					protocol: config.get("upstream.typesense.protocol"),
				},
			],
			apiKey: config.get("upstream.typesense.apiKey"),
			connectionTimeoutSeconds: config.get("upstream.typesense.connectionTimeoutSeconds"),
		});
	}
}
