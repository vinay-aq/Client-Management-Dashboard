import React from "react";
import { getActivities } from "../../features/activity/activityAPI";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import _ from "lodash";
import socket from "../../services/socket";

function ActivityFeedRealTimePage() {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState([]);

  async function loadActivityFeed() {
    try {
      setLoading(true);
      const result = await getActivities();
      setActivities(result.activities);
    } catch (err) {
        toast.error("Notifications could not be fetched")
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadActivityFeed();
  }, []);

  useEffect(() => {
    const handleNewActivity = (activity) => {
      setActivities(prev => ([activity, ...prev]));
      toast.success("New activity received");
    };

    socket.on("new_activity", handleNewActivity);
    

    return () => {
      socket.off("new_activity", handleNewActivity);
    };
  }, []);

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div>
      {activities &&
        activities.map((activity) => (
          <div
            key={activity._id}
            style={{
              border: "1px solid #ddd",

              padding: "10px",

              marginBottom: "10px",

              borderRadius: "8px",
            }}
          >
            {" "}
            {activity.message}
          </div>
        ))}
    </div>
  );
}

export default ActivityFeedRealTimePage;
