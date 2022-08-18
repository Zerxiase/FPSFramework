import { Service, OnStart } from "@flamework/core";
import { CollectionService, Players } from "@rbxts/services";

@Service({})
export class PlayerInitialize implements OnStart {
	onStart() {
		Players.PlayerAdded.Connect((Player: Player) => {
			CollectionService.AddTag(Player, "PLAYER_TAG");
			print(CollectionService.GetTags(Player));
		});
	}
}
