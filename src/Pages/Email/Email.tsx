import * as React from "react";
import axios from "axios";
import classes from "./Email.module.css";
import { EmailCard } from "./EmailCard/EmailCard";

export const Email = () => {
  const [email, setEmail] = React.useState([{}]);
  const [pageNumber, setPageNumber] = React.useState(1);
  React.useEffect(() => {
    axios
      .get(`https://flipkart-email-mock.vercel.app/?page=${pageNumber}`)
      .then((res) => {
        setEmail(res.data.list);
      });
  }, [pageNumber]);
  return (
    <div className={classes.container}>
      {email && <EmailCard emailList={email} />}
      <div className={classes.buttonContainer}>
      <button
        onClick={() => {
          setPageNumber(1);
        }}
        className={classes.pageButton}
      >
        1
      </button>
      <button
        onClick={() => {
          setPageNumber(2);
        }}
        className={classes.pageButton}
      >
        2
      </button>
      </div>
    </div>
  );
};
