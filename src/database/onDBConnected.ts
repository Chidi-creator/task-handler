import { scheduleDatabaseJob } from "@engine/schedulers/database.scheduler";

const onDBConnected = async () => {
  try {
    await scheduleDatabaseJob();
    console.log("Database job scheduled successfully");
  } catch (error) {
    console.log("Failed to schedule database job", error);
  }
};

export default onDBConnected;
