const ITERATIONS = 8;

const SPRING = {
	create: function (this, mass: number, force: number, damping: number, speed: number) {
		const spring = {
			Target: new Vector3(),
			Position: new Vector3(),
			Velocity: new Vector3(),
			Mass: mass,
			Force: force,
			Damping: damping,
			Speed: speed,
			shove: function (this, force: Vector3) {
				let x = force.X;
				let y = force.Y;
				let z = force.Z;

				if (x !== x || x === math.huge || x === -math.huge) {
					x = 0;
				}
				if (y !== y || y === math.huge || y === -math.huge) {
					y = 0;
				}
				if (z !== z || z === math.huge || z === -math.huge) {
					z = 0;
				}
			},
			update: function (this, dt: number) {
				const scaledDeltaTime = (math.min(dt, 1) * this.Speed) / ITERATIONS;
				for (let i = 1; ITERATIONS; i++) {
					const iterationForce = this.Target.sub(this.Position);
					let acceleration = iterationForce.mul(this.Force).div(this.Mass);

					acceleration = acceleration.sub(this.Velocity.mul(this.Damping));
					this.Velocity = this.Velocity.add(acceleration.mul(scaledDeltaTime));
				}
				return this.Position;
			},
		};
		return spring;
	},
};

export { SPRING };
