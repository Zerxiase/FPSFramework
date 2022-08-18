import { OnStart, OnRender } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";
import { Workspace, ReplicatedStorage, UserInputService } from "@rbxts/services";
import { SPRING } from "shared/components/spring";

const mySpring = SPRING.create();

const CurrentCamera = Workspace.CurrentCamera!;

interface WEAPON_INSTANCE extends Model {
	MainHolder: Part;
	HumanoidRootPart: Part;
	Gun: Model;
	Animation: AnimationController & {
		Animator: Animator;
	};
}

interface Attributes {
	weaponProcessed: boolean;
}

@Component({
	tag: "AK47_WEAPON",
	defaults: {
		weaponProcessed: false,
	},
})
export class Ak47Component extends BaseComponent<Attributes, WEAPON_INSTANCE> implements OnStart, OnRender {
	onStart() {
		this.instance.Clone().Parent = CurrentCamera;
		this.attributes.weaponProcessed = true;
		const Anim = new Instance("Animation", this.instance);
		Anim.AnimationId = "rbxassetid://10636113039";
		const Animation = this.instance.Animation.Animator.LoadAnimation(Anim);
		Animation.Play();
		UserInputService.InputBegan.Connect((input, isTyping) => {
			if (isTyping) {
				return;
			}
			if (input.UserInputType === Enum.UserInputType.MouseButton1) {
				print("ha");
			}
		});
	}

	onRender() {
		if (this.attributes.weaponProcessed) {
			const myGunModel = CurrentCamera.FindFirstChild(this.instance.Name) as Model;
			const Main = myGunModel.FindFirstChild("MainHolder")! as Part;
			Main.CFrame = CurrentCamera.CFrame;
		}
	}
}
