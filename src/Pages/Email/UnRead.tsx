import * as React from "react";
import { AppContext } from "../../App";
import axios from "axios";
import { EmailCard } from "./EmailCard/EmailCard";

export const UnRead = () => {
  const { readMsg } = React.useContext<any>(AppContext);
  const [email, setEmail] = React.useState([{}]);
  React.useEffect(() => {
    axios.get("https://flipkart-email-mock.vercel.app/").then((res) => {
      setEmail(res.data.list);
    });
  }, []);

  const filteredItemsObject = email
    ?.map((item: any) => {
      if (!readMsg.includes(item.id)) {
        return item;
      }
      return null; // Map function requires a return, but we don't need to return anything here.
    })
    .filter(Boolean);
  return (
    <div>
      <EmailCard emailList={filteredItemsObject} />
    </div>
  );
};
