import { useEffect } from "react";
import StarRatings from "react-star-ratings";
import { useDataContext } from "../context/data_context";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const FeedbackStats = () => {
  const { feedbackStats, allRatings, pestRatings } = useDataContext();
  useEffect(() => {
    feedbackStats();

    // eslint-disable-next-line
  }, []);

  console.log(pestRatings);

  const pestBar = [];

  pestRatings?.map(
    (item) =>
      item.avgRating > 3 && pestBar.push({ x: item._id, y: item.avgRating })
  );

  return (
    <div>
      <div className="container">
        <h4 className="text-center mt-3 ">
          We thank you for your time spent taking this feedback.
        </h4>
        <div className="text-center my-5">
          <StarRatings
            rating={allRatings[0]?.avgRating}
            starDimension="50px"
            starSpacing="15px"
            starRatedColor="gold"
          />
          <h3>given by {allRatings[0]?.numOfRating} clients</h3>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={pestBar} margin={{ top: 10 }}>
            <XAxis dataKey="x" />
            <YAxis
              allowDecimals={false}
              domain={[0, 5]}
              tickCount={10}
              interval={0}
            />
            <Tooltip />
            <Bar dataKey="y" fill="#2cb1bc" barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default FeedbackStats;
