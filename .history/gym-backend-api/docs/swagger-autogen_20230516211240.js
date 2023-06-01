import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version:"1.0.0",
    title: "High Street Gym API",
    description:"JSON REST API for tracking high street gym interface",
  },
  host:"localhost:8081",
  basePath:"",
  schemes:["http"],
  consumes:["application/json"],
  produces:["application/json"],
}

const outputFile = './docs/swagger-output.json';
const endpointsFiles= ["./server.js"];

swaggerAutogen({openapi:"3.0.0"})(outputFile, endpointsFiles, doc);