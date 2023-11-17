# AutomationWare AwTube glowbuzzer Demo

This project shows some of the features of the glowbuzzer tools applied to the AutomationWare AwTube robot.

You may be seeing this project running on codesandbox.com, or you may be running it locally.

If running on codesandbox.com, everything should "just work". In the browser, use the Connect button to connect to the control,
reset the initial fault and enable operation. You can now jog the robot and explore other features.

If running locally, there are a couple of options:

- Download and run the control (GBC) on a Linux machine (or VM)
- Run GBC in a Docker container

## Running in Docker

The project contains a Dockerfile that is also used by codesandbox.com. You can use this to run the control locally.

To build the Docker image, run:

```bash
docker build -t awtube-demo .devcontainer
```

To run the Docker image, run:

```bash
# only needed on Windows
export MSYS_NO_PATHCONV=1
docker run -i --entrypoint "/gbc-v1.9.0-alpha.6/GBC" -v`pwd`:/workspace -p9001:9001 -t awtube-demo --codesandbox -t --config /workspace/.codesandbox/gbc_config.json
```

The path to GBC will need to be updated from time to time. You can check the version in use in `.devcontainer/Dockerfile`.
