import React from "react";
import { getActivities } from "../../features/activity/activityAPI";
import { useState, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import _ from "lodash";

function ActivityFeed() {
  const [initialLoading, setInitialLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [activities, setActivities] = useState([]);
  const currentActivitiesIdRef = useRef(null);

  async function loadActivityFeed(silent = false) {
    try {
      if (!silent) {
        setInitialLoading(true);
      } else {
        setRefreshing(true);
      }

      if (!silent) {
        const result = await getActivities();

        currentActivitiesIdRef.current = result.activities.map(
          (activities) => activities._id,
        );
        setActivities(result.activities);
      }

      if (silent) {
        const result = await getActivities();
        const currentActivitiesIds = result.activities.map(
          (result) => result._id,
        );
        const areActivitiesEqual = _.isEqual(
          currentActivitiesIdRef.current,
          currentActivitiesIds,
        );

        if (!areActivitiesEqual) {
          toast.success("Activities updated");

          currentActivitiesIdRef.current = result.activities.map(
            (activities) => activities._id,
          );

          setActivities(result.activities);
        }
      }
    } catch (err) {
      toast.error("Error in getting activities");
    } finally {
      setInitialLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    let timeoutId = null;

    async function startPolling() {
      await loadActivityFeed(false);
      timeoutId = setTimeout(startPolling, 5000);
    }

    startPolling();

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (initialLoading) {
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

export default ActivityFeed;
