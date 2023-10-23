import classes from "./EmailCard.module.css";
import axios from "axios";
import * as React from "react";
import { AppContext } from "../../../App";
import { AiTwotoneStar } from "react-icons/ai";

interface Props {
  emailList: any;
}

export const EmailCard = ({ emailList }: Props) => {
  const convertTimestamp = (data: any) => {
    const date = new Date(data);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based, so add 1
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";

    // Format the date components with leading zeros if needed
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedHours = hours % 12 || 12; // Convert to 12-hour format

    const formattedDate = `${formattedDay}/${formattedMonth}/${year} ${formattedHours}:${minutes} ${ampm}`;
    return formattedDate;
  };
  const [emailBody, setEmailBody] = React.useState("");
  const [id, setId] = React.useState(0);
  const [name, setName] = React.useState("");
  const [bodyDate, setBodyDate] = React.useState("");
  const renderEmail = (id: number, name: string, date: string) => {
    axios.get(`https://flipkart-email-mock.now.sh/?id=${id}`).then((res) => {
      setId(id);
      setName(name);
      setEmailBody(res.data.body);
      setBodyDate(date);
    });
  };
  const { contextData, readMsg, setContextData, setReadMsg } =
    React.useContext<any>(AppContext);
  const content = emailList
    ? emailList.map((email: any, key: number) => {
        return (
          <div
            className={`${
              readMsg.includes(email.id) ? classes.container : classes.active
            }`}
            onClick={() => {
              renderEmail(
                email.id,
                email.subject,
                convertTimestamp(email.date)
              );
              if (!readMsg.includes(email.id)) {
                setReadMsg((prevState: any) => {
                  return [...prevState, email.id];
                });
              }
            }}
            key={key}
          >
            <span className={classes.subIcon}>F</span>
            <div>
              <div>
                <span>From: </span>
                <span className={classes.subheading}>
                  {email.from?.name} {`<${email.from?.email}>`}
                </span>
              </div>
              <div>
                <span>Subject:</span>
                <span className={classes.subheading}>{email.subject}</span>
              </div>
              <div className={classes.description}>
                <span>{email.short_description}</span>
                <span>{convertTimestamp(email.date)}</span>
              </div>
            </div>
          </div>
        );
      })
    : "Loading Please wait....";
  return (
    <div className={classes.mainContainer}>
      <div className={classes.contentContainer}>{content}</div>
      {emailBody && (
        <div className={classes.emailContainer}>
          <div className={classes.bodyHeader}>
            <span className={classes.subIcon}>F</span>
            <div>
              <div className={classes.favoriteContainer}>
                <h2 className={classes.heading}>{name}</h2>
                <div className={classes.iconContainer}>
                  <AiTwotoneStar
                    onClick={() => {
                      if (contextData.includes(id)) {
                        contextData.forEach((item: any, index: number) => {
                          if (item === id) {
                            contextData[index] = "";
                          }
                        });
                      } else {
                        setContextData((prevState: any) => {
                          return [...prevState, id];
                        });
                      }
                    }}
                    className={
                      contextData.includes(id)
                        ? classes.iconActive
                        : classes.iconStyle
                    }
                  />
                  <button
                    className={classes.buttonStyle}
                    onClick={() => {
                      if (!contextData.includes(id)) {
                        setContextData((prevState: any) => {
                          return [...prevState, id];
                        });
                      }
                    }}
                  >
                    Mark as Favorite
                  </button>
                </div>
              </div>
              <span>{bodyDate}</span>
              <br />
              <br />
              {emailBody}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
