import { useState } from "react";
import { Calendar } from "react-calendar";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Outfit from "../components/Outfit";
import Layout from "../containers/Layout";
import homeStyle from "../styles/home.module.css";
import axios from "axios";

type Outfit = {
  id: string;
  image_url: string;
  label: string;
  details: string[];
  last_worn: Date;
};

const Index = () => {
  const [date, handleCalendarChange] = useState(new Date());

  const {
    isLoading,
    error,
    data: fetchedOutfits,
    isFetching,
  } = useQuery<any, any, Outfit[], any>([date], () =>
    axios
      .get(
        `/api/outfit?date=${date.getFullYear()}-${date.getMonth() + 1}-${
          date.getDate() < 10 && "0"
        }${date.getDate()}`
      )
      .then((res) => res.data.success)
  );

  if (isLoading || !fetchedOutfits)
    return (
      <Layout>
        <h1 style={{ color: "white", textAlign: "center", margin: "1rem" }}>
          Loading...
        </h1>
      </Layout>
    );

  return (
    <Layout>
      <div className={homeStyle.container}>
        <Calendar onChange={handleCalendarChange} value={date} />
      </div>

      <div className={homeStyle.container}>
        <input className={homeStyle.search} placeholder="Enter Details" />
      </div>

      <div
        style={{
          backgroundColor: "#f1f1f1",
          padding: "0.5rem",
          borderRadius: "10px",
          margin: "auto",
          textAlign: "center",
        }}
      >
        <h2 style={{ padding: "0.5rem", fontSize: "1.5rem" }}>
          Outfits you wore:
        </h2>

        {fetchedOutfits.length > 0 && (
          <div className={homeStyle.outfit_container}>
            {fetchedOutfits.map((item) => (
              <Link to={`/${item.id}`} key={item.id}>
                <Outfit
                  image_url={item.image_url}
                  outfit_name={item.label}
                  last_worn={item.last_worn}
                />
              </Link>
            ))}
          </div>
        )}
        {fetchedOutfits.length === 0 && (
          <p style={{ fontSize: "1.5rem", textAlign: "center" }}>
            No outfits wore on this day
          </p>
        )}
      </div>
    </Layout>
  );
};

export default Index;