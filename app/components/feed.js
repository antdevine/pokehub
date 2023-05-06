"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Feed() {
  const [data, setData] = useState(null);

  useEffect(() => {
    test();
  }, []);

  const test = async () => {
    await axios
      .get("https://pokeapi.co/api/v2/pokemon/ditto")
      .then((response) => {
        console.log(response);
        setData(response);
      });
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-stone-900 text-white">
      {data ? data.data.name : "Loading"}
    </div>
  );
}
