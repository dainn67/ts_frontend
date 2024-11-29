import { memo, useReducer, useRef } from "react";

interface JobState {
  currentJob: string;
  jobs: string[];
}

// Initstate
const initState: JobState = {
  currentJob: "",
  jobs: [],
};

// Action Types
const SET_JOB = "set_job";
const ADD_JOB = "add_job";
const DELETE_JOB = "delete_job";

interface SetJobAction {
  type: typeof SET_JOB;
  payload: string;
}

interface AddJobAction {
  type: typeof ADD_JOB;
  payload: string;
}

interface DeleteJobAction {
  type: typeof DELETE_JOB;
  payload: number;
}

type JobAction = SetJobAction | AddJobAction | DeleteJobAction;

// Action Creators
const setJob = (payload: string): SetJobAction => ({
  type: SET_JOB,
  payload,
});

const addJob = (payload: string): AddJobAction => ({
  type: ADD_JOB,
  payload,
});

const deleteJob = (payload: number): DeleteJobAction => ({
  type: DELETE_JOB,
  payload,
});
// Reducer
const reducer = (state: JobState, action: JobAction): JobState => {
  switch (action.type) {
    case SET_JOB:
      return {
        ...state,
        currentJob: action.payload,
      };
    case ADD_JOB:
      return {
        ...state,
        currentJob: "",
        jobs: [...state.jobs, action.payload],
      };
    case DELETE_JOB:
      return {
        ...state,
        jobs: state.jobs.filter(
          (_: string, index: number) => index !== action.payload
        ),
      };
    default:
      throw new Error("Invalid action");
  }

  return state;
};

// Dispatch: trigger reducer with action

const TestComponent: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const { currentJob, jobs } = state;

  const _handleAdd = () => {
    dispatch(addJob(currentJob));
    inputRef.current?.focus();
  };

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1>Test Component</h1>
      <br />
      <input
        type="text"
        value={currentJob}
        ref={inputRef}
        onChange={(e) => dispatch(setJob(e.target.value))}
        placeholder="Enter job"
      />
      <button onClick={_handleAdd}>Add</button>

      <br />
      <ul>
        {jobs.map((job: string, index: number) => (
          <li key={index} onClick={() => dispatch(deleteJob(index))}>
            {job}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default memo(TestComponent);
