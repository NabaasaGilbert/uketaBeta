import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import InstructorDetailsEl from "../../components/instructorpage/InstructorDetailsEl";
// import instructors from "../../components/data/instructorData.json";
import { useRecoilValue, useRecoilState } from "recoil";
import { instructorDataState, currentInstructorState } from "../../atoms/atoms";
import axios from "axios";
import { Spinner } from "react-bootstrap";

export default function InstructorDetails() {
  const router = new useRouter();
  const queryId = router.query.instructorId;
  console.log(queryId);
  const InstructorData = useRecoilValue(instructorDataState);
  const [currentInstructor, setCurrentInstructor] = useRecoilState(
    currentInstructorState
  );
  const [instructor, setInstructor] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log({ InstructorData });
    const getInstructor = async (props) => {
      try {
        axios.get(`/api/instructor/getInstructor?${props}`).then((res) => {
          console.log(res.data.data);
          setInstructor(res.data.data);
          setLoading(false);
        });
      } catch (error) {
        setLoading(false);
      }
    };
    if (queryId) {
      getInstructor(queryId);
    }    
  }, [queryId]);

  return (
    <div className="mt-5">
      {loading ? (
        <div className="d-flex p-5">
          <Spinner className="text-orange mx-auto" />
        </div>
      ) : (
        <InstructorDetailsEl instructorData={instructor} />
      )}
    </div>
  );
}
