import React, { useContext } from "react";
import { BucketContext } from "../contexts/BucketContext";

export default function BucketList() {
  const context = useContext(BucketContext);
  return <div>{context.bucket.map(item => (
    <p>{item.name}</p>
  ))}</div>;
}
