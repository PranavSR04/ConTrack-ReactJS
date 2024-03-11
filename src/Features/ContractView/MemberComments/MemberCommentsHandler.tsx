import React, { useEffect, useState } from "react";
import MemberComments from "./MemberComments";
import { getContractData } from "../FixedFee/api/getContractData";
import { AssociatedUsersType, MemberCommentsHandlerType } from "./types";

const MemberCommentsHandler = () => {
  const [comments, setComments] = useState<string>("");
  const [associatedUsers, setAssociatedUsers] = useState<AssociatedUsersType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let responses;
    const fetchData = async () => {
      try {
        responses = await getContractData();
        console.log("member remark response: ", responses);
        getMemberComments(responses);
        setLoading(false);
      } catch (error) {
        console.log("Error: ", error);
      }
    };
    fetchData();
  }, []);

  const getMemberComments: MemberCommentsHandlerType["getMemberComments"] = (
    responses
  ) => {
    if (responses && responses.data && responses.data.length > 0) {
      setComments(responses.data[0].comments);
      // console.log("assoc users: ", responses.data[0].associated_users)
      setAssociatedUsers(responses.data[0].associated_users);
    }
  };
  return (
    <>
      <MemberComments comments={comments} loading={loading} associatedUsers={associatedUsers} />
    </>
  );
};

export default MemberCommentsHandler;
