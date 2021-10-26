import AvvirApi from "../avvir_api";
import RunningProcessStatus from "../models/enums/running_process_status";


export const pollPipeline = (pipelineResponse, user, maxIterations = 200, pollTimeout = 1000, index = 0) => {
  console.log("Checking Pipeline:", index + " of " + maxIterations + " iterations");
  const projectId = pipelineResponse.firebaseProjectId
  return new Promise((resolve, reject) => {
    AvvirApi.other.checkPipelineStatus({projectId}, pipelineResponse.id, user)
        .then((response) => {
          // console.log(index, response);
          if (index > maxIterations) {
            reject("Too Many Calls: Check endpoint to make sure the implementation isn't flawed.")
          } else if (response.status !== RunningProcessStatus.COMPLETED) {
            setTimeout( () => resolve(pollPipeline(response, user, maxIterations, pollTimeout, ++index)), pollTimeout );
          } else {
            resolve(response);
          }
        })
  })
}