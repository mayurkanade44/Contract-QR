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
import { Loading } from "../components";

const FeedbackStats = () => {
  const { feedbackStats, allRatings, pestRatings, feedbackFile, loading } =
    useDataContext();

  useEffect(() => {
    feedbackStats();

    // eslint-disable-next-line
  }, []);

  const pestBar = [];

  pestRatings?.map((item) => pestBar.push({ x: item._id, y: item.avgRating }));

  pestBar.sort((a, b) => {
    return a.x.localeCompare(b.x);
  });

  if (loading) return <Loading />;

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-center mt-5">
          <StarRatings
            rating={allRatings[0]?.avgRating}
            starDimension="50px"
            starSpacing="15px"
            starRatedColor="gold"
          />
          <h3 className="ms-4 pt-1">
            given by {allRatings[0]?.numOfRating} clients.
          </h3>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn btn-outline-success my-4 ">
            <a
              href={feedbackFile}
              style={{ textDecoration: "none", color: "black" }}
            >
              Feedback Report
            </a>
          </button>
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
