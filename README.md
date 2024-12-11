# Satistactory Factory Planner

The Satisfactory Factory Planner is a locally hosted front end webapp that can be used to assist in resource allocation in factory building. 

## Description

The primary function is to understand all of the inputs and outputs for each part of a complex workflow. An overwhelmed Ficsit employee can search through recipes and, leaning heavily on the React Flow module, connect outputs to inputs to understand resource requirements and be able to account for surplus or waste.

## Status

This project is in the middle stages of development. Core functionality exists with the apility to:
- Create factory workflows with:
  - Resource Nodes.
  - Recipe/Machine Nodes.
  - Container Nodes.
  - Connections from outputs to inputs with variable amount of allocated resources.
- Determine number of resources and machines needed for various steps.
- Save and load workflows as `.json` files.

### Roadmap

- Make shortcut buttons for smart resource allocation.
- Implement power generators.
- Implement resource extractors.
- Calculate summary statistcs:
  - Missing ingredients.
  - Surplus.
  - Power consumption.
  - Power Generation.
- Cleanup for error handling and code readability.

## Getting started

### System requirements

Node.js and `npm` need to be installed on the machine to run the application.

### Installation

- Clone the repository.
- In the root of the project install the packages:

  `npm install`

### Execution

Run the project using `npm run` or `npm run dev`

## Building a workflow using the app

An example workflow looks as following:
![Trubofuel workflow](https://github.com/user-attachments/assets/0934efd2-e1ec-43ff-8cca-2536886606cf)

Start by selecting a resource:

![Selecting iron ore](https://github.com/user-attachments/assets/4a22a5f2-76d1-4d0b-8b53-56bd4eed6186) 

Setting an amount:

![Iron ore amount](https://github.com/user-attachments/assets/43e8dda2-fed2-48a0-9540-83b26808d3ff)

Adding a machine node and selecting a recipe:

![Iron ingot recipe selecting](https://github.com/user-attachments/assets/fb204245-d7fc-4abe-b2f1-05f8c9e4e9d7)

Connecting the output to the input by clicking the output of the resource node and dragging to the input of the machine node:

![Connecting iron ore to iron ingot smelter](https://github.com/user-attachments/assets/43863305-dbf9-43a8-a8f5-2fc7e9657e6c)

And determining how much of the resource should go towards this machine:

![Selecting iron ore allocation](https://github.com/user-attachments/assets/19278352-e202-47dc-a563-71df8f9a1c92)

Update the machine node to produce based on the input:

![Iron ore to ingot workflow](https://github.com/user-attachments/assets/fe051d7d-5a9b-464d-bcb0-a0a1d82b75c4)


The ouputs of the machine nodes can be assigned to containers or other machines as inputs.

