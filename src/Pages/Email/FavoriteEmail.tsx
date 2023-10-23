import * as React from "react";
import { AppContext } from "../../App";
import axios from "axios";
import { EmailCard } from "./EmailCard/EmailCard";

export const FavoriteEmail = () => {
  const { contextData } = React.useContext<any>(AppContext);
  const [email, setEmail] = React.useState([{}]);
  React.useEffect(() => {
    axios.get("https://flipkart-email-mock.vercel.app/").then((res) => {
      setEmail(res.data.list);
    });
  }, []);
  const filteredItemsObject: any = [];

  contextData?.map((id: any) => {
    const matchingItem = email.find((item: any) => item.id === id);
    if (matchingItem) {
      filteredItemsObject.push(matchingItem);
    }
    return null; // Map function requires a return, but we don't need to return anything here.
  });
  return (
    <div>
      {filteredItemsObject.length > 0 ? (
        <EmailCard emailList={filteredItemsObject} />
      ) : (
        "There are no favorites avaliable"
      )}
    </div>
  );
};
